import { html, nothing, PropertyValues } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { autorun, IReactionDisposer } from 'mobx';

import { BaseElement } from '@iyulab/components/dist/components/BaseElement.js';
import { IconButton } from '@iyulab/components/dist/components/icon-button/IconButton.js';

import { progress, screen, type ScreenSize } from '../internals/observables.js';
import { ExtendedBaseElement } from '../internals/ExtendedBaseElement';
import { ProgressBar } from '../components/ProgressBar';
import { SidebarLogo } from '../components/SidebarLogo';
import { SidebarSection } from '../components/SidebarSection';
import { SidebarGroup } from '../components/SidebarGroup';
import { SidebarLink } from '../components/SidebarLink';
import { SidebarButton } from '../components/SidebarButton';
import type { SidebarItem, SidebarLayoutConfig, SidebarState, SidebarParts } from './SidebarLayout.types';
import { styles } from './SidebarLayout.styles.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

/** 엘리먼트 타입 매핑 */
declare global {
  interface HTMLElementTagNameMap {
    'u-progress-bar': ProgressBar;
    'u-sidebar-logo': SidebarLogo;
    'u-sidebar-section': SidebarSection;
    'u-sidebar-group': SidebarGroup;
    'u-sidebar-link': SidebarLink;
    'u-sidebar-button': SidebarButton;
  }
}

/**
 * SidebarLayout - 반응형 사이드바 레이아웃
 * - large: docked / slim
 * - medium: slim / modal
 * - small: closed / modal
 * 
 * - docked: 사이드바가 펼침 상태로 표시됨
 * - slim: 아이콘만 표시되는 슬림 모드
 * - modal: 오버레이로 사이드바가 펼침 상태로 표시되는 모달 모드, 백드롭 클릭 시 닫힘
 * - closed: 사이드바가 왼쪽에 완전히 숨겨진 상태
 */
@customElement('app-sidebar-layout')
export class SidebarLayout extends ExtendedBaseElement<SidebarParts> {
  static styles = [ super.styles, styles ];
  static dependencies: Record<string, typeof BaseElement> = {
    'u-icon-button': IconButton,
    'u-progress-bar': ProgressBar,
    'u-sidebar-logo': SidebarLogo,
    'u-sidebar-section': SidebarSection,
    'u-sidebar-group': SidebarGroup,
    'u-sidebar-link': SidebarLink,
    'u-sidebar-button': SidebarButton,
  };
  
  /** 반응형 상태 관리를 위한 MobX 반응 해제 함수들 */
  private disposers: IReactionDisposer[] = [];
  
  @query('u-progress-bar') progressEl?: ProgressBar;

  /** 사이드바 상태 */
  @state() state: SidebarState = 'docked';
  
  /** 사이드바 레이아웃 설정 */
  @property({ type: Object }) config?: SidebarLayoutConfig;

  connectedCallback() {
    super.connectedCallback();

    this.disposers.push(autorun(() => {
      const screenSize = screen.get();
      this.updateState(screenSize);
    }));
    this.disposers.push(autorun(() => {
      const progressValue = progress.get();
      if (!this.progressEl) return;
      this.progressEl.value = progressValue;
    }));
    window.addEventListener('route-begin', this.toggleStateIfModalState);
  }

