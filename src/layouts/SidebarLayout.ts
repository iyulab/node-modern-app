import { html, nothing, PropertyValues } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { repeat } from 'lit/directives/repeat.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import '../components/SidebarSection';
import '../components/SidebarGroup';
import '../components/SidebarLink';
import '../components/SidebarButton';
import '@iyulab/components/dist/components/icon/UIcon.js';
import '@iyulab/components/dist/components/button/UButton.js';
import { createDevWarner } from '@iyulab/components/dist/utilities/devWarning.js';
import { UProgressBar } from '@iyulab/components/dist/components/progress-bar/UProgressBar.js';
import { RouteContext, RouteBeginEvent, RouteDoneEvent, RouteProgressEvent } from '@iyulab/router';
import { app } from '../App.js';
import type { ScreenResizeEvent, ScreenSize } from '../internals/ScreenObserver.js';
import { getLocaleStrings } from '../internals/locale.js';
import { DEFAULT_NAV_ICON } from '../internals/nav-icon.js';
import { StyledElement } from '../internals/StyledElement.js';
import { slotHasContent } from '../internals/slotted.js';
import type { SidebarItem, SidebarLayoutConfig, SidebarState, SidebarParts } from './SidebarLayout.types';
import { filterSidebarItems } from './filterSidebarItems.js';
import { styles } from './SidebarLayout.styles.js';

/** 개발 모드 1회성 경고 — components 의 공유 규약. */
const devWarn = createDevWarner('@iyulab/modern-app');
/** 셸 인스턴스마다 한 번 경고하기 위한 키 — 같은 문서에 셸이 둘이면 둘 다 알아야 한다. */
let instanceSeq = 0;

/**
 * 반응형 사이드바 레이아웃 컴포넌트
 * 
 * 화면 크기에 따른 사이드바 모드 전환:
 * - large: default / slim
 * - medium: slim / modal
 * - small: mobile / mobile-open
 * 
 * 사이드바 모드:
 * - default: 사이드바가 펼침 상태로 표시됨
 * - slim: 아이콘만 표시되는 슬림 모드
 * - modal: 오버레이로 사이드바가 펼침 상태로 표시되는 모달 모드, 백드롭 클릭 시 닫힘
 * - mobile: 모바일에서 헤더만 표시되는 상태, 사이드바는 숨겨짐
 * - mobile-open: 모바일에서 사이드바가 펼침 상태로 표시되는 모드
 */

/**
 * 해당 요소가 키 입력을 소비하는 편집/입력 컨트롤인지 판정한다.
 * true면 메인 영역의 스크롤 단축키(Space·화살표 등)가 그 요소의 입력을 가로채지 않는다.
 */
function isEditableElement(el: HTMLElement): boolean {
  const tag = el.tagName;
  if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return true;
  if (el.isContentEditable) return true;
  const role = el.getAttribute('role');
  if (role === 'textbox' || role === 'searchbox' || role === 'combobox' || role === 'spinbutton') {
    return true;
  }
  return false;
}

function isScrollableY(el: Element): boolean {
  const style = getComputedStyle(el);
  return (style.overflowY === 'auto' || style.overflowY === 'scroll')
    && el.scrollHeight > el.clientHeight;
}

/**
 * `origin`에서 `main`까지의 조합 경로(섀도 경계를 넘는다)를 훑어, 먼저 만나는 스크롤
 * 가능한 상자가 `main` 자신인지 판정한다. 본문 안에 다른 스크롤 상자(상세 패널·분할창
 * 등)가 origin 과 main 사이에 있으면 그 상자가 이미 이 키를 쓰고 있다는 뜻이므로,
 * `main`이 가로채면 안 된다 — 브라우저 기본 스크롤에 맡긴다.
 */
function isMainTheScrollTarget(path: readonly EventTarget[], main: HTMLElement): boolean {
  for (const node of path) {
    if (!(node instanceof HTMLElement)) continue;
    if (isScrollableY(node)) return node === main;
    if (node === main) break;
  }
  return true;
}

/** 실제로 포커스를 쥔 요소 — `document.activeElement` 는 섀도 호스트에서 멈춘다. */
function deepActiveElement(): HTMLElement | null {
  let active = document.activeElement as HTMLElement | null;
  while (active?.shadowRoot?.activeElement) active = active.shadowRoot.activeElement as HTMLElement;
  return active;
}

