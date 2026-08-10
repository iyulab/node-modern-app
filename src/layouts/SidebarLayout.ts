import { html, nothing, PropertyValues } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { repeat } from 'lit/directives/repeat.js';

import '../components/SidebarSection';
import '../components/SidebarGroup';
import '../components/SidebarLink';
import '../components/SidebarButton';
import '@iyulab/components/dist/components/icon/UIcon.js';
import '@iyulab/components/dist/components/button/UButton.js';
import { UProgressBar } from '@iyulab/components/dist/components/progress-bar/UProgressBar.js';
import { RouteContext, RouteBeginEvent, RouteDoneEvent, RouteProgressEvent } from '@iyulab/router';
import { app } from '../App.js';
import type { ScreenResizeEvent } from '../internals/ScreenObserver.js';
import { StyledElement } from '../internals/StyledElement.js';
import type { SidebarItem, SidebarLayoutConfig, SidebarState, SidebarParts } from './SidebarLayout.types';
import { filterSidebarItems } from './filterSidebarItems.js';
import { styles } from './SidebarLayout.styles.js';

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

@customElement('u-sidebar-layout')
export class SidebarLayout extends StyledElement<SidebarParts> {
  static styles = [ super.styles, styles ];

  /** 사이드바 상태 */
  @property({ type: String, reflect: true }) state: SidebarState = 'default';
  /** 사이드바 레이아웃 설정 */
  @property({ type: Object }) config?: SidebarLayoutConfig;

  @query('u-progress-bar') progressBarEl!: UProgressBar;

  /** 현재 라우터 컨텍스트 */
  @state() context: RouteContext | null = null;

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
    super.disconnectedCallback();
  }

  protected willUpdate(changedProperties: PropertyValues): void {
    super.willUpdate(changedProperties);

    if (changedProperties.has('config')) {
      this.styles = this.config?.styles;
    }
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
          @click=${this.handleToggleButtonClick}>
          <u-icon
            lib="bootstrap"
            name=${this.state === 'mobile-open' ? 'x-lg' : 'list'}
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
            @click=${this.handleToggleButtonClick}>
            <u-icon
              lib="bootstrap"
              name="layout-sidebar"
            ></u-icon>
          </u-button>
        </div>

        <!-- Sidebar Navigation Menu -->
        <nav class="sidebar-main" part="sidebar-main" scrollable>
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
      <div class="main" part="main" scrollable tabindex="-1" @keydown=${this._handleMainKeydown}>
        <u-progress-bar part="progress"></u-progress-bar>

        <slot></slot>
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
      return html`
        <u-sidebar-group
          ?compact=${this.state === 'slim'}
          ?selected=${selected}
          ?collapsed="${item.collapsed ?? false}"
          .icon="${item.icon}"
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
  private handleBrandLogoClick = (href?: string) => () => {
    app.navigate(href ?? '');
  }

  /** 로고 렌더링: 아이콘명(문자열, 기존 동작) | 이미지({src,alt,href}) | 커스텀 렌더 함수 */
  private renderLogo() {
    const logo = this.config?.logo;

    if (!logo || typeof logo === 'string') {
      return html`
        <u-icon class="logo"
          .name="${logo}"
          @click=${this.handleBrandLogoClick()}
        ></u-icon>
      `;
    }
    if (typeof logo === 'function') {
      const content = logo(this.state);
      return html`
        <span class="logo" @click=${this.handleBrandLogoClick()}>
          ${typeof content === 'string' ? unsafeHTML(content) : content}
        </span>
      `;
    }
    return html`
      <img class="logo"
        src="${logo.src}"
        alt="${logo.alt ?? ''}"
        @click=${this.handleBrandLogoClick(logo.href)}
      />
    `;
  }

  /** 사이드바 토글 핸들러 */
  private handleToggleButtonClick = () => {
    const size = app.screen ?? 'large';
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
  private handleRouteDone = (_: RouteDoneEvent) => {
    this.progressBarEl.value = 100;
    setTimeout(() => {
      this.progressBarEl.removeAttribute('visible');
    }, 300);
    // Move focus to .main so keyboard scrolling works without a mouse click
    const main = this.shadowRoot?.querySelector<HTMLElement>('.main');
    main?.focus({ preventScroll: true });
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