import i18next from 'i18next';

import { Router } from '@iyulab/router';
import { setDefaultBaseUrl } from '@iyulab/components/dist/utilities/icons.js';
import { Theme } from '@iyulab/components/dist/utilities/Theme.js';
import { Toast } from '@iyulab/components/dist/utilities/Toast.js';
import { Locale } from '@iyulab/components/dist/utilities/Locale.js';

import { ScreenObserver, type ScreenSize } from './internals/ScreenObserver';
import { defaultFallback } from './internals/default-fallback';
import type { AppConfig, LayoutConfig } from './types/AppConfigs';
import type { NotificationOptions } from './types/AppOptions';
import type { AuthSession } from './types/AuthConfig';

/**
 * `document.body` 를 셸의 뿌리로 쓸 때의 기본 크기 규칙.
 *
 * ★인라인 스타일이 아니라 문서 시트로 둔다 — 인라인은 매체를 가를 수 없어 인쇄에서도 body 를
 *   뷰포트 높이에 묶었고(본문이 첫 쪽에서 잘렸다), 소비자 CSS 는 `!important` 로만 이길 수 있었다.
 * ★`:where(body)` 로 특이도를 0 으로 둔다 — 소비자의 `body { … }` 규칙이 시트 순서와 무관하게 이긴다.
 * ⚠constructable 시트(`adoptedStyleSheets`)를 쓴다 — `<style>` 요소와 달리 CSP 의 인라인 스타일
 *   제한에 걸리지 않는다. 지원하지 않는 환경(일부 DOM 에뮬레이터)에서는 `<style>` 로 대신한다.
 */
const BODY_SHELL_CSS = `
:where(body) { margin: 0; }
@media screen {
  :where(body) { width: 100vw; height: 100vh; }
}
`;
let bodyShellSheet: CSSStyleSheet | HTMLStyleElement | undefined;

function adoptBodyShellStyles(): void {
  if (bodyShellSheet) return;
  if ('adoptedStyleSheets' in document && typeof CSSStyleSheet !== 'undefined'
    && typeof CSSStyleSheet.prototype.replaceSync === 'function') {
    const sheet = new CSSStyleSheet();
    sheet.replaceSync(BODY_SHELL_CSS);
    document.adoptedStyleSheets = [...document.adoptedStyleSheets, sheet];
    bodyShellSheet = sheet;
  } else {
    const style = document.createElement('style');
    style.textContent = BODY_SHELL_CSS;
    document.head.prepend(style);
    bodyShellSheet = style;
  }
}

/**
 * 애플리케이션 전역 상태 및 설정 관리 클래스
 */
class App {
  private static _instance: App;

  // 설정 및 상태 변수
  private _config?: AppConfig;
  private _layout?: HTMLElement;
  private _router?: Router;
  private _screen?: ScreenObserver;
  private _user?: unknown;
  private _gateTeardown?: () => void;
  /** i18next 언어 → components `Locale` 동기화 해제(`unload`). */
  private _languageSync?: () => void;

  // private 생성자로 외부에서 인스턴스 생성 방지
  private constructor() {}

  /** 싱글톤 인스턴스 반환 */
  public static get instance(): App {
    if (!App._instance) {
      App._instance = new App();
    }
    return App._instance;
  }

  /** 현재 앱 설정 반환 */
  public get config(): AppConfig | undefined {
    return this._config;
  }
  /** 라우터 인스턴스 반환 */
  public get router(): Router | undefined {
    return this._router;
  }
  /** 화면 크기 반환 */
  public get screen(): ScreenSize | undefined {
    return this._screen?.get();
  }
  /** 인증 게이트(`auth`) 사용 시 인증된 현재 사용자. 미인증/미사용이면 undefined. */
  public get user(): unknown {
    return this._user;
  }
  /** 스타일 테마 관리 유틸리티 객체 반환 */
  public get theme() {
    return Theme;
  }
  /** 다국어 로컬라이저(i18next) 반환 */
  public get i18n() {
    return i18next;
  }

