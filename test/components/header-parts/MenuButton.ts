import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement('menu-button')
export class MenuButton extends LitElement {

  render() {
    return html`
      <u-icon 
        type="system" 
        name="menu"
        size="24px"
      ></u-icon>
    `;
  }

  static styles = css`
    :host {
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      padding: 5px;
      cursor: pointer;
    }
    :host(:hover) {
      background-color: var(--sl-color-gray-200);
    }
    :host(:hover) u-icon {
      color: var(--sl-color-primary-600);
    }

  `;

}