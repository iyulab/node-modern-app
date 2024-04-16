import { LitElement, css, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { convertReact } from '@iyulab/u-components/utils';

@customElement('u-header')
export class UHeader extends LitElement {

  @property({ type: String }) logo?: string;
  @property({ type: String }) label?: string;

  render() {
    return html`
      ${this.logo ? html`<img src=${this.logo} />` : nothing}
      ${this.label ? html`<span>${this.label}</span>` : nothing}
      <u-breadcrumb>
        <u-breadcrumb-item href="/">Home</u-breadcrumb-item>
        <u-breadcrumb-item href="/about">About</u-breadcrumb-item>
        <u-breadcrumb-item href="/contact">Contact</u-breadcrumb-item>
      </u-breadcrumb>
      ${this.renderActions()}
    `;
  }

  private renderActions() {
    return html`
      <u-dropdown>
        <u-button>Actions</u-button>
        <u-dropdown-menu>
          <u-dropdown-item>Action 1</u-dropdown-item>
          <u-dropdown-item>Action 2</u-dropdown-item>
          <u-dropdown-item>Action 3</u-dropdown-item>
        </u-dropdown-menu>
      </u-dropdown>
    `;
  }

  static styles = css`
    :host {
      position: relative;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    }
  `;
}

export const Header = convertReact({
  elementClass: UHeader,
  tagName: 'u-header',
});