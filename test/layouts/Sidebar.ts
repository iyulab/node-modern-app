import { LitElement, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { convertReact } from '@iyulab/u-components/utils';

import "../router/elements/Link";

@customElement('u-sidebar')
export class USidebar extends LitElement {
  

  render() {
    return html`
      <u-link href="/lit">Lit</u-link>
      <u-link href="react">React</u-link>
    `;
  }

  static styles = css`
    
  `;
}

export const Sidebar = convertReact({
  elementClass: USidebar,
  tagName: 'u-sidebar',
});