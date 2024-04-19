import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { App } from "../../App";

export interface HeaderTitleModel {
  logo?: string;
  logoWidth?: string;
  logoHeight?: string;
  text?: string;
  textColor?: string;
  path?: string;
}

@customElement('header-title')
export class HeaderTitle extends LitElement {
  
  @property({ type: Object }) model?: HeaderTitleModel;

  @property({ type: String }) logo?: string;
  @property({ type: String }) logoWidth?: string;
  @property({ type: String }) logoHeight?: string;
  @property({ type: String }) text?: string;
  @property({ type: String }) textColor?: string;
  @property({ type: String }) path?: string;

  protected async updated(changedProperties: any) {
    super.updated(changedProperties);
    await this.updateComplete;
    
    if (changedProperties.has('model') && this.model) {
      Object.assign(this, this.model);
    }
    if (changedProperties.has('logoWidth') && this.logoWidth) {
      this.style.setProperty('--logo-width', this.logoWidth);
    }
    if (changedProperties.has('logoHeight') && this.logoHeight) {
      this.style.setProperty('--logo-height', this.logoHeight);
    }
    if (changedProperties.has('textColor') && this.textColor) {
      this.style.setProperty('--text-color', this.textColor);
    }
  }

  render() {
    return html`
      <u-link .href=${this.path || App.router?.basepath}>
        <img class="logo" 
          src=${this.logo || '/favicon.ico'} 
          alt="app-logo" 
        />
        <div class="text">
          ${this.text}
        </div>
      </u-link>
    `;
  }

  static styles = css`
    :host {
      padding: 0px 10px;
      display: inline-flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;

      --logo-width: 28px;
      --logo-height: 28px;
      --text-color: #cb2e63;
    }

    .logo {
      width: var(--logo-width);
      height: var(--logo-height);
      margin-right: 8px;
    }

    .text {
      color: var(--text-color);
      font-weight: 600;
      font-size: calc(var(--logo-height) / 1.5);
      line-height: var(--logo-height);
      white-space: nowrap;
    }
  `;

}