/** `container` 가 `node` 를 섀도 경계 너머로도 품는가 — `Node.contains` 는 경계에서 멈춘다. */
function composedContains(container: Element, node: Node): boolean {
  let current: Node | null = node;
  while (current) {
    if (current === container) return true;
    current = current.parentNode ?? ((current as ShadowRoot).host ?? null);
  }
  return false;
}

@customElement('u-sidebar-layout')
export class SidebarLayout extends StyledElement<SidebarParts> {
  static styles = [ super.styles, styles ];

  /** 사이드바 상태 */
  @property({ type: String, reflect: true }) state: SidebarState = 'default';
  /** 사이드바 레이아웃 설정 */
  @property({ type: Object }) config?: SidebarLayoutConfig;
  /** 크롬 문자열(토글 버튼 접근성 라벨 등) 로케일 — 이 요소만 다른 언어로 쓸 때. 비우면 `Locale` 의 활성 로케일 */
  @property({ type: String }) locale = '';

  @query('u-progress-bar') progressBarEl!: UProgressBar;

  /** overlay 슬롯 배정 상태 — CSS `:has()`로는 알 수 없다(`internals/slotted.ts` 참조). */
  @state() private hasOverlay = false;
  /** notice 슬롯 배정 상태 — 비었으면 스택 자체가 자리를 차지하지 않는다. */
  @state() private hasNotice = false;
  /**
   * 오버레이를 연 컨트롤 — 닫힐 때 포커스를 되돌릴 곳.
   * ★슬롯 배정 «시점» 에 잡는다. 렌더가 본문에 `inert` 를 걸면 그 컨트롤이 쥐던 포커스는
   *   `<body>` 로 떨어지므로, `updated()` 에서 읽으면 이미 늦다.
   */
  private overlayTrigger: HTMLElement | null = null;

  /**
   * `:state(overlay)`를 싣는 자리. `MasterDetailLayout`과 동일 패턴.
   * ⚠생성자에서 한 번만 붙인다 — `attachInternals()`는 같은 인스턴스에 두 번 부르면
   *   `NotSupportedError`이고, `connectedCallback`은 재연결마다 다시 돈다.
   */
  private readonly internals: ElementInternals | undefined =
    typeof this.attachInternals === 'function' ? this.attachInternals() : undefined;

  /** 현재 라우터 컨텍스트 */
  @state() context: RouteContext | null = null;

  /**
   * 라우트 컨텐츠의 실제 스크롤 컨테이너(섀도 DOM `[part="main"]`). `scrollTop`을 읽어
   * 위치를 저장하거나, 써서 복원한다 — `part="main"`은 스타일링용 CSS 훅일 뿐 JS 접근
   * 계약이 아니었으므로, 소비자가 이 컨테이너에 안정적으로 접근할 공식 수단으로 신설.
   * 아직 렌더 전이면 `null`.
   */
  get mainElement(): HTMLElement | null {
    return this.shadowRoot?.querySelector<HTMLElement>('.main') ?? null;
  }

  connectedCallback() {
    super.connectedCallback();

    window.addEventListener('route-begin', this.handleRouteBegin);
    window.addEventListener('route-done', this.handleRouteDone);
    window.addEventListener('route-progress', this.handleRouteProgress);
    window.addEventListener('route-error', this.handleRouteError);
    window.addEventListener('screen-resize', this.handleScreenResize);
  }

  disconnectedCallback() {
    window.removeEventListener('route-begin', this.handleRouteBegin);
    window.removeEventListener('route-done', this.handleRouteDone);
    window.removeEventListener('route-progress', this.handleRouteProgress);
    window.removeEventListener('route-error', this.handleRouteError);
    window.removeEventListener('screen-resize', this.handleScreenResize);
    window.removeEventListener('keydown', this.handleOverlayEscape);
    super.disconnectedCallback();
  }

  protected willUpdate(changedProperties: PropertyValues): void {
    super.willUpdate(changedProperties);

    if (changedProperties.has('config')) {
      this.styles = this.config?.styles;
    }
  }

