import { LitElement, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';

import { convertReact } from '@iyulab/u-components/utils';

@customElement('u-outlet')
export class UOutlet extends LitElement {

  render() {
    return html`
      <slot></slot>
    `
  }

  static styles = css`
    :host {
      display: contents;
    }
  `;
  
}

export const Outlet = convertReact({
  elementClass: UOutlet,
  tagName: 'u-outlet',  
});