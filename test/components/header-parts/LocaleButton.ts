import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

export interface LocaleModel {
  
}

@customElement('locale-button')
export class LocaleButton extends LitElement {
  
  @property({ type: Object }) model?: LocaleModel;

  @property({ type: String }) locale: string = '한국어';

  render() {
    return html`
      <u-dropdown placement="bottom-end">
        <div class="locale" slot="trigger">
          <u-icon type="system" name="translate"></u-icon>
          ${this.locale}
          <u-icon type="system" name="chevron-down"></u-icon>
        </div>
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

    .locale {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      gap: 10px;
      padding: 5px;
      box-sizing: border-box;
      font-size: 16px;
      color: var(--sl-color-gray-600);
      cursor: pointer;
    }
    .locale:hover {
      color: var(--sl-color-primary-600);
    }

    u-menu {
      padding: 0;
      width: 120px;
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