  /** 앱 로드 및 초기화 */
  public async load(config: AppConfig): Promise<void> {
    // 이전 설정 정리
    this.unload();

    // 설정 저장
    this._config = config;

    // 테마·아이콘·다국어 초기화 — 인증 여부와 무관한 순수 표시 설정이라, 인증 게이트보다
    // 먼저 실행한다. `renderLogin`이 그리는 로그인 화면도 `--u-*` 토큰과 `i18next.t()`에
    // 의존할 수 있으므로, 셸이 서기 전(로그인 화면 포함) 모든 렌더 경로에 둘 다 있어야 한다.
    await Theme.init(config.theme);
    if (config.iconBasepath) {
      setDefaultBaseUrl(config.iconBasepath);
    }
    if (config.i18n) {
      for (const plugin of config.i18n.plugins || []) {
        i18next.use(plugin);
      }
      await i18next.init(config.i18n);
      this.syncLanguage();
    }

    // 부팅 인증 게이트 — 셸(레이아웃·라우터)을 만들기 전에 세션을 판정한다.
    if (config.auth) {
      const root = config.root || document.body;
      const reload = () => { void this.load(config); };
      let session: AuthSession;
      try {
        session = await config.auth.me();
      } catch (error) {
        session = { status: 'unknown', error };
      }
      if (session?.status === 'unknown') {
        // 세션을 «모름»(서버 다운·오프라인) — 미인증이 아니므로 로그인 UI 를 그리지 않는다. 그릴 자리가
        // 없으면 load 가 그 오류로 실패한다.
        if (!config.auth.renderUnavailable) throw session.error;
        const teardown = config.auth.renderUnavailable({ root, error: session.error, retry: reload });
        if (teardown) this._gateTeardown = teardown;
        return;
      }
      if (session?.status === 'anonymous') {
        // 미인증: 로그인 UI 를 그리고 셸 구성은 중단. 성공 시 load 재실행으로 셸을 띄운다.
        const teardown = config.auth.renderLogin({ root, onSuccess: reload });
        if (teardown) this._gateTeardown = teardown;
        return;
      }
      if (session?.status !== 'authenticated') {
        // 판별되지 않는 답을 «인증됨»으로 추측하면 미인증 사용자에게 셸이 열린다 — 닫힌 쪽으로 실패한다.
        throw new TypeError(
          "auth.me() must return { status: 'authenticated', user } | { status: 'anonymous' } | { status: 'unknown', error }"
        );
      }
      this._user = session.user;
      await config.auth.onAuthenticated?.(session.user);
    }

    // 레이아웃 생성
    const root = config.root || document.body;
    this._layout = await this.createLayout(root, config.layout);

    // 화면 크기 관찰 시작
    this._screen = new ScreenObserver({
      element: root,
      breakpoints: config.layout.breakpoints || [768, 1024],
    });

    // Outlet을 Light DOM에 추가 (외부 CSS 적용 가능)
    const outlet = document.createElement('u-outlet');
    this._layout.appendChild(outlet);

    // 라우터 초기화
    this._router = new Router({
      root: this._layout,
      basepath: config.basepath,
      mode: config.routerMode,
      routes: config.routes,
      // 주지 않으면 빈 상태 어휘로 그린다(403 no-access · 404 not-found · 그 밖 error) — internals/default-fallback.
      fallback: config.fallback ?? defaultFallback,
      enter: config.enter,
      initialLoad: config.initialLoad,
      useIntercept: config.useIntercept,
    });
  }

