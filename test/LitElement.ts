import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement('u-lit')
export class Lit extends LitElement {
  render() {
    return html`
      <div>hello!</div>
    `;
  }
}