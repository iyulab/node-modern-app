import { LitElement, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { autorun, IReactionDisposer } from 'mobx';

import '../components';
import type { SidebarConfig } from '../types/AppConfigs.js';
import { app } from '../index.js';
import { styles } from './SidebarLayout.styles.js';

/**
 * SidebarLayout - 반응형 사이드바 레이아웃
 * Small 화면: 사이드바 완전 collapsed, 상단 버튼으로 토글
 * Medium/Large 화면: 일반 collapsible 사이드바
 */
@customElement('app-sidebar-layout')
export class SidebarLayout extends LitElement {
  static styles = styles;
  
  private disposers: IReactionDisposer[] = [];
  
  @state() collapsed = false;
  @state() screenSize: 'small' | 'medium' | 'large' = 'large';
  @state() isLoading = false;
  
  @property({ type: Object }) config?: SidebarConfig;

  connectedCallback() {
    super.connectedCallback();
    
    // 반응형 상태 관찰
    this.disposers.push(
      autorun(() => {
        this.screenSize = app.screen.get();
        // Small 화면에서는 기본적으로 사이드바 숨김
        if (this.screenSize === 'small' && !this.collapsed) {
          this.collapsed = true;
        }
      })
    );
    
    this.disposers.push(
      autorun(() => {
        this.isLoading = app.isLoading.get();
      })
    );
    
    // 설정 기본값 적용
    if (this.config?.defaultCollapsed) {
      this.collapsed = this.config.defaultCollapsed;
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.disposers.forEach(dispose => dispose());
  }

  render() {
    const sidebarWidth = this.config?.width || 260;
    const collapsible = this.config?.collapsible !== false;
    const showMobileHeader = this.screenSize === 'small';
    
    this.style.setProperty('--sidebar-width', `${sidebarWidth}px`);

    return html`
      <!-- Loading Progress Bar -->
      ${this.isLoading ? html`
        <div class="progress-container">
          <app-progress-bar indeterminate color="#2563eb"></app-progress-bar>
        </div>
      ` : nothing}

      <!-- Mobile Header (Small 화면만) -->
      <div class="mobile-header ${showMobileHeader ? 'show' : ''}">
        <button class="menu-toggle" @click="${this.toggleSidebar}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
        ${this.config?.logo ? html`
          <app-logo .src="${this.config.logo}" .size="${32}"></app-logo>
        ` : nothing}
        ${this.config?.title ? html`
          <div class="sidebar-title">${this.config.title}</div>
        ` : nothing}
      </div>

      <!-- Sidebar -->
      <aside 
        class="sidebar ${this.collapsed ? (showMobileHeader ? 'hidden' : 'collapsed') : ''}"
        @navigate="${this.handleNavigate}"
      >
        <!-- Sidebar Header -->
        <div class="sidebar-header">
          ${this.config?.logo ? html`
            <app-logo 
              .src="${this.config.logo}" 
              .size="${32}"
              .collapsed="${this.collapsed}"
            ></app-logo>
          ` : nothing}
          
          ${this.config?.title && !this.collapsed ? html`
            <div class="sidebar-title">${this.config.title}</div>
          ` : nothing}
          
          ${collapsible && !showMobileHeader ? html`
            <button class="collapse-toggle" @click="${this.toggleSidebar}">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
          ` : nothing}
        </div>

        <!-- Sidebar Navigation -->
        <nav class="sidebar-nav">
          ${this.config?.navItems?.map(item => html`
            <app-nav-item
              .item="${item}"
              .activePath="${window.location.pathname}"
              .collapsed="${this.collapsed}"
            ></app-nav-item>
          `)}
        </nav>

        <!-- Sidebar Footer (Buttons) -->
        ${this.config?.buttons && this.config.buttons.length > 0 ? html`
          <div class="sidebar-footer">
            ${this.config.buttons.map(button => html`
              <button class="footer-button" @click="${button.onClick}">
                ${button.icon ? html`
                  <span class="footer-button__icon">
                    <u-icon remote name="${button.icon}"></u-icon>
                  </span>
                ` : nothing}
                <span class="footer-button__label">${button.label}</span>
              </button>
            `)}
          </div>
        ` : nothing}
      </aside>

      <!-- Main Content -->
      <div class="main-content">
        <u-outlet></u-outlet>
      </div>
    `;
  }

  private toggleSidebar() {
    this.collapsed = !this.collapsed;
  }

  private handleNavigate(e: CustomEvent) {
    const { path } = e.detail;
    if (path) {
      app.navigate(path);
      // Small 화면에서는 네비게이션 후 사이드바 자동 닫기
      if (this.screenSize === 'small') {
        this.collapsed = true;
      }
    }
  }
}