  protected updated(changed: PropertyValues): void {
    super.updated(changed);
    if (changed.has('hasOverlay')) {
      this.internals?.states?.[this.hasOverlay ? 'add' : 'delete']('overlay');
      if (this.hasOverlay) {
        window.addEventListener('keydown', this.handleOverlayEscape);
        this.focusOverlay();
      } else if (changed.get('hasOverlay') === true) {
        window.removeEventListener('keydown', this.handleOverlayEscape);
        this.restoreOverlayFocus();
      }
    }
  }

  protected firstUpdated(changedProperties: PropertyValues): void {
    super.firstUpdated(changedProperties);
    this.warnIfUnsized();
  }

  /**
   * 개발 모드 사용 안내: 이 셸은 `:host { height: 100% }` 로 부모를 채우는데, 부모(커스텀
   * root)에 높이가 없으면 걸릴 곳이 없어 자기 크롬 높이(실측 약 133px)로 앉는다 — 오류도 경고도 없이
   * 라우트 콘텐츠 영역이 몇 줄짜리 띠가 된다. 첫 배치 뒤 한 번 재서 알린다.
   * 임계값은 규칙이라 손으로 쓴다 — 앱 셸이 200px 보다 낮은 것이 의도인 경우는 없다.
   * 경고 자체는 components 의 공유 규약(네임스페이스 · DEV 한정 · 키당 한 번)을 쓴다.
   */
  private readonly unsizedWarnKey = `unsized:${++instanceSeq}`;

  private warnIfUnsized(): void {
    if (process.env.NODE_ENV === 'production') return;
    requestAnimationFrame(() => {
      if (!this.isConnected) return;
      const height = this.getBoundingClientRect().height;
      if (height >= 200) return;
      devWarn(
        this.unsizedWarnKey,
        `u-sidebar-layout is only ${Math.round(height)}px tall — its height: 100% found no sized ancestor, ` +
        'so the shell sits at its own chrome height and the route area has almost no room. Give the root element a height ' +
        '(e.g. #app { height: 100vh } — app.load() does this for document.body).',
      );
    });
  }

  render() {
    if (!this.config) return nothing;

    return html`
      <!-- Mobile Header -->
      <div class="mobile-header" part="mobile-header" ?hidden="${!this.state.startsWith('mobile')}">
        ${this.renderLogo()}
        <span class="title">
          ${this.config.title}
        </span>
        <u-button class="toggler" variant="ghost"
          aria-label=${getLocaleStrings(this.locale || undefined).toggleMobileMenu}
          @click=${this.handleToggleButtonClick}>
          <u-icon
            lib=${this.icon('lib')}
            name=${this.state === 'mobile-open' ? this.icon('close') : this.icon('menu')}
          ></u-icon>
        </u-button>
      </div>

      <!-- Sidebar -->
      <aside class="sidebar" part="sidebar" state="${this.state}">
        <!-- Sidebar Header -->
        <div class="sidebar-header" part="sidebar-header">
          ${this.renderLogo()}
          <span class="title" ?hidden=${this.state === 'slim'}>
            ${this.config.title}
          </span>
          <u-button class="toggler" variant="ghost"
            aria-label=${getLocaleStrings(this.locale || undefined).toggleSidebar}
            @click=${this.handleToggleButtonClick}>
            <u-icon
              lib=${this.icon('lib')}
              name=${this.icon('sidebarToggle')}
            ></u-icon>
          </u-button>
        </div>

        <!-- Sidebar Navigation Menu -->
        <nav class="sidebar-main" part="sidebar-main" scrollable
          aria-label=${this.config.mainAriaLabel ?? nothing}>
          ${repeat(filterSidebarItems(this.config.main ?? [], this.config.hasPermission),
            (_, idx) => idx,
            (item) => this.renderItem(item))}
        </nav>

        <!-- Sidebar Footer -->
        <div class="sidebar-footer" part="sidebar-footer">
          ${repeat(filterSidebarItems(this.config.footer ?? [], this.config.hasPermission),
            (_, idx) => idx,
            (item) => this.renderItem(item))}
        </div>
      </aside>

      <!-- Main Content -->
      <div class="main-region">
        <div class="main" part="main" scrollable tabindex="-1" @keydown=${this._handleMainKeydown}>
          <u-progress-bar part="progress"></u-progress-bar>

          <div class="main-content" part="main-content" ?inert=${this.hasOverlay}>
            <div class="notices ${this.hasNotice ? '' : 'empty'}" part="notices">
              <slot name="notice" @slotchange=${this.handleNoticeSlotChange}></slot>
            </div>
            <slot></slot>
          </div>
        </div>

        <div class="overlay ${this.hasOverlay ? '' : 'empty'}" part="overlay">
          <u-button class="overlay-close" part="overlay-close" variant="ghost"
            aria-label=${getLocaleStrings(this.locale || undefined).detailClose}
            @click=${this.handleOverlayClose}>
            <u-icon lib=${this.icon('lib')} name=${this.icon('overlayClose')}></u-icon>
          </u-button>
          <slot name="overlay" @slotchange=${this.handleOverlaySlotChange}></slot>
        </div>
      </div>

      <!-- Backdrop for modal state -->
      <div class="backdrop" ?hidden="${this.state !== 'modal'}"
        @click="${this.handleBackdropClick}"
      ></div>
    `;
  }

