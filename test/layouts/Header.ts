import { LitElement, css, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { convertReact } from '@iyulab/u-components/utils';

import type { 
  HeaderConfig,
  HeaderLogo,
  HeaderTitle,
  Breadcrumb,
  HeaderButton,
} from './Header.model';

import "@iyulab/u-components/components/button";
import "@iyulab/u-components/components/dropdown";
import "@iyulab/u-components/components/breadcrumb";

@customElement('u-header')
export class UHeader extends LitElement {

  @property({ type: String }) basepath?: string;
  @property({ type: Object }) logo?: string | HeaderLogo;
  @property({ type: Object }) label?: string | HeaderTitle;
  @property({ type: Object }) breadcrumbs?: Breadcrumb;
  @property({ type: Object }) buttons?: HeaderButton;
  @property({ type: Array }) others?: any[];

  @property({ type: Object }) config?: HeaderConfig;

  protected async updated(changedProperties: any) {
    super.updated(changedProperties);
    await this.updateComplete;

    if (changedProperties.has('config') && this.config) {
      this.logo = this.config.logo || './favicon.ico';
      this.label = this.config.title;
      this.breadcrumbs = this.config.breadcrumbs;
      this.buttons = this.config.buttons;
      this.others = this.config.others;
    }
  }

  render() {
    // if(!this.config) return nothing;

    return html`
      ${this.renderLogo()}
      ${this.renderTitle()}
      ${this.renderBreadcrumbs()}
      ${this.renderActions()}
    `;
  }

  private renderLogo() {
    if (!this.logo) return nothing;

    return html`
      <img src=${this.logo} />
    `;
  }

  private renderTitle() {
    if (!this.label) return nothing;

    return html`
      <h1>${this.label}</h1>
    `;
  }

  private renderBreadcrumbs() {
    const pathnames = window.location.pathname.split('/');
    if (!this.breadcrumbs) {
      return html`
        <u-breadcrumb>
          <u-breadcrumb-item href=${this.basepath}>
          </u-breadcrumb-item>
        </u-breadcrumb>
      `;
    } else {
      return html`
        <u-breadcrumb>
          
        </u-breadcrumb>
      `;
    }
  }

  private renderActions() {
    return html`
      <u-dropdown>
        <u-button slot="trigger">Actions</u-button>
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