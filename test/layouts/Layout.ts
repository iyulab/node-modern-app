import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { convertReact } from '@iyulab/u-components/utils';

import '../router/elements/Outlet';
import './Header';
import './Sidebar';

@customElement('u-layout')
export class ULayout extends LitElement {

  @property({ type: Object }) screen: any;
  @property({ type: Object }) breakpoint: any;

  connectedCallback() {
    super.connectedCallback();
    document.body.style.margin = '0';
    document.body.style.overflow = 'hidden';
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }

  render() {
    return html`
      <u-header

      ></u-header>
      <u-sidebar
        
      ></u-sidebar>
      <u-outlet></u-outlet>
    `;
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

    u-page {
      grid-column: 2;
      grid-row: 2;
    }

  `;
}

export const Layout = convertReact({
  elementClass: ULayout,
  tagName: 'u-layout',
});