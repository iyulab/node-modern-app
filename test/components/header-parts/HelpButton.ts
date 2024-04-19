import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

export interface HelpModel {
  href: string;
  target?: "_blank" | "_self" | "_parent" | "_top";
}

@customElement('help-button')
export class HelpButton extends LitElement {
  
  @property({ type: Object }) model?: HelpModel;

  @property({ type: String }) href?: string;
  @property({ type: String }) target?: "_blank" | "_self" | "_parent" | "_top";

  protected async updated(changedProperties: any) {
    super.updated(changedProperties);
    await this.updateComplete;

    if (changedProperties.has('model') && this.model) {
      Object.assign(this, this.model);
    }
  }

  render() {
    return html`
      <u-icon-button
        type="system" name="question-circle"
        size="24px" tooltip="도움말"
        .href=${this.href} .target=${this.target || "_blank"}
      ></u-icon-button>
    `;
  }

  static styles = css`
    :host {
      display: inline-flex;
    }
  `;

}