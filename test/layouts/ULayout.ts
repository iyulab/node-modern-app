import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { convertReact } from '@iyulab/u-components/utils';

import './UHeader';
import './USidebar';
import './UPage';

@customElement('u-layout')
export class ULayout extends LitElement {
  private readonly observer = new ResizeObserver(this.handleResize);

  @property({ type: Object }) screen: any;
  @property({ type: Object }) breakpoint: any;

  connectedCallback() {
    super.connectedCallback();
    this.observer.observe(this);
  }

  disconnectedCallback() {
    this.observer.unobserve(this);
    super.disconnectedCallback();
  }

  render() {
    return html`
      <u-header></u-header>
      <u-sidebar></u-sidebar>
      <u-page>
        <u-outlet></u-outlet>
      </u-page>
    `;
  }

  private handleResize() {
    const width = this.offsetWidth;
    if (!this.breakpoint.small && 
      width <= this.breakpoint.small
    ) {
      this.screen = 'small';
    } else if (!this.breakpoint.middle &&
      (width > this.breakpoint.small && width <= this.breakpoint.middle)
    ) {
      this.screen = 'middle';
    } else if (!this.breakpoint.large &&
      width > this.breakpoint.large
    ) {
      this.screen = 'large';
    }
  }

  static styles = css`
    :host {
      position: relative;
      width: 100vw;
      height: 100vh;
      display: grid;
      grid-template-columns: 1fr 1fr;
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