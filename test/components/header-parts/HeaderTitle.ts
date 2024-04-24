import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { App } from "../../App";

export interface HeaderTitleModel {  
  logo?: string;
  text?: string;
  textColor?: string;
  path?: string;
}

@customElement('header-title')
export class HeaderTitle extends LitElement {
  
  @property({ type: Object }) model?: HeaderTitleModel;

  @property({ type: String }) logo?: string;
  @property({ type: String }) text?: string;
  @property({ type: String }) textColor?: string;
  @property({ type: String }) path?: string;

  protected async updated(changedProperties: any) {
    super.updated(changedProperties);
    await this.updateComplete;
    
    if (changedProperties.has('model') && this.model) {
      Object.assign(this, this.model);
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
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      max-width: 210px;
      overflow: hidden;

      --text-color: #cb2e63;
    }

    .logo {
      margin: 0px 8px;
      height: 28px;
    }

    .text {
      font-weight: 600;
      font-size: 20px;
      line-height: 28px;
      color: var(--text-color);
      white-space: nowrap;
    }
  `;

}