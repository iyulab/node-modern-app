import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

export interface LocaleModel {
  
}

@customElement('locale-button')
export class LocaleButton extends LitElement {
  
  @property({ type: Object }) model?: LocaleModel;

  render() {
    return html`
      <u-dropdown distance="10" placement="bottom-end">
        <u-icon-button slot="trigger"
          type="system" name="global"
          size="24px" tooltip="언어 설정"
        ></u-icon-button>
        <u-menu>
          <u-menu-item>
            한국어
          </u-menu-item>
          <u-menu-item>
            English
          </u-menu-item>
        </u-menu>
      </u-dropdown>
    `;
  }

  static styles = css`
    :host {
      display: inline-flex;
    }

    u-dropdown {
      height: 24px;
    }

    u-menu {
      padding: 0;
    }
    u-menu-item::part(submenu-icon) {
      display: none;
    }
    u-menu-item::part(checked-icon) {
      display: none;
    }
    u-menu-item::part(label) {
      margin-left: 20px;
      font-size: 14px;
      line-height: 1.5;
      text-align: end;
    }
  `;

}