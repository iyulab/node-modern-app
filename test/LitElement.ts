import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { LitChannel } from "./router/Channel";

@customElement('u-lit')
export class Lit extends LitChannel {
  render() {
    console.log(this.routeInfo);
    return html`
      <div>hello!</div>
    `;
  }
}