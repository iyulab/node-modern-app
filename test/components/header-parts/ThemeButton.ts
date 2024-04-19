import { LitElement, css, html } from "lit";
import { customElement, property, query } from "lit/decorators.js";

import { App, type AppTheme } from "../../App";
import { autorun } from "mobx";

@customElement('theme-button')
export class ThemeButton extends LitElement {
  
  @query('u-dropdown') dropdown!: any;

  @property({ type: String, reflect: true }) theme?: AppTheme;
  @property({ type: String }) icon: 'moon' | 'sun' = 'sun';  

  protected async firstUpdated(changedProperties: any) {
    super.firstUpdated(changedProperties);
    await this.updateComplete;

    autorun(() => {
      this.theme = App.theme.get();
      this.icon = this.getIconName(this.theme);
    });
  }

  render() {
    return html`
      <u-dropdown distance="10" placement="bottom-end">
        <u-icon-button slot="trigger"
          type="system" name=${this.icon}
          size="24px" tooltip="테마 설정"
        ></u-icon-button>
        <u-menu>
          <u-menu-item class="light"
            @click=${() => this.changeTheme('light')}>
            밝은 테마
          </u-menu-item>
          <u-menu-item class="dark"
            @click=${() => this.changeTheme('dark')}>
            어두운 테마
          </u-menu-item>
          <u-divider spacing="0px"></u-divider>
          <u-menu-item class="system"
            @click=${() => this.changeTheme('system')}>
            시스템 테마
          </u-menu-item>
        </u-menu>
      </u-dropdown>
    `;
  }

  private getIconName(theme: AppTheme) {
    if (theme === 'system') {
      const media = window.matchMedia('(prefers-color-scheme: dark)');
      theme = media.matches ? 'dark' : 'light';
    }
    return theme === 'light' ? 'sun' : 'moon';
  }

  private changeTheme(theme: AppTheme) {
    App.changeTheme(theme);
    this.dropdown.hide();
  }

  static styles = css`
    :host {
      display: inline-flex;
    }
    :host([theme="light"]) .light {
      background-color: var(--sl-color-sky-600);
      &::part(label) {
        color: var(--sl-color-neutral-0);
      }
    }
    :host([theme="dark"]) .dark {
      background-color: var(--sl-color-sky-600);
      &::part(label) {
        color: var(--sl-color-neutral-0);
      }
    }
    :host([theme="system"]) .system {
      background-color: var(--sl-color-sky-600);
      &::part(label) {
        color: var(--sl-color-neutral-0);
      }
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