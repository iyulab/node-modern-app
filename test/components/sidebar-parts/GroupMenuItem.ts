import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

export interface GroupMenuItemModel {
  display: string;
  path: string;
  pattern?: URLPattern;
}

@customElement('group-menu-item')
export class GroupMenuItem extends LitElement {
  
  @property({ type: Boolean, reflect: true }) active?: boolean;
  @property({ type: String }) display?: string;
  @property({ type: String }) path?: string;

  render() {
    return html`
      <u-link .href=${this.path}>
        ${this.display}
      </u-link>
    `;
  }

  static styles = css`
    :host {
      position: relative;
      width: 100%;
      display: block;
      cursor: pointer;
    }
    :host(:hover) {
      background-color: var(--sl-color-gray-100);
    }
    :host([active])::before {
      content: "";
      position: absolute;
      z-index: 1;
      top: 20%;
      width: 4px;
      height: 60%;
      background-color: var(--sl-color-primary-500);
    }
    :host([active]) u-link {
      font-weight: 600;
    }
    
    u-link {
      width: 100%;
      padding-left: 50px;
      font-size: 14px;
      line-height: 40px;
    }
  `;

}