import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

export interface SingleMenuModel {
  type?: 'menu';
  icon?: string;
  display: string;
  path: string;
  pattern?: URLPattern;

  items?: undefined;
}

@customElement('single-menu')
export class SingleMenu extends LitElement {
  
  @property({ type: Boolean, reflect: true }) collapsed: boolean = false;
  @property({ type: Boolean, reflect: true }) active: boolean = false;
  
  @property({ type: String }) icon?: string;
  @property({ type: String }) display?: string;
  @property({ type: String }) path?: string;

  render() {
    return html`
      <u-link .href=${this.path}>
        <div class="icon">
          ${this.renderIcon()}
        </div>
        <div class="display">
          ${this.display}
        </div>
      </u-link>
    `;
  }

  private renderIcon() {
    return this.icon
    ? html`<u-icon name=${this.icon}></u-icon>` 
    : html`<u-icon type="system" name="box"></u-icon>`;
  }

  static styles = css`
    :host {
      position: relative;
      display: block;
      width: 100%;
      height: 40px;
    }
    :host(:hover) {
      background-color: var(--sl-color-gray-100);
    }
    :host([collapsed]) .display {
      display: none;
    }
    :host([active]) {
      background-color: var(--sl-color-gray-200);
    }
    :host([active]) .display {
      font-weight: 600;
    }
    :host([active]) u-link::before {
      content: "";
      position: absolute;
      left: 0;
      top: 20%;
      width: 4px;
      height: 60%;
      background-color: var(--sl-color-sky-600);
    }

    u-link {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;

      .icon {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 50px;
        height: 50px;
      }

      .display {
        font-size: 14px;
        line-height: 1.5;
        font-weight: 400;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }

  `;

}