import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

export interface SingleMenuModel {
  icon?: string;
  display: string;
  path: string;
  items?: undefined;
}

@customElement('single-menu')
export class SingleMenu extends LitElement {
  
  @property({ type: Boolean, reflect: true }) collapsed: boolean = false;
  @property({ type: Boolean, reflect: true }) active: boolean = false;
  @property({ type: Object }) model?: SingleMenuModel;

  @property({ type: String }) icon?: string;
  @property({ type: String }) display?: string;
  @property({ type: String }) path?: string;

  protected async updated(changedProperties: any) {
    super.updated(changedProperties);
    await this.updateComplete;

    if (changedProperties.has('model') && this.model) {
      this.icon = this.model?.icon;
      this.display = this.model?.display;
      this.path = this.model?.path;
    }
  }

  render() {
    return html`
      <u-link .href=${this.path}>
        ${this.renderIcon()}
        ${this.renderDisplay()}
      </u-link>
    `;
  }

  private renderIcon() {
    return this.icon 
    ? html`<u-icon name=${this.icon}></u-icon>` 
    : html`<u-icon type="system" name="box"></u-icon>`;
  }

  private renderDisplay() {
    return html`<div class="display">${this.display}</div>`;
  }

  static styles = css`
    :host {
      display: block;
      width: 100%;
      height: 40px;
    }
    :host([collapsed]) .display {
      width: 0px;
    }
    :host([active])::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 4px;
      height: 100%;
      background-color: var(--sl-color-primary-500);
    }

    u-link {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      box-sizing: border-box;

      u-icon {
        font-size: 24px;
      }

      .display {
        margin-left: 10px;
        font-size: 24px;
        font-weight: 500;
        line-height: 1.5;
      }
    }
    u-link:hover {
      background-color: var(--sl-color-gray-500);
    }

  `;

}