  /** 사이드바 아이템 렌더링 */
  private renderItem(item: SidebarItem): any {
    if (!item) return nothing;

    if(item.type === 'html') {
      const content = item.render(this.state);
      return typeof content === 'string' 
        ? unsafeHTML(content) 
        : html`${content}`;
    } else if(item.type === 'button') {
      return html`
        <u-sidebar-button
          id=${ifDefined(item.id)}
          ?compact=${this.state === 'slim'}
          .icon="${item.icon}"
          .lib="${item.lib}"
          .label="${item.label}"
          .styles="${item.styles as any}"
          @click="${item.onClick}"
        ></u-sidebar-button>
      `;
    } else if(item.type === 'link') {
      const selected = this.isMatchedLink(item.pattern || item.href);
      return html`
        <u-sidebar-link
          ?compact=${this.state === 'slim'}
          ?selected=${selected}
          .icon="${item.icon}"
          .lib="${item.lib}"
          .label="${item.label}"
          .href="${item.href}"
          .pattern="${item.pattern}"
          .navigate="${item.navigate}"
          .target="${item.target}"
          .styles="${item.styles as any}"
        ></u-sidebar-link>
      `;
    } else if(item.type === 'section') {
      return html`
        <u-sidebar-section
          ?compact=${this.state === 'slim'}
          .mainTitle="${item.title}"
          .subTitle="${item.subTitle}"
          .styles="${item.styles as any}">
          ${repeat(item.items,
            (_, idx) => idx,
            (subItem) => this.renderItem(subItem))}
        </u-sidebar-section>
      `;
    } else if(item.type === 'group') {
      const selected = item.items.some(i => this.isMatchedLink(i.pattern || i.href));
      // `.collapsed=` 는 프로퍼티 바인딩이어야 한다 — `SidebarGroup.collapsed` 의 클래스
      // 기본값은 true 이고, `?collapsed=${false}` 같은 불리언 속성 지시자는 값이 false 일 때
      // 속성을 아예 안 붙이므로 attributeChangedCallback 이 불리지 않아 기본값 true 가 그대로
      // 남는다(따옴표 제거만으로는 해소되지 않는 자리다). 미지정(`undefined`)
      // 시 폴백은 `SidebarGroupConfig.collapsed` 문서("기본 접힘 상태")와 일치하도록 true —
      // 이 값을 false 로 바꾸면 지금까지 늘 접힌 채로 렌더되던(quote 결함이 우연히 만들어 온)
      // 기존 소비자 화면이 전부 펼쳐진 채로 바뀌는 하위호환 파괴가 된다.
      return html`
        <u-sidebar-group
          ?compact=${this.state === 'slim'}
          ?selected=${selected}
          .collapsed=${item.collapsed ?? true}
          .icon="${item.icon}"
          .lib="${item.lib}"
          .label="${item.label}"
          .styles="${item.styles as any}">
          ${repeat(item.items,
            (_, idx) => idx,
            (subItem) => this.renderItem(subItem))}
        </u-sidebar-group>
      `;
    } else {
      return nothing;
    }
  }

  /** 현재 경로와 패턴 매칭 여부 확인 */
  private isMatchedLink = (pattern: string | URLPattern) => {
    if (!this.context) return false;
    if (!pattern) return false;

    pattern = typeof pattern === 'string'
      ? new URLPattern(pattern, window.location.origin)
      : pattern;
    return pattern.test(this.context.path, window.location.origin);
  }

