import { html, nothing, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { autorun, IReactionDisposer } from 'mobx';

import { UElement } from '@iyulab/components/dist/internals/UElement.js';
import { Button } from '@iyulab/components/dist/components/button/Button.js';
import { IconButton } from '@iyulab/components/dist/components/icon-button/IconButton.js';
import { RouteDoneEvent, type RouteInfo } from '@iyulab/router';
import type { ScreenSize } from '../types/AppTypes';
import type { SidebarLayoutConfig } from './SidebarLayout.types';
import { styles } from './SidebarLayout.styles.js';

import { app } from '../app.js';
import '../components';

/**
 * SidebarLayout - 반응형 사이드바 레이아웃
 * Small 화면: 사이드바 완전 collapsed, 상단 버튼으로 토글
 * Medium/Large 화면: 일반 collapsible 사이드바
 */
@customElement('app-sidebar-layout')
export class SidebarLayout extends UElement {
  static styles = [ super.styles, styles ];
  static dependencies: Record<string, typeof UElement> = {
    'u-button': Button,
    'u-icon-button': IconButton,
  };
  
  private disposers: IReactionDisposer[] = [];
  
  @state() collapsed = false;
  @state() screenSize: ScreenSize = 'large';
  @state() progressValue = 0;
  @state() currentRouteInfo?: RouteInfo;
  
  @property({ type: Object }) config?: SidebarLayoutConfig;

  connectedCallback() {
    super.connectedCallback();
    
    this.disposers.push(autorun(() => {
      this.screenSize = app.screen.get();
    }));
    this.disposers.push(autorun(() => {
      this.progressValue = app.progress.get();
    }));
    window.addEventListener('route-done', this.handleRouteDone);
  }

  disconnectedCallback() {
    this.disposers.forEach(dispose => dispose());
    window.removeEventListener('route-done', this.handleRouteDone);

    super.disconnectedCallback();
  }

  protected willUpdate(changedProperties: PropertyValues): void {
    super.willUpdate(changedProperties);

    if (changedProperties.has('screenSize')) {
      if (this.screenSize === 'small') {
        this.collapsed = true;
      }
    }
  }

  render() {
    if (!this.config) return nothing;

    return html`
      <!-- Sidebar -->
      <aside class="sidebar" ?collapsed="${this.collapsed}" ?hidden="${this.screenSize === 'small' && this.collapsed}">
        <!-- Sidebar Header -->
        <div class="sidebar-header">
          <sb-logo
            .icon="${this.config.logo.icon}" 
            .label="${this.config.logo.label}"
          ></sb-logo>
        </div>

        <!-- Sidebar Navigation -->
        <nav class="sidebar-nav">
          ${this.config?.navItems?.map(item => html`
            <u-nav-item
              ?collapsed="${this.collapsed}"
              ?selected="${this.currentRouteInfo?.path === item.path}"
              .icon="${item.icon}"
              .label="${item.label}"
              .href="${item.path}"
            ></u-nav-item>
          `)}
        </nav>

        <!-- Sidebar Footer (Buttons) -->
        <div class="sidebar-footer">
          ${this.config.buttons?.map(button => html`
            <u-button @click="${button.onClick}">
              ${button.icon 
                ? html`<u-icon remote name="${button.icon}"></u-icon>` 
                : nothing}
              ${button.label && !this.collapsed
                ? html`${button.label}`
                : nothing}
            </u-button>
          `)}
        </div>
      </aside>

      <!-- Main Content -->
      <div class="main">
        <u-progress-bar 
          .value="${this.progressValue}"
        ></u-progress-bar>

        <u-icon-button
          name="layout-sidebar"
          @click="${this.toggleSidebar}"
        ></u-icon-button>
        
        <u-outlet></u-outlet>
      </div>
    `;
  }

  private toggleSidebar() {
    this.collapsed = !this.collapsed;
  }

  private handleRouteDone = (e: RouteDoneEvent) => {
    this.currentRouteInfo = e.routeInfo;
  }
}