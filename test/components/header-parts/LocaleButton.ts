import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

export interface LocaleConfig {
  
}

@customElement('locale-button')
export class LocaleButton extends LitElement {
  
  @property({ type: Object }) locale?: LocaleConfig;

  render() {
    return html`
      <u-dropdown>
        <u-icon-button
          slot="trigger"
          type="system"
          name="global"
          size="24px"
          tooltip="언어설정"
        ></u-icon-button>
        <u-menu>
          <u-menu-item>한국어</u-menu-item>
          <u-menu-item>English</u-menu-item>
        </u-menu>
      </u-dropdown>
    `;
  }

  static styles = css`
    
  `;

}