  /** 브랜드 로고 클릭 핸들러: `href` 지정 시 해당 경로로, 아니면 홈으로 이동 */
  /**
   * 로고 렌더링: 아이콘명(문자열, 기존 동작) | 이미지({src,alt,href}) | 커스텀 렌더 함수.
   *
   * 🔴로고는 홈(또는 `href`)으로 가는 **링크**다 — 종전엔 클릭만 받는 `img`·`span`·`u-icon` 이라 키보드로 닿지 않았고
   *   보조기술에 링크로 드러나지 않았다. `u-link` 는 `href` 가 없으면 basepath 로 SPA 이동하므로 종전 `app.navigate('')` 와 같다.
   */
  /**
   * 셸이 **자기 chrome 으로** 그리는 아이콘의 기본값 — 전부 `internal` 번들이라 네트워크를 타지 않는다.
   *
   * 🔴**0.24.0 이전에는 토글러 둘이 `bootstrap`(= jsdelivr CDN 조회)이었다.** 소비앱이 자기
   * 아이콘을 빌드 시점에 전부 구워 등록해도 **셸이 쓰는 것만은 그 등록을 타지 않아**, 폐쇄망
   * 배포에서 사이드바 토글이 빈 채로 남고 매번 실패하는 요청이 쌓였다. ⚠그리고 셸이 스스로
   * 갈려 있었다 — 오버레이 닫기는 `internal`, 모바일 닫기는 `bootstrap` 이라 **한 셸이 서로
   * 다른 X 를 둘 그렸다.**
   */
  private static readonly DEFAULT_ICONS = {
    lib: 'internal',
    menu: 'menu-2',
    close: 'x',
    sidebarToggle: 'layout-sidebar',
    overlayClose: 'x',
  } as const;

  /** 설정이 준 값이 있으면 그것을, 없으면 기본값을 돌려준다(키 단위 부분 오버라이드). */
  private icon(slot: keyof typeof SidebarLayout.DEFAULT_ICONS): string {
    return this.config?.icons?.[slot] ?? SidebarLayout.DEFAULT_ICONS[slot];
  }

  private renderLogo() {
    const logo = this.config?.logo;
    // 아이콘·커스텀 로고는 이름이 없으므로 앱 제목을 링크 이름으로 준다(이미지형은 `alt` 가 이름이다).
    const name = this.config?.title ?? 'Home';

    if (!logo || typeof logo === 'string') {
      // ⚠이름을 줬는데 해석에 실패하면(404 · 없는 이름) 로고가 0×0 으로 사라져 **홈으로 가는 수단**이 조용히
      //   없어진다 — 접힌(slim) 사이드바에서는 로고와 토글만 남는다. 내비 항목과 같은 폴백을 건다.
      //   로고를 아예 주지 않은 경우는 종전대로 아무것도 그리지 않는다(없던 아이콘이 나타나면 안 된다).
      if (!logo) return html`<u-icon class="logo"></u-icon>`;
      return html`
        <u-link class="logo-link" aria-label=${name}>
          <u-icon class="logo"
            .name="${logo}"
            .fallback=${DEFAULT_NAV_ICON}
          ></u-icon>
        </u-link>
      `;
    }
    if (typeof logo === 'function') {
      const content = logo(this.state);
      return html`
        <u-link class="logo-link" aria-label=${name}>
          <span class="logo">
            ${typeof content === 'string' ? unsafeHTML(content) : content}
          </span>
        </u-link>
      `;
    }
    return html`
      <u-link class="logo-link" .href=${logo.href} aria-label=${logo.alt ? nothing : name}>
        <img class="logo"
          src="${logo.src}"
          alt="${logo.alt ?? ''}"
        />
      </u-link>
    `;
  }

  /**
   * 이 레이아웃이 마지막으로 받은 화면 크기.
   *
   * 크기 «전환» 은 `screen-resize` 이벤트로 받으므로 토글도 같은 출처를 읽어야 한다.
   * 종전에는 토글이 싱글턴 `app.screen` 을 읽었는데, 그것은 `app.load()` 가 옵저버를 만들
   * 때만 존재한다 — `/react` 처럼 레이아웃과 `ScreenObserver` 를 직접 조립하면 항상 비어
   * `'large'` 로 떨어졌고, 모바일 폭에서 메뉴를 열면 데스크톱 사이드바가 펼쳐졌다.
   * `app.screen` 은 이벤트를 아직 못 받았을 때의 폴백으로만 남긴다.
   */
  private screenSize?: ScreenSize;

