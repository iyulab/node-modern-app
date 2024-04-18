import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { convertReact } from "@iyulab/u-components/utils";

@customElement('u-page')
export class UPage extends LitElement {

  @property({ type: Boolean, reflect: true }) showElevator: boolean = false;
  @property({ type: String }) headline?: string;

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('scroll', this.handleScroll);
  }

  disconnectedCallback() {
    this.removeEventListener('scroll', this.handleScroll);
    super.disconnectedCallback();
  }

  render() {
    return html`
      <!-- page title -->
      ${this.renderTitle()}

      <!-- main -->
      <slot></slot>

      <!-- elevator button -->
      <div class="elevator">
        <u-icon
          type="system"
          name="arrow-up"
        ></u-icon>
      </div>
    `;
  }

  private renderTitle() {
    if (!this.headline) return;
    return html`
      <div class="title">
        ${this.headline}
      </div>
    `;
  }

  private handleScroll = () => {
    if (this.scrollTop <= 20) {
      this.showElevator = false;
    } else {
      this.showElevator = true;
    }
  }

  static styles = css`
    :host {
      position: relative;
      width: 100%;
      height: 100%;
      display: block;
      overflow: auto;
    }
    :host([showElevator]) .elevator {
      display: block;
    }

    .title {
      padding: 20px;
      font-size: 24px;
      font-weight: bold;
      border-bottom: 1px solid #ccc;
    }

    .elevator {
      position: fixed;
      right: 20px;
      bottom: 20px;
      display: none;
    }
  `;
}

export const Page = convertReact({
  elementClass: UPage,
  tagName: 'u-page',
});