import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { t } from "@iyulab/components/localization";

@customElement('help-button')
export class HelpButton extends LitElement {

  @property({ type: String }) href?: string;

  render() {
    return html`
      <u-tooltip .content=${t("help", { ns: 'app', defaultValue: "Help" })}>
        <u-link .href=${this.href}>
          <u-icon 
            type="system"
            name="question-circle"
          ></u-icon>  
        </u-link>
      </u-tooltip>
    `;
  }

  static styles = css`
    :host {
      display: inline-flex;
    }

    u-icon {
      font-size: 24px;
      color: var(--sl-color-gray-600);
    }
    u-icon:hover {
      color: var(--sl-color-primary-600);
    }

  `;

}