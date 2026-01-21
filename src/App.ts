import i18next from 'i18next';

import { Router } from '@iyulab/router';
import { setDefaultBaseUrl } from '@iyulab/components/dist/utilities/IconRegistry.js';
import { Theme } from '@iyulab/components/dist/utilities/Theme.js';
import { Notifier } from '@iyulab/components/dist/utilities/Notifier.js';
import type { AlertType } from '@iyulab/components/dist/components/alert/UAlert.component.js';

import { ScreenObserver, type ScreenSize } from './internals/ScreenObserver';
import type { AppConfig, LayoutConfig } from './types/AppConfigs';
import type { NotificationOptions } from './types/AppOptions';

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

    // 초기 테마 설정
    await Theme.init(config.theme);

    // 아이콘 경로 설정
    if (config.iconBasepath) {
      setDefaultBaseUrl(config.iconBasepath);
    }

    // 다국어 초기화
    if (config.i18n) {
      for (const plugin of config.i18n.plugins || []) {
        i18next.use(plugin);
      }
      await i18next.init(config.i18n);
    }
  
    // 레이아웃 생성
    const root = config.root || document.body;
    this._layout = await this.createLayout(root, config.layout);

    // 화면 크기 관찰 시작
    this._screen = new ScreenObserver({
      element: root,
      breakpoints: config.layout.breakpoints || [768, 1024],
    });

    // 라우터 초기화
    this._router = new Router({
      root: this._layout,
      basepath: config.basepath,
      routes: config.routes,
      fallback: config.fallback,
    });
  }

  /** 앱 언로드 */
  public unload(): void {
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

  /** 공지 메시지 */
  public async notice(message: string, options?: NotificationOptions): Promise<void> {
    await this.notify('notice', message, options);
  }

  /** 정보 메시지 */
  public async info(message: string, options?: NotificationOptions): Promise<void> {
    await this.notify('info', message, options);
  }

  /** 경고 메시지 */
  public async warning(message: string, options?: NotificationOptions): Promise<void> {
    await this.notify('warning', message, options);
  }

  /** 성공 메시지 */
  public async success(message: string, options?: NotificationOptions): Promise<void> {
    await this.notify('success', message, options);
  }

  /** 에러 메시지 */
  public async error(message: string, options?: NotificationOptions): Promise<void> {
    await this.notify('error', message, options);
  }

  /** 알림 표시 */
  private async notify(type: AlertType, message: string, options?: NotificationOptions): Promise<void> {
    await Notifier.toast({
      type: type,
      content: message,
      heading: options?.title,
      duration: options?.duration || 3000,
      position : options?.position || 'top-right',
    });
  }

  /** 레이아웃 생성 */
  private async createLayout(root: Element, config: LayoutConfig): Promise<HTMLElement> {
    // 최상위 루트인 경우 기본 스타일 적용
    if (root === document.body) {
      document.body.style.margin = '0';
      document.body.style.width = '100vw';
      document.body.style.height = '100vh';
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