  /** 사이드바 토글 핸들러 */
  private handleToggleButtonClick = () => {
    const size = this.screenSize ?? app.screen ?? 'large';
    if (size === 'large') {
      this.state = this.state === 'default' ? 'slim' : 'default';
    } else if (size === 'medium') {
      this.state = this.state === 'slim' ? 'modal' : 'slim';
    } else if (size === 'small') {
      this.state = this.state === 'mobile' ? 'mobile-open' : 'mobile';
    } else {
      console.warn('Unknown screen size:', size);
    }
  }

  /** 
   * 모달 상태에서 사이드바 닫기
   */
  private handleBackdropClick = () => {
    this.state = 'slim';
  }

  /** 라우트 변경 시작 핸들러 */
  private handleRouteBegin = (event: RouteBeginEvent) => {
    this.progressBarEl.setAttribute('visible', '');
    this.progressBarEl.value = 0;
    if (this.state === 'modal') {
      this.state = 'slim';
    }
    if (this.state === 'mobile-open') {
      this.state = 'mobile';
    }
    this.context = event.context;
  }

  /** 라우트 변경 진행 핸들러 */
  private handleRouteProgress = (event: RouteProgressEvent) => {
    this.progressBarEl.value = event.progress;
  }

  /** 라우트 변경 완료 핸들러 */
  private handleRouteDone = (event: RouteDoneEvent) => {
    this.progressBarEl.value = 100;
    setTimeout(() => {
      this.progressBarEl.removeAttribute('visible');
    }, 300);
    const main = this.shadowRoot?.querySelector<HTMLElement>('.main');
    if (main) {
      this.config?.scrollBehavior?.(event.context, main);
      // Move focus to .main so keyboard scrolling works without a mouse click —
      // unless the overlay is open: the route underneath is inert, and the focus
      // the user is working with is in the panel.
      if (!this.hasOverlay) main.focus({ preventScroll: true });
    }
  }

  /** 라우트 에러 핸들러 */
  private handleRouteError = (_: RouteDoneEvent) => {
    // u-progress-bar 가 제공하는 status 를 쓴다. 종전에는 API 에 없는 `error` 속성을
    // 세우고 색을 자체 CSS 로 덮었는데, 그러면 컴포넌트의 위험색 규약(--u-danger-color)
    // 대신 다른 명도 단이 칠해지고 버퍼 색은 정정되지 않은 채 남는다.
    this.progressBarEl.status = 'error';
    this.progressBarEl.value = 100;
    setTimeout(() => {
      this.progressBarEl.removeAttribute('visible');
      this.progressBarEl.status = 'default';
    }, 300);
  }

  private handleOverlaySlotChange = (e: Event) => {
    const open = slotHasContent(e.target as HTMLSlotElement);
    if (open && !this.hasOverlay) {
      const active = deepActiveElement();
      this.overlayTrigger = active && active !== document.body ? active : null;
    }
    this.hasOverlay = open;
  };

  private handleNoticeSlotChange = (e: Event) => {
    this.hasNotice = slotHasContent(e.target as HTMLSlotElement);
  };

  /** 오버레이 패널에 배정된 요소들 */
  private overlayPanels(): Element[] {
    const slot = this.shadowRoot?.querySelector<HTMLSlotElement>('slot[name="overlay"]');
    return slot?.assignedElements({ flatten: true }) ?? [];
  }

  /**
   * 열린 패널로 포커스를 옮긴다 — 순서는 `UOverlayElement` 와 같다:
   * `[autofocus]` → 첫 입력 컨트롤 → (없으면) 셸의 닫기 버튼.
   * 닫기 버튼으로 떨어지는 것은 의도다 — 포커스가 `<body>` 에 남는 것보다 항상 낫고,
   * 셸이 늘 가진 유일한 컨트롤이다. 소비자가 이미 패널 안으로 옮겨 두었으면 건드리지 않는다.
   */
  private focusOverlay(): void {
    const panels = this.overlayPanels();
    const active = deepActiveElement();
    if (active && panels.some(p => composedContains(p, active))) return;

    const pick = (selector: string) => {
      for (const p of panels) {
        if (p.matches(selector)) return p as HTMLElement;
        const found = p.querySelector<HTMLElement>(selector);
        if (found) return found;
      }
      return null;
    };
    const target = pick('[autofocus]')
      ?? pick('input, select, textarea, u-input, u-textarea, u-select, u-checkbox, u-radio, u-switch, u-slider')
      ?? this.shadowRoot?.querySelector<HTMLElement>('.overlay-close');
    target?.focus();
  }

