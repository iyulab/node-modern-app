import { LitElement, css, html } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { type Languages, getLocale, setLocale } from "@iyulab/u-components/localization";

type LocaleDisplay = {
  [langqq in Languages]: string;
}

@customElement('locale-button')
export class LocaleButton extends LitElement {
  private readonly display: LocaleDisplay = {
    'ko': '한국어',
    'en': 'English',
  };

  @query('u-dropdown') dropdown!: any;

  @property({ type: String }) locale: string = this.display.en;

  connectedCallback() {
    super.connectedCallback();
    this.locale = this.display[getLocale()] || this.display.en;
  }

  render() {
    return html`
      <u-dropdown placement="bottom-end">
        <div class="locale" slot="trigger">
          <u-icon type="system" name="translate"></u-icon>
          ${this.locale}
          <u-icon type="system" name="chevron-down"></u-icon>
        </div>
        <u-menu>
          ${Object.keys(this.display).map((lang) => html`
            <u-menu-item @click=${() => this.changeLocale(lang as Languages)}>
              ${this.display[lang as Languages]}
            </u-menu-item>
          `)}
        </u-menu>
      </u-dropdown>
    `;
  }

  private changeLocale = async (locale: Languages) => {
    await setLocale(locale);
    this.locale = this.display[locale] || this.display.en;
    this.dropdown?.hide();
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
      width: 110px;
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