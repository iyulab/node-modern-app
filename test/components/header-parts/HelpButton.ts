import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement('help-button')
export class HelpButton extends LitElement {
  
  @property({ type: String }) href?: string;

  render() {
    return html`
      <u-icon-button
        type="system"
        name="question-circle"
        tooltip="도움말"
        size="24px"
        .href=${this.href}
      ></u-icon-button>
    `;
  }

  static styles = css`
    :host {
      display: inline-flex;
    }
  `;

}