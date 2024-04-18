import { customElement } from "lit/decorators.js";
import { LitPage } from "./layouts/Page";
import { html } from "lit";

@customElement('u-lit')
export class Lit extends LitPage {
  render() {
    console.log(this.routeInfo);
    return html`
      <div>hello!</div>
    `;
  }
}