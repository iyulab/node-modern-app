import { html, nothing, PropertyValues } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { repeat } from 'lit/directives/repeat.js';

import { RouteContext, RouteBeginEvent, RouteDoneEvent, RouteProgressEvent } from '@iyulab/router';
import { UElement } from '@iyulab/components/dist/components/UElement.js';
import { UIcon } from '@iyulab/components/dist/components/icon/UIcon.component.js';
import { UButton } from '@iyulab/components/dist/components/button/UButton.component.js';
import { UProgressBar } from '@iyulab/components/dist/components/progress-bar/UProgressBar.component.js';

import { app } from '../App.js';
import type { ScreenResizeEvent } from '../internals/ScreenObserver.js';
import { StyledElement } from '../internals/StyledElement.js';
import { SidebarSection } from '../components/SidebarSection';
import { SidebarGroup } from '../components/SidebarGroup';
import { SidebarLink } from '../components/SidebarLink';
import { SidebarButton } from '../components/SidebarButton';
import type { SidebarItem, SidebarLayoutConfig, SidebarState, SidebarParts } from './SidebarLayout.types';
import { styles } from './SidebarLayout.styles.js';

/** 엘리먼트 타입 매핑 (for devevelop experience) */
declare global {
  interface HTMLElementTagNameMap {
    'u-icon': UIcon;
    'u-button': UButton;
    'u-progress-bar': UProgressBar;
    'u-sidebar-section': SidebarSection;
    'u-sidebar-group': SidebarGroup;
    'u-sidebar-link': SidebarLink;
    'u-sidebar-button': SidebarButton;
  }
}

// 아이콘 등록
import { IconRegistry } from '@iyulab/components/dist/utilities/IconRegistry.js';
IconRegistry.register('sidebar-app', (name) => {
  return name === 'layout-sidebar' 
    ? `<svg viewBox="0 0 16 16"><path d="M0 3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm5-1v12h9a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1zM4 2H2a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h2z"/></svg>`
    : name === 'list' 
    ? `<svg viewBox="0 0 16 16"><path fill-rule="evenodd" d="M1 3a1 1 0 0 1 1-1h12a1 1 0 0 1 0 2H2a1 1 0 0 1-1-1 m0 5a1 1 0 0 1 1-1h12a1 1 0 0 1 0 2H2a1 1 0 0 1-1-1 m0 5a1 1 0 0 1 1-1h12a1 1 0 0 1 0 2H2a1 1 0 0 1-1-1"/></svg>`
    : name === 'x-lg'
    ? `<svg viewBox="0 0 16 16"><path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/></svg>`
    : ``;
});

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
@customElement('u-sidebar-layout')
export class SidebarLayout extends StyledElement<SidebarParts> {
  static styles = [ super.styles, styles ];
  static dependencies: Record<string, typeof UElement> = {
    'u-icon': UIcon,
    'u-button': UButton,
    'u-progress-bar': UProgressBar,
    'u-sidebar-section': SidebarSection,
    'u-sidebar-group': SidebarGroup,
    'u-sidebar-link': SidebarLink,
    'u-sidebar-button': SidebarButton,
  };

  @query('u-progress-bar') progressBarEl!: UProgressBar;

  /** 현재 라우터 컨텍스트 */
  @state() context: RouteContext | null = null;
  
  /** 사이드바 상태 */
  @property({ type: String, reflect: true }) state: SidebarState = 'default';
  /** 사이드바 레이아웃 설정 */
  @property({ type: Object }) config?: SidebarLayoutConfig;

  connectedCallback() {
    super.connectedCallback();

    window.addEventListener('route-begin', this.handleRouteBegin);
    window.addEventListener('route-done', this.handleRouteDone);
    window.addEventListener('route-progress', this.handleRouteProgress);
    window.addEventListener('screen-resize', this.handleScreenResize);
  }

  disconnectedCallback() {
    window.removeEventListener('route-begin', this.handleRouteBegin);
    window.removeEventListener('route-done', this.handleRouteDone);
    window.removeEventListener('route-progress', this.handleRouteProgress);
    window.removeEventListener('screen-resize', this.handleScreenResize);
    super.disconnectedCallback();
  }

  protected updated(changedProperties: PropertyValues): void {
    super.updated(changedProperties);

    if (changedProperties.has('config')) {
      this.styles = this.config?.styles;
    }
  }

  render() {
    if (!this.config) return nothing;

    return html`
      <!-- Mobile Header -->
      <div class="mobile-header" part="mobile-header" ?hidden="${!this.state.startsWith('mobile')}">
        <u-icon class="logo"
          .name="${this.config.logo}"
          @click=${this.handleBrandLogoClick}
        ></u-icon>
        <span class="title">
          ${this.config.title}
        </span>
        <u-button class="toggler"
          @click=${this.handleToggleButtonClick}>
          <u-icon 
            lib="sidebar-app" 
            name=${this.state === 'mobile-open' ? 'x-lg' : 'list'}
          ></u-icon>
        </u-button>
      </div>

      <!-- Sidebar -->
      <aside class="sidebar" part="sidebar" state="${this.state}">
        <!-- Sidebar Header -->
        <div class="sidebar-header" part="sidebar-header">
          <u-icon class="logo"
            .name="${this.config.logo}"
            @click=${this.handleBrandLogoClick}
          ></u-icon>
          <span class="title" ?hidden=${this.state === 'slim'}>
            ${this.config.title}
          </span>
          <u-button class="toggler"
            @click=${this.handleToggleButtonClick}>
            <u-icon 
              lib="sidebar-app" 
              name="layout-sidebar"
            ></u-icon>
          </u-button>
        </div>

        <!-- Sidebar Navigation Menu -->
        <nav class="sidebar-main" part="sidebar-main" scrollable>
          ${repeat(this.config.main ?? [], 
            (_, idx) => idx,
            (item, _) => this.renderItem(item))}
        </nav>

        <!-- Sidebar Footer -->
        <div class="sidebar-footer" part="sidebar-footer">
          ${repeat(this.config.footer ?? [], 
            (_, idx) => idx,
            (item, _) => this.renderItem(item))}
        </div>
      </aside>

      <!-- Main Content -->
      <div class="main" part="main" scrollable>
        <u-progress-bar part="progress"></u-progress-bar>

        <u-outlet></u-outlet>
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
            (subItem, _) => this.renderItem(subItem))}
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
            (subItem, _) => this.renderItem(subItem))}
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

  /** 브랜드 로고 클릭 핸들러 */
  private handleBrandLogoClick = () => {
    app.navigate('');
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