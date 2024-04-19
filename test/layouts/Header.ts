import { LitElement, css, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { convertReact } from '@iyulab/u-components/utils';

import type { 
  AppScreen,
} from '../App';
import type {
  BreadcrumbModel,
  HeaderTitleModel,
  LocaleModel,
  UserModel,
  HelpModel
} from '../components/header-parts';
import type {
  HeaderOption
} from './Header.model';

@customElement('u-header')
export class UHeader extends LitElement {

  @property({ type: String, reflect: true }) screen?: AppScreen;

  @property({ type: Object }) headline?: HeaderTitleModel;
  @property({ type: Object }) breadcrumbs?: BreadcrumbModel;
  @property({ type: Object }) help?: HelpModel;
  @property({ type: Object }) locale?: LocaleModel;
  @property({ type: Object }) user?: UserModel;
  @property({ type: Object }) option?: HeaderOption;

  protected async updated(changedProperties: any) {
    super.updated(changedProperties);
    await this.updateComplete;
  }

  render() {
    if (this.option?.noHeader) return nothing;
    
    return html`
      <div class="headline">
        ${this.renderToggler()}
        ${this.renderTitle()}
      </div>
      <div class="breadcrumb">
        ${this.renderBreadcrumbs()}
      </div>
      <div class="flex">
        <slot name="extra"></slot>
      </div>
      <div class="action">
        ${this.renderHelp()}
        ${this.renderLocale()}
        ${this.renderTheme()}
        ${this.renderUser()}
      </div>
      <slot name="progress"></slot>
    `;
  }

  private renderToggler() {
    if (this.option?.noMenuToggle) return nothing;
    return html`<menu-toggler></menu-toggler>`;
  }

  private renderTitle() {
    if (this.option?.noTitle) return nothing;
    return html`<header-title .model=${this.headline}></header-title>`;
  }

  private renderBreadcrumbs() {
    if (this.option?.noBreadcrumbs) return nothing;
    return html`<header-breadcrumb .model=${this.breadcrumbs}></header-breadcrumb>`;
  }

  private renderHelp() {
    if (this.option?.noHelp || !this.help) return nothing;
    return html`<help-button .model=${this.help}></help-button>`;
  }

  private renderLocale() {
    if (this.option?.noLocale) return nothing;
    return html`<locale-button .model=${this.locale}></locale-button>`;
  }

  private renderTheme() {
    if (this.option?.noTheme) return nothing;
    return html`<theme-button></theme-button>`;
  }

  private renderUser() {
    if (this.option?.noUser) return nothing;
    return html`<user-button .model=${this.user}></user-button>`;
  }

  static styles = css`
    :host {
      position: relative;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      padding: 8px;
      box-sizing: border-box;
      user-select: none;
    }

    .headline {
      width: 260px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
    }

    .breadcrumb {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
    }

    .flex {
      flex: 1;
    }

    .action {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 15px;
    }
  `;
}

export const Header = convertReact({
  elementClass: UHeader,
  tagName: 'u-header',
});