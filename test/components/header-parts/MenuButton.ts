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
      cursor: pointer;
    }
  `;

}