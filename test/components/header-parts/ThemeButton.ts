import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement('theme-button')
export class ThemeButton extends LitElement {
  
  @property({ type: String }) theme?: string;

  render() {
    return html`
      <u-dropdown>
        <u-icon-button
          slot="trigger"
          type="system"
          name="moon"
          size="24px"
          tooltip="언어설정"
        ></u-icon-button>
        <u-menu>
          <u-menu-item>라이트 모드</u-menu-item>
          <u-menu-item>다크 모드</u-menu-item>
          <u-menu-item>사용자 시스템</u-menu-item>
        </u-menu>
      </u-dropdown>
    `;
  }

  static styles = css`
    
  `;

}