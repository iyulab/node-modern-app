import { LitElement, css, html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { autorun } from 'mobx';

import type { HeaderModel } from './Header';
import type { SidebarModel } from './Sidebar';
import { App, type AppScreen } from '../App';

import '../components/header-parts';
import '../components/sidebar-parts';
import '../router/Link';
import '../router/Outlet';
import './Header';
import './Sidebar';
import './Page';

@customElement('u-layout')
export class ULayout extends LitElement {

  @query('.progress-bar') progressbar!: HTMLDivElement;

  @property({ type: String, reflect: true }) screen?: AppScreen;
  @property({ type: Boolean, reflect: true }) open: boolean = true;
  
  @property({ type: String }) basepath?: string;
  @property({ type: Object }) header?: HeaderModel;
  @property({ type: Object }) sidebar?: SidebarModel;

  connectedCallback() {
    super.connectedCallback();
    document.body.style.margin = '0';
    document.addEventListener('route-progress',this.handleProgressChange);
    document.addEventListener('route-change',this.handleRouteChange);
  }

  disconnectedCallback() {
    document.removeEventListener('route-progress',this.handleProgressChange);
    document.removeEventListener('route-change',this.handleRouteChange);
    super.disconnectedCallback();
  }

  protected async firstUpdated(changedProperties: any) {
    super.firstUpdated(changedProperties);
    await this.updateComplete;
    autorun(() => {
      this.screen = App.screen.get();
    });
  }

  protected async updated(changedProperties: any) {
    super.updated(changedProperties);
    await this.updateComplete;

    if (changedProperties.has('screen')) {
      this.open = this.screen === 'large' ? true : false;
    }
  }

  render() {
    return html`
      <!-- 라우터 진행률 표시 -->
      <div class="progress-bar"></div>

      <!-- 레이아웃 헤드 엘리먼트 -->
      <u-header
        .screen=${this.screen}
        .basepath=${this.basepath}
        .headline=${this.header?.title}
        .breadcrumbs=${this.header?.breadcrumbs}
        .action=${this.header?.action}
        .option=${this.header?.option}
        .backgroundColor=${this.header?.backgroundColor}
      >
        <menu-button slot="prefix"
          @click=${() => this.open = !this.open}
        ></menu-button>
        ${this.renderHeaderCenter()}
      </u-header>
      
      <!-- 레이아웃 메인 엘리먼트 -->
      <div class="main">

        <!-- 레이아웃 사이드바 엘리먼트 -->
        <u-sidebar
          .open=${this.open}
          .screen=${this.screen}
          .basepath=${this.basepath}
          .menu=${this.sidebar?.menu}
          .option=${this.sidebar?.option}
          .backgroundColor=${this.sidebar?.backgroundColor}
        >
          ${this.renderSidebarHeader()}
          ${this.renderSidebarFooter()}
        </u-sidebar>

        <!-- 레이아웃 컨텐츠 페이지 엘리먼트 -->
        <u-outlet></u-outlet>

        <!-- 레이아웃 메뉴 오버레이 -->
        <div class="overlay"
          @click=${() => this.open = false}
        ></div>

      </div>
    `;
  }

  // ===== 렌더링 메서드 ===== //

  private renderHeaderCenter() {
    if (!this.header?.center) return;
    const center = this.createElement(this.header.center);
    center.setAttribute('slot', 'center');
    return html`${center}`;
  }

  private renderSidebarHeader() {
    if (!this.sidebar?.header) return;
    const header = this.createElement(this.sidebar.header);
    header.setAttribute('slot', 'header');
    return html`${header}`;
  }

  private renderSidebarFooter() {
    if (!this.sidebar?.footer) return;
    const footer = this.createElement(this.sidebar.footer);
    footer.setAttribute('slot', 'footer');
    return html`${footer}`;
  }

  private createElement(element: typeof LitElement | string) {
    if (typeof element === 'string') {
      return document.createElement(element);
    } else if (typeof element === 'function') {
      return new element();
    } else {
      throw new Error('Lit Element의 형식이 잘못되었습니다.');
    }
  }

  // ===== 라우팅 이벤트 핸들러 ===== //

  private handleProgressChange = (event: Event) => {
    const progress = (event as CustomEvent).detail;
    const opacity = this.progressbar.style.opacity;
    if (!opacity || opacity === '0') {
      this.progressbar.style.opacity = '1';
    }
    this.progressbar.style.transform = `scaleX(${progress})`;
  }

  private handleRouteChange = () => {
    if (this.screen !== 'large' && this.open) {
      this.open = false;
    }
    this.progressbar.style.transform = `scaleX(1)`;
    this.progressbar.style.opacity = '0';
  }

  static styles = css`
    :host {
      position: relative;
      width: 100vw;
      height: 100vh;
      display: flex;
      flex-direction: column;
      overflow: hidden;

      --header-height: 50px;
    }
    
    :host([screen="small"]) u-sidebar {
      position: absolute;
      z-index: 1000;
      left: -260px;
      width: 260px;
      transition: transform 0.3s ease-in-out;
    }
    :host([screen="small"][open]) u-sidebar {
      transform: translateX(260px);
    }

    :host([screen="medium"]) u-sidebar {
      position: absolute;
      z-index: 1000;
      width: 50px;
    }
    :host([screen="medium"][open]) u-sidebar {
      width: 260px;
    }
    :host([screen="medium"]) u-outlet {
      margin-left: 50px;
    }

    :host([screen="large"]) u-sidebar {
      position: relative;
      width: 50px;
    }
    :host([screen="large"][open]) u-sidebar {
      width: 260px;
    }

    :host(:not([screen="large"])[open]) .overlay {
      display: block;
    }

    .progress-bar {
      position: fixed;
      z-index: 100;
      top: 0;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: var(--sl-color-primary-700);
      opacity: 0;
      transform: scaleX(1);
      transform-origin: left;
      transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
    }

    u-header {
      position: relative;
      height: var(--header-height);
    }

    .main {
      position: relative;
      display: flex;
      flex-direction: row;
      width: 100%;
      height: calc(100% - var(--header-height));

      u-sidebar {
        position: relative;
        width: 260px;
        transition: width 0.3s ease-in-out;
      }

      u-outlet {
        position: relative;
        flex: 1;
      }

      .overlay {
        display: none;
        position: absolute;
        z-index: 100;
        width: 100%;
        height: 100%;
        background-color: var(--sl-overlay-background-color);
      }
    }
  `;
}
