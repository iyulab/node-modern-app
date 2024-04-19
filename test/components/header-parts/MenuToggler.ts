import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement('menu-toggler')
export class MenuToggler extends LitElement {
  
  @property({ type: Boolean }) open?: boolean;

  render() {
    return html`
      <u-icon-button 
        type="system" 
        name="menu"
        tooltip="메뉴"
        size="24px"
      ></u-icon-button>
    `;
  }

  static styles = css`
    :host {
      display: inline-flex;
    }
  `;

}