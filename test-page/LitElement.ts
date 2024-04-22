import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { LitChannel } from "../test/router/Channel";

@customElement('u-lit')
export class Lit extends LitChannel {
  render() {
    console.log(this.routeInfo);
    return html`
      <u-page>
        <div>hello!</div>
      </u-page>
    `;
  }
}