  /** 앱 언로드 */
  /**
   * i18next 를 설정한 앱에서는 **i18next 가 언어의 정본**이다 — 그 언어를 셸·컴포넌트 chrome(`@iyulab/components` 의
   * `Locale`, 이 패키지의 `modernAppLocale` 이 그것을 따른다)과 문서 `<html lang>`(WCAG 3.1.1, 낭독기 발음)에 잇는다.
   * 종전에는 둘이 따로였다: `i18next.changeLanguage('ko')` 가 앱 문장만 바꾸고 버튼 이름·빈 상태·검증 메시지는 옛 언어로,
   * 첫 로드에서도 i18next `lng` 와 `<html lang>`/브라우저 언어가 다르면 한 화면에 두 언어가 섰다.
   */
  private syncLanguage(): void {
    const apply = (lng: string | undefined) => {
      if (!lng || lng === 'cimode') return; // i18next 의 키 표시 모드 — 언어가 아니다
      Locale.set(lng);
      if (typeof document !== 'undefined') document.documentElement.lang = lng;
    };
    apply(i18next.resolvedLanguage ?? i18next.language);
    const onChange = (lng: string) => apply(i18next.resolvedLanguage ?? lng);
    i18next.on('languageChanged', onChange);
    this._languageSync = () => i18next.off('languageChanged', onChange);
  }

  public unload(): void {
    this._languageSync?.();
    this._languageSync = undefined;
    // 로그인 UI 정리(미인증 상태에서 렌더된 경우)
    if (this._gateTeardown) {
      this._gateTeardown();
      this._gateTeardown = undefined;
    }
    this._user = undefined;

    // 화면 크기 관찰 중단
    if (this._screen) {
      this._screen.destroy();
      this._screen = undefined;
    }

    // 레이아웃 제거
    if (this._layout) {
      this._layout.remove();
      this._layout = undefined;
    }

    // 라우터 정리
    if (this._router) {
      this._router.destroy();
      this._router = undefined;
    }

    // 설정 초기화
    if (this._config) {
      this._config = undefined;
    }
  }

  /** 페이지 이동 */
  public navigate(path: string): void {
    this._router?.go(path);
  }

  /**
   * Sets the count shown on a sidebar link — the work waiting behind it — without rebuilding the
   * layout. `href` is the link's `href` as configured; `undefined` clears it (and falls back to the
   * item's static `count`, if any).
   *
   * ```ts
   * app.setNavCount('/reviews', 12);
   * app.setNavCount('/reviews', undefined);
   * ```
   */
  public setNavCount(href: string, value: number | string | undefined): void {
    const layout = this._layout as (HTMLElement & { counts?: Record<string, number | string | undefined> }) | undefined;
    if (!layout || !('counts' in layout)) return;
    const next = { ...layout.counts };
    if (value === undefined) delete next[href];
    else next[href] = value;
    layout.counts = next;
  }

  /** 공지 메시지 */
  public async notice(message: string, options?: NotificationOptions): Promise<void> {
    await Toast.notice(message, { ...options });
  }

  /** 정보 메시지 */
  public async info(message: string, options?: NotificationOptions): Promise<void> {
    await Toast.info(message, { ...options });
  }

  /** 경고 메시지 */
  public async warning(message: string, options?: NotificationOptions): Promise<void> {
    await Toast.warning(message, { ...options });
  }

  /** 성공 메시지 */
  public async success(message: string, options?: NotificationOptions): Promise<void> {
    await Toast.success(message, { ...options });
  }

  /** 에러 메시지 */
  public async error(message: string, options?: NotificationOptions): Promise<void> {
    await Toast.error(message, { ...options });
  }

  /** 레이아웃 생성 */
  private async createLayout(root: Element, config: LayoutConfig): Promise<HTMLElement> {
    // 최상위 루트인 경우 기본 스타일 적용
    if (root === document.body) {
      adoptBodyShellStyles();
    }

    let layout: HTMLElement;
    // Sidebar 레이아웃 생성
    if (config.type === 'sidebar') {
      const { SidebarLayout } = await import('./layouts/SidebarLayout.js');
      const SbLayout = new SidebarLayout();
      SbLayout.config = config;
      layout = SbLayout;
    } else {
      throw new Error(`Unsupported layout type: ${config.type}`);
    }

    // 레이아웃을 루트에 추가
    root.appendChild(layout);

    // 레이아웃이 완전히 렌더링될 때까지 대기
    if ('updateComplete' in layout) {
      await (layout as any).updateComplete;
    }
    return layout;
  }
}

/** 
 * 전역 어플리케이션 설정 및 관리 인스턴스
 */
export const app = App.instance;
