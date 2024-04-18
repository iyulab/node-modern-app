import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { autorun } from 'mobx';
import { convertReact } from '@iyulab/u-components/utils';

import type { HeaderConfig } from './Header.model';
import type { SidebarConfig } from './Sidebar.model';
import { App, type AppScreen } from '../App';

import "@iyulab/u-components/components/icon";
import "@iyulab/u-components/components/button";
import "@iyulab/u-components/components/dropdown";
import "@iyulab/u-components/components/menu";
import "@iyulab/u-components/components/breadcrumb";

import './Header';
import './Sidebar';
import './Page';
import '../components/header-parts';
import '../components/sidebar-parts';
import '../router/Link';
import '../router/Outlet';

@customElement('u-layout')
export class ULayout extends LitElement {

  @property({ type: String }) screen?: AppScreen;
  @property({ type: Object }) header?: HeaderConfig;
  @property({ type: Object }) sidebar?: SidebarConfig;

  connectedCallback() {
    super.connectedCallback();
    document.body.style.margin = '0';
    document.body.style.overflow = 'hidden';
  }

  protected async firstUpdated(changedProperties: any) {
    super.firstUpdated(changedProperties);
    await this.updateComplete;
    autorun(() => {
      this.screen = App.screen.get();
    });
  }

  render() {
    return html`
      <u-header
        .screen=${this.screen}
        .headline=${this.header?.title}
        .breadcrumbs=${this.header?.breadcrumbs}
        .help=${this.header?.help}
        .locale=${this.header?.locale}
        .theme=${this.header?.theme}
        .user=${this.header?.user}
        .option=${this.header?.option}
      >
        ${this.renderHeaderExtra()}
      </u-header>
      
      <u-sidebar
        .screen=${this.screen}
        .menuItem=${this.sidebar?.menuItem}
      >
        ${this.renderSidebarHeader()}
        ${this.renderSidebarFooter()}
      </u-sidebar>

      <u-outlet></u-outlet>
    `;
  }

  private renderHeaderExtra() {
    if (!this.header?.extra) return;
    const extra = this.createElement(this.header.extra);
    extra.setAttribute('slot', 'extra');
    return html`${extra}`;
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
      grid-template-columns: auto 1fr;
      grid-template-rows: auto 1fr;
    }
    :host([screen="small"]) {
      /* grid-template-columns: 1fr; */
    }

    u-header {
      grid-column: 1 / 3;
      grid-row: 1;
    }
    
    u-sidebar {
      grid-column: 1;
      grid-row: 2;
    }

    u-outlet {
      grid-column: 2;
      grid-row: 2;
    }

  `;
}

export const Layout = convertReact({
  elementClass: ULayout,
  tagName: 'u-layout',
});