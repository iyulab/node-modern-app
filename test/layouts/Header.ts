import { LitElement, css, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { convertReact } from '@iyulab/u-components/utils';

import { 
  App,
  type AppScreen, 
  type AppTheme 
} from '../App';

import type { 
  Breadcrumb,
  LocaleConfig,
  UserConfig 
} from '../components/header-parts';
import type {
  HeaderTitle,
  HeaderOption
} from './Header.model';

@customElement('u-header')
export class UHeader extends LitElement {

  @property({ type: String }) screen?: AppScreen;
  @property({ type: Object }) headline?: HeaderTitle;
  @property({ type: Object }) breadcrumbs?: Breadcrumb;
  @property({ type: String }) help?: string;
  @property({ type: String }) theme?: AppTheme;
  @property({ type: Object }) locale?: LocaleConfig;
  @property({ type: Object }) user?: UserConfig;
  @property({ type: Object }) option?: HeaderOption;

  protected async updated(changedProperties: any) {
    super.updated(changedProperties);
    await this.updateComplete;
  }

  render() {
    if (this.option?.noHeader) return nothing;
    
    return html`
      ${this.renderToggler()}
      ${this.renderTitle()}
      ${this.renderBreadcrumbs()}
      <div class="flex">
        <slot name="extra"></slot>
      </div>
      ${this.renderHelp()}
      ${this.renderLocale()}
      ${this.renderTheme()}
      ${this.renderUser()}
    `;
  }

  private renderToggler() {
    if (this.option?.noMenuToggle) return nothing;

    return html`
      <u-icon-button 
        type="system" 
        name="menu"
        tooltip="메뉴"
        size="24px"
      ></u-icon-button>
    `;
  }

  private renderTitle() {
    if (this.option?.noTitle) return nothing;

    const iconSrc = this.headline?.logo || '/favicon.ico';
    const iconWidth = this.headline?.logoWidth || '32px';
    const iconHeight = this.headline?.logoHeight || '32px';
    const titleColor = this.headline?.textColor || 'black';
    const path = this.headline?.path || App.router?.basepath || '/';
    return html`
      <u-link href=${path}>
        <img class="logo" src=${iconSrc} alt="app-logo" 
          width=${iconWidth} height=${iconHeight} />
        <div class="title" style=${`color: ${titleColor}`}>
          ${this.headline?.text}
        </div>
      </u-link>
    `;
  }

  private renderBreadcrumbs() {
    if (this.option?.noBreadcrumbs) return nothing;
    return html`<header-breadcrumb></header-breadcrumb>`;
  }

  private renderHelp() {
    if (this.option?.noHelp || !this.help) return nothing;
    return html`
      <help-button
        .href=${this.help}
      ></help-button>
    `;
  }

  private renderLocale() {
    if (this.option?.noLocale) return nothing;

    return html`
      <locale-button
        .locale=${this.locale}
      ></locale-button>
    `;
  }

  private renderTheme() {
    if (this.option?.noTheme) return nothing;
    return html`<theme-button></theme-button>`;
  }

  private renderUser() {
    if (this.option?.noUser) return nothing;

    return html`
      <user-button
        .user=${this.user}
      ></user-button>
    `;
  }

  static styles = css`
    :host {
      position: relative;
      display: flex;
      flex-direction: row;
      gap: 10px;
      align-items: center;
      justify-content: space-between;
      padding: 8px;
      box-sizing: border-box;
    }

    .flex {
      flex: 1;
    }
  `;
}

export const Header = convertReact({
  elementClass: UHeader,
  tagName: 'u-header',
});