  disconnectedCallback() {
    this.disposers.forEach(dispose => dispose());
    window.removeEventListener('route-begin', this.toggleStateIfModalState);
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
      <!-- Sidebar -->
      <aside class="sidebar" part="sidebar" state=${this.state}>
        <!-- Sidebar Header -->
        <div class="sidebar-header" part="sidebar-header">
          <u-sidebar-logo
            .compact="${this.state === 'slim'}"
            .type=${this.config.logo.type}
            .image="${this.config.logo.image}"
            .icon="${this.config.logo.icon}"
            .label="${this.config.logo.label}"
            .styles="${this.config.logo.styles as any}"
            @click="${this.config.logo.onClick}"
          ></u-sidebar-logo>
          <u-icon-button class="sidebar-toggler" part="sidebar-toggler"
            name=${this.state === 'closed' ? 'chevron-right' : 'layout-sidebar'}
            @click="${this.toggleState}"
          ></u-icon-button>
        </div>

        <!-- Sidebar Navigation Menu -->
        <nav class="sidebar-menu" part="sidebar-menu">
          ${repeat(this.config.menu ?? [], 
            (_, idx) => idx,
            (item, _) => this.renderItem(item))}
        </nav>

        <!-- Sidebar Footer -->
        <div class="sidebar-footer" part="sidebar-footer"
          ?hidden="${!this.config.footer || this.config.footer.length === 0}">
          ${repeat(this.config.footer ?? [], 
            (_, idx) => idx,
            (item, _) => this.renderItem(item))}
        </div>
      </aside>

      <!-- Main Content -->
      <div class="main" part="main">
        <u-progress-bar part="progress"></u-progress-bar>

        <u-outlet></u-outlet>
      </div>

      <!-- Backdrop for modal state -->
      <div class="backdrop"
        ?hidden="${this.state !== 'modal'}"
        @click="${this.toggleStateIfModalState}"
      ></div>
    `;
  }

  /** 사이드바 아이템 렌더링 */
  private renderItem(item: SidebarItem): any {
    if (!item) return nothing;

    if(item.type === 'content') {
      return this.state === 'slim' 
        ? nothing 
        : unsafeHTML(item.content);
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
    } else if(item.type === 'section') {
      return html`
        <u-sidebar-section
          ?compact=${this.state === 'slim'}
          .mainTitle="${item.title}"
          .subTitle="${item.subTitle}"
          .items="${item.items}"
          .styles="${item.styles as any}">
          ${repeat(item.items, 
            (_, idx) => idx,
            (subItem, _) => this.renderItem(subItem))}
        </u-sidebar-section>
      `;
    } else if(item.type === 'group') {
      return html`
        <u-sidebar-group
          ?compact=${this.state === 'slim'}
          ?collapsed="${item.collapsed ?? false}"
          .icon="${item.icon}"
          .label="${item.label}"
          .items="${item.items}"
          .styles="${item.styles as any}">
          ${repeat(item.items, 
            (_, idx) => idx,
            (subItem, _) => this.renderItem(subItem))}
        </u-sidebar-group>
      `;
    } else {
      return html`
        <u-sidebar-link
          ?compact=${this.state === 'slim'}
          .icon="${item.icon}"
          .label="${item.label}"
          .href="${item.href}"
          .pattern="${item.pattern}"
          .styles="${item.styles as any}"
        ></u-sidebar-link>
      `;
    }
  }

  /** 화면 크기 변경에 따른 사이드바 상태 업데이트 */
  private updateState(size: ScreenSize) {
    if (size === 'large') {
      this.state = 'docked';
    } else if (size === 'medium') {
      this.state = 'slim';
    } else if (size === 'small') {
      this.state = 'closed';
    } else {
      console.warn('Unknown screen size:', size);
    }
  }

  /** 사이드바 토글 핸들러 */
  private toggleState = () => {
    const size = screen.get();
    if (size === 'large') {
      this.state = this.state === 'docked' ? 'slim' : 'docked';
    } else if (size === 'medium') {
      this.state = this.state === 'slim' ? 'modal' : 'slim';
    } else if (size === 'small') {
      this.state = this.state === 'closed' ? 'modal' : 'closed';
    } else {
      console.warn('Unknown screen size:', size);
    }
  }

  /** 
   * 모달 상태에서 사이드바 닫기
   * 백드롭 클릭 or 라우트 변경 시
   */
  private toggleStateIfModalState = () => {
    const screenSize = screen.get();
    if (this.state !== 'modal') return;

    if (screenSize === 'medium') {
      this.state = 'slim';
    } else if (screenSize === 'small') {
      this.state = 'closed';
    }
  }
}