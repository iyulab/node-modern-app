import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement('menu-button')
export class MenuButton extends LitElement {

  render() {
    return html`
      <u-icon 
        type="system" 
        name="menu"
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
      background-color: var(--sl-color-gray-100);
    }
    :host(:hover) u-icon {
      color: var(--sl-color-primary-600);
    }

    u-icon {
      font-size: 24px;
      color: var(--sl-color-gray-600);
    }

  `;

}