import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement('overview-test')
export class OverviewPage extends LitElement {
  render() {
    return html`
      <u-page>
        <div>hello!</div>
      </u-page>
    `;
  }
}