  /**
   * 닫힌 뒤 포커스를 연 컨트롤로 되돌린다. 포커스가 `<body>` 로 떨어졌을 때만 —
   * 소비자가 닫으며 다른 곳으로 옮겼다면 그것을 존중한다.
   * 연 컨트롤이 없으면(프로그램이 연 경우) 메인 스크롤러로 — 라우트 완료 때와 같은 자리다.
   */
  private restoreOverlayFocus(): void {
    const trigger = this.overlayTrigger;
    this.overlayTrigger = null;
    const active = deepActiveElement();
    if (active && active !== document.body) return;
    if (trigger?.isConnected) trigger.focus();
    else this.mainElement?.focus({ preventScroll: true });
  }

  /**
   * 패널 안의 Escape 는 닫기 버튼과 같은 `overlay-close` 를 낸다.
   * window 버블 단계에서 받는다 — 패널 안의 목록·팝오버가 자기 층을 닫으며 먹은 키
   * (`defaultPrevented`)는 그 층의 몫이다. 한 번의 Escape 는 한 층만 닫는다.
   * 경로에 패널이 없으면(사이드바, 패널 위에 띄운 대화상자) 받지 않는다.
   */
  private handleOverlayEscape = (e: KeyboardEvent) => {
    if (e.key !== 'Escape' || e.defaultPrevented || e.isComposing || !this.hasOverlay) return;
    const overlay = this.shadowRoot?.querySelector('.overlay');
    if (!overlay || !e.composedPath().includes(overlay)) return;
    e.preventDefault();
    this.handleOverlayClose();
  };

  private handleOverlayClose = () => {
    this.fire('overlay-close', { cancelable: false });
  };

  /** .main 키보드 스크롤 핸들러 (WCAG 2.1 SC 2.1.1) */
  private _handleMainKeydown = (e: KeyboardEvent) => {
    // 편집 가능한 요소(input/textarea/select/contenteditable/ARIA textbox 등)에서의
    // Space·화살표·Home/End·PageUp/Down은 그 요소의 텍스트 입력·커서 이동이다.
    // 스크롤 단축키로 가로채면 입력 자체가 막히므로(예: 폼 필드에서 띄어쓰기 불가) 건너뛴다.
    // web component shadow DOM 내부의 native input까지 잡기 위해, retarget된 e.target 대신
    // composedPath()[0](조합 경로상 실제 발신 요소)을 검사한다.
    const origin = e.composedPath()[0];
    if (origin instanceof HTMLElement && isEditableElement(origin)) return;

    const main = this.shadowRoot?.querySelector<HTMLElement>('.main');
    if (!main) return;
    if (!isMainTheScrollTarget(e.composedPath(), main)) return;
    const page = main.clientHeight;
    const step = 80;
    switch (e.key) {
      case ' ':
      case 'PageDown': main.scrollTop += e.shiftKey ? -page : page; break;
      case 'PageUp':   main.scrollTop -= page; break;
      case 'End':      main.scrollTop = main.scrollHeight; break;
      case 'Home':     main.scrollTop = 0; break;
      case 'ArrowDown': main.scrollTop += step; break;
      case 'ArrowUp':   main.scrollTop -= step; break;
      default: return;
    }
    e.preventDefault();
  }

  /** 화면 크기 변경에 따른 사이드바 상태 업데이트 */
  private handleScreenResize = (event: ScreenResizeEvent) => {
    const size = event.detail.size;
    this.screenSize = size;
    if (size === 'large') {
      this.state = 'default';
    } else if (size === 'medium') {
      this.state = 'slim';
    } else if (size === 'small') {
      this.state = 'mobile';
    } else {
      console.warn('Unknown screen size:', size);
    }
  }
}