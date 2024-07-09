import { LitElement, css, html } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { type Languages, getLocale, setLocale } from "@iyulab/u-components/localization";

type LocaleDisplay = {
  [langqq in Languages]: string;
}

@customElement('locale-button')
export class LocaleButton extends LitElement {
  private readonly displayMap: LocaleDisplay = {
    'ko': '한국어',
    'en': 'English',
  };

  @query('u-dropdown') dropdown!: any;

  @property({ type: String }) display: string = this.displayMap.en;

  connectedCallback() {
    super.connectedCallback();
    const locale = localStorage.getItem('locale') || getLocale();
    this.display = this.displayMap[locale as Languages] || this.displayMap.en;
  }

  render() {
    return html`
      <u-dropdown placement="bottom-end">
        <div class="locale" slot="trigger">
          <u-icon type="system" name="translate"></u-icon>
          ${this.display}
          <u-icon type="system" name="chevron-down"></u-icon>
        </div>
        <u-menu>
          ${Object.keys(this.displayMap).map((lang) => html`
            <u-menu-item @click=${() => this.changeLocale(lang as Languages)}>
              ${this.displayMap[lang as Languages]}
            </u-menu-item>
          `)}
        </u-menu>
      </u-dropdown>
    `;
  }

  private changeLocale = async (locale: Languages) => {
    await setLocale(locale);
    localStorage.setItem('locale', locale);
    this.display = this.displayMap[locale] || this.displayMap.en;
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