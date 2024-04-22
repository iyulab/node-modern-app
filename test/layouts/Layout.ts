import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { autorun } from 'mobx';
import { convertReact } from '@iyulab/u-components/utils';

import type { HeaderModel } from './Header.model';
import type { SidebarModel } from './Sidebar.model';
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

    if (changedProperties.has('header') && this.header?.backgroundColor) {
      this.style.setProperty('--header-background-color', this.header.backgroundColor);
    }
    if (changedProperties.has('sidebar') && this.sidebar?.backgroundColor) {
      this.style.setProperty('--sidebar-background-color', this.sidebar.backgroundColor);
    }
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
        .help=${this.header?.help}
        .locale=${this.header?.locale}
        .user=${this.header?.user}
        .option=${this.header?.option}
      >
        <div class="toggler" slot="toggler">
          <u-icon-button type="system" name="menu"
            size="24px" @click=${() => this.open = !this.open}
          ></u-icon-button>
        </div>
        ${this.renderHeaderExtra()}
        ${this.renderHeaderProgress()}
      </u-header>
      
      <u-sidebar
        .screen=${this.screen}
        .open=${this.open}
        .basepath=${this.basepath}
        .menuItem=${this.sidebar?.menuItem}
        .option=${this.sidebar?.option}
      >
        ${this.renderSidebarHeader()}
        ${this.renderSidebarFooter()}
      </u-sidebar>

      <u-outlet></u-outlet>

      <div class="overlay" slot="overlay"
        @click=${() => this.open = false}
      ></div>
    `;
  }

  private renderHeaderExtra() {
    if (!this.header?.extra) return;
    const extra = this.createElement(this.header.extra);
    extra.setAttribute('slot', 'extra');
    return html`${extra}`;
  }

  private renderHeaderProgress() {
    if (!this.progress) return;
    this.progress.setAttribute('slot', 'progress');
    return html`${this.progress}`;
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
      throw new Error('Provided element is neither a string nor a LitElement.');
    }
  }

  static styles = css`
    :host {
      position: relative;
      width: 100vw;
      height: 100vh;
      display: grid;
      overflow: hidden;
      grid-template-columns: auto 1fr;
      grid-template-rows: auto 1fr;

      --header-background-color: var(--sl-color-neutral-0);
      --sidebar-background-color: var(--sl-color-neutral-0);
    }
    :host([screen="small"]) u-sidebar {
      left: -260px;
      width: 260px;
      transition: transform 0.3s ease-in-out;
    }
    :host([screen="small"][open]) u-sidebar {
      transform: translateX(260px);
    }
    :host(:not([screen="small"])) u-sidebar {
      width: 50px;
    }
    :host(:not([screen="small"])[open]) u-sidebar {
      width: 260px;
    }
    :host([screen="medium"]) u-outlet {
      margin-left: 50px;
    }
    :host(:not([screen="large"])) u-sidebar {
      position: absolute;
      z-index: 1000;
    }
    :host(:not([screen="large"])[open]) .overlay {
      display: block;
    }

    u-header {
      position: relative;
      grid-column: 1 / span 2;
      grid-row: 1;
      box-sizing: border-box;
      background-color: var(--header-background-color);
      border-bottom: 1px solid var(--sl-color-gray-200);

      .toggler {
        width: 50px;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
    
    u-sidebar {
      position: relative;
      grid-column: 1;
      grid-row: 2;
      box-sizing: border-box;
      background-color: var(--sidebar-background-color);
      border-right: 1px solid var(--sl-color-gray-200);
      transition: width 0.3s ease-in-out;
    }

    u-outlet {
      grid-column: 2;
      grid-row: 2;
    }

    .overlay {
      grid-row: 2;
      display: none;
      position: absolute;
      z-index: 100;
      width: 100%;
      height: 100%;
      background-color: var(--sl-overlay-background-color);
    }
  `;
}

export const Layout = convertReact({
  elementClass: ULayout,
  tagName: 'u-layout',
});