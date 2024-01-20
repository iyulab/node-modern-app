import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("u-buttons")
export class UButtons extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
        margin-top: 1rem;
      }
      .button-container {
        display: flex;
        gap: 4px;
      }
      .justify-end {
        justify-content: flex-end;
      }
      .justify-start {
        justify-content: flex-start;
      }
    `,
  ];

  @property({ type: Boolean })
  right: boolean = false;

  render() {
    const alignmentClass = this.right ? "justify-end" : "justify-start";
    return html`
      <div class="button-container ${alignmentClass}">
        <slot></slot>
      </div>
    `;
  }
}
