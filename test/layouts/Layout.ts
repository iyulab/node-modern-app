import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { autorun } from 'mobx';
import { convertReact } from '@iyulab/u-components/utils';

import type { HeaderModel } from './Header';
import type { SidebarModel } from './Sidebar';
import { App, type AppScreen } from '../App';

import "@iyulab/u-components/components/icon";
import "@iyulab/u-components/components/button";
import "@iyulab/u-components/components/dropdown";
import "@iyulab/u-components/components/menu";
import "@iyulab/u-components/components/breadcrumb";
import "@iyulab/u-components/components/divider";

import './Header';
import './Sidebar';
import './Page';
import '../components/header-parts';
import '../components/sidebar-parts';
import '../router/Link';
import '../router/Outlet';

@customElement('u-layout')
export class ULayout extends LitElement {

  @property({ type: String, reflect: true }) screen?: AppScreen;
  @property({ type: Boolean, reflect: true }) open: boolean = true;
  
  @property({ type: String }) basepath?: string;
  @property({ type: Object }) progress?: any;
  @property({ type: Object }) header?: HeaderModel;
  @property({ type: Object }) sidebar?: SidebarModel;

  connectedCallback() {
    super.connectedCallback();
    document.body.style.margin = '0';
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
        ${this.renderHeaderProgress()}
      </u-header>
      
      <div class="main">
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

        <u-outlet></u-outlet>

        <div class="overlay"
          @click=${() => this.open = false}
        ></div>
      </div>
    `;
  }

  private renderHeaderProgress() {
    if (!this.progress) return;
    this.progress.setAttribute('slot', 'progress');
    return html`${this.progress}`;
  }

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
      throw new Error(' Lit Element의 형식이 잘못되었습니다.');
    }
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

export const Layout = convertReact({
  elementClass: ULayout,
  tagName: 'u-layout',
});