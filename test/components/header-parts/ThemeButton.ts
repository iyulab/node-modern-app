import { LitElement, css, html } from "lit";
import { customElement, property, query } from "lit/decorators.js";

export type AppTheme = 'light' | 'dark' | 'system';

@customElement('theme-button')
export class ThemeButton extends LitElement {
  private readonly media = window.matchMedia('(prefers-color-scheme: dark)');
  
  @query('u-dropdown') dropdown: any;

  @property({ type: String, reflect: true }) theme: AppTheme = 'system';
  @property({ type: String }) icon: 'moon' | 'sun' = 'sun';  

  connectedCallback() {
    super.connectedCallback();
    this.theme = localStorage.getItem('theme') as AppTheme || this.theme;
    this.changeTheme(this.theme);
    this.media.addEventListener('change', this.onChangeColorScheme);
  }
  
  disconnectedCallback() {
    this.media.removeEventListener('change', this.onChangeColorScheme);
    super.disconnectedCallback();
  }

  protected async updated(changedProperties: any) {
    super.updated(changedProperties);
    await this.updateComplete;

    if (changedProperties.has('theme') && this.theme) {
      this.changeTheme(this.theme);
      localStorage.setItem('theme', this.theme);
    }
  }

  render() {
    return html`
      <u-dropdown distance="10" placement="bottom-end">
        <u-icon-button slot="trigger" 
          type="system" name=${this.icon}
        ></u-icon-button>
        <u-menu>
          <u-menu-item class="light"
            @click=${() => this.theme = 'light'}>
            <u-icon slot="prefix" type="system" name="sun"></u-icon>
            밝은 테마
          </u-menu-item>
          <u-menu-item class="dark"
            @click=${() => this.theme = 'dark'}>
            <u-icon slot="prefix" type="system" name="moon"></u-icon>
            어두운 테마
          </u-menu-item>
          <u-divider spacing="0px"></u-divider>
          <u-menu-item class="system"
            @click=${() => this.theme = 'system'}>
            <u-icon slot="prefix" type="system" name="gear"></u-icon>
            시스템 테마
          </u-menu-item>
        </u-menu>
      </u-dropdown>
    `;
  }

  private changeTheme(theme: AppTheme) {
    // 운영체제 테마 설정
    if (theme === 'system') {
      theme = this.media.matches ? 'dark' : 'light';
    }
    document.documentElement.classList.toggle("sl-theme-dark", theme === 'dark');
    this.icon = theme === 'light' ? 'sun' : 'moon';
    this.dropdown?.hide();
  }

  private onChangeColorScheme = (e: MediaQueryListEvent) => {
    const theme = e.matches ? 'dark' : 'light';
    this.changeTheme(theme);
  }

  static styles = css`
    :host {
      display: inline-flex;
    }
    :host([theme="light"]) .light {
      background-color: var(--sl-color-sky-600);
      &::part(label),
      &::part(prefix) {
        color: var(--sl-color-neutral-0);
      }
    }
    :host([theme="dark"]) .dark {
      background-color: var(--sl-color-sky-600);
      &::part(label),
      &::part(prefix) {
        color: var(--sl-color-neutral-0);
      }
    }
    :host([theme="system"]) .system {
      background-color: var(--sl-color-sky-600);
      &::part(label),
      &::part(prefix) {
        color: var(--sl-color-neutral-0);
      }
    }

    u-dropdown {
      height: 24px;
    }

    u-icon-button {
      font-size: 24px;
    }

    u-menu {
      padding: 0;
    }
    u-menu-item::part(checked-icon) {
      display: none;
    }
    u-menu-item::part(submenu-icon) {
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