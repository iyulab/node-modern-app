import { LitElement, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { convertReact } from '@iyulab/u-components/utils';

@customElement('u-sidebar')
export class USidebar extends LitElement {
  

  render() {
    return html`

    `;
  }

  static styles = css`
    
  `;
}

export const Sidebar = convertReact({
  elementClass: USidebar,
  tagName: 'u-sidebar',
});