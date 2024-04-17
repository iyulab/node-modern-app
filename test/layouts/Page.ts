import { convertReact } from '@iyulab/u-components/utils';
import { LitElement, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('u-page')
export class UPage extends LitElement {

  render() {
    return html`
      <slot></slot>
    `;
  }

  static styles = css`
    :host {
      position: relative;
      flex: 1;
      overflow: auto;
    }
    
  `;
}

export const Page = convertReact({
  elementClass: UPage,
  tagName: 'u-page',
});