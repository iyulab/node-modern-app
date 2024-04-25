import { LitElement, css, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import type { AppScreen } from '../App';
import type {
  AppTheme,
  BreadcrumbModel,
  HeaderTitleModel,
  HelpModel,
  LocaleModel,
  UserModel
} from '../components/header-parts';

export interface HeaderOption {
  noHeader?: boolean;
  noMenuToggle?: boolean;
  noTitle?: boolean;
  noBreadcrumbs?: boolean;
  noHelp?: boolean;
  noLocale?: boolean;
  noTheme?: boolean;
  noUser?: boolean;
}

export interface HeaderAction {
  help?: HelpModel;
  locale?: LocaleModel;
  theme?: AppTheme;
  user?: UserModel;
}

export interface HeaderModel {
  title?: HeaderTitleModel;
  breadcrumbs?: BreadcrumbModel;
  center?: typeof LitElement | string;
  action?: HeaderAction;
  option?: HeaderOption;
  backgroundColor?: string;
}

@customElement('u-header')
export class UHeader extends LitElement {

  @property({ type: String, reflect: true }) screen?: AppScreen;

  @property({ type: String }) basepath?: string;
  @property({ type: Object }) headline?: HeaderTitleModel;
  @property({ type: Object }) breadcrumbs?: BreadcrumbModel;
  @property({ type: Object }) action?: HeaderAction;
  @property({ type: Object }) option?: HeaderOption;
  @property({ type: String }) backgroundColor?: string;

  protected async updated(changedProperties: any) {
    super.updated(changedProperties);
    await this.updateComplete;

    if (changedProperties.has('backgroundColor') && this.backgroundColor) {
      this.style.backgroundColor = this.backgroundColor;
    }
  }

  render() {
    if (this.option?.noHeader) return nothing;
    
    return html`
      <!-- 헤더 타이틀 -->
      <div class="headline">
        ${this.renderPrefix()}
        ${this.renderTitle()}
      </div>
      
      <!-- 헤더 경로 표시줄 -->
      <div class="breadcrumb">
        ${this.renderBreadcrumbs()}
      </div>
      
      <!-- 사용자 지정 엘리먼트 -->
      <div class="flex">
        <slot name="center"></slot>
      </div>

      <!-- 헤더 버튼 엘리먼트 -->
      <div class="action">
        ${this.renderAction()}
      </div>
    `;
  }

  // ===== 렌더링 메서드 ===== //

  private renderPrefix() {
    if (this.option?.noMenuToggle) return nothing;
    return html`<slot name="prefix"></slot>`;
  }

  private renderTitle() {
    if (this.option?.noTitle) return nothing;
    return html`<header-title .model=${this.headline}></header-title>`;
  }

  private renderBreadcrumbs() {
    if (this.option?.noBreadcrumbs) return nothing;
    return html`<header-breadcrumb .model=${this.breadcrumbs}></header-breadcrumb>`;
  }

  private renderAction() {
    return Object.entries(this.action || {}).map(([key, value]) => {
      if (key === 'help' && !this.option?.noHelp) {
        return html`<help-button .model=${value}></help-button>`;
      } else if (key === 'locale' && !this.option?.noLocale) {
        return html`<locale-button .model=${value}></locale-button>`;
      } else if (key === 'theme' && !this.option?.noTheme) {
        return html`<theme-button .theme=${value}></theme-button>`;
      } else if (key === 'user' && !this.option?.noUser) {
        return html`<user-button .model=${value}></user-button>`;
      } else {
        return nothing;
      }
    });
  }

  static styles = css`
    :host {
      position: relative;
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      box-sizing: border-box;
      background-color: var(--sl-color-neutral-0);
      border-bottom: 1px solid var(--sl-color-gray-200);
      user-select: none;
    }
    :host([screen="small"]) .breadcrumb {
      display: none;
    }
    :host([screen="large"]) .headline {
      width: 260px;
    }

    .headline {
      height: inherit;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      overflow: hidden;
      padding: 8px;
      box-sizing: border-box;
    }

    .breadcrumb {
      height: inherit;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      overflow: hidden;
    }

    .flex {
      flex: 1;
      height: inherit;
    }

    .action {
      height: inherit;
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 20px;
      padding: 8px;
      box-sizing: border-box;
    }
  `;
}
