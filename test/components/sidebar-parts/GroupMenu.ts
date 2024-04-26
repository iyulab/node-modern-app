import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { DirectiveResult } from 'lit/async-directive.js';
import type { GroupMenuItemModel } from "./GroupMenuItem";

export interface GroupMenuModel {
  type?: 'menu';
  icon?: string;
  display: string | DirectiveResult;
  items: GroupMenuItemModel[];

  path?: undefined;
  pattern?: undefined;
}

@customElement('group-menu')
export class GroupMenu extends LitElement {
  
  @property({ type: Boolean, reflect: true }) collapsed: boolean = false;
  @property({ type: Boolean, reflect: true }) active: boolean = false;
  @property({ type: Boolean, reflect: true }) open: boolean = false;

  @property({ type: String }) icon?: string;
  @property({ type: String }) display?: string;

  protected async updated(changedProperties: any) {
    super.updated(changedProperties);
    await this.updateComplete;
    
    if (changedProperties.has('active') && this.active && !this.collapsed) {
      this.open = true;
    }
  }

  render() {
    if (this.collapsed) {
      return this.renderCollapsedMenu();
    } else {
      return this.renderExpandedMenu();
    }
  }

  private renderExpandedMenu() {
    return html`
      <div class="header" @click=${() => this.open = !this.open}>
        <div class="icon">
          ${this.renderIcon()}
        </div>
        <div class="display">
          ${this.display}
        </div>
        <u-icon class="arrow"
          type="system" 
          name="chevron-down"
        ></u-icon>
      </div>
      <div class="menu">
        <slot></slot>
      </div>
    `;
  }

  private renderCollapsedMenu() {
    return html`
      <u-dropdown hoist placement="right-start">
        <div class="header" slot="trigger">
          <div class="icon">
            ${this.renderIcon()}
          </div>
        </div>
        <div class="drop-menu">
          <div class="display">
            ${this.display}
          </div>
          <u-divider spacing="0"></u-divider>
          <slot></slot>
        </div>
      </u-dropdown>
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
    }
    :host([active]) .header .display {
      font-weight: 600;
    }
    :host([active]) .drop-menu .display {
      font-weight: 600;
    }
    :host([active])::before {
      content: '';
      position: absolute;
      z-index: 1;
      width: 4px;
      top: 10%;
      height: 80%;
      background-color: var(--sl-color-gray-400);
    }
    :host([open]) .menu {
      display: block;
    }
    :host([open]) .header .arrow {
      transform: rotate(-180deg);
    }

    .header {
      width: 100%;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-sizing: border-box;
      cursor: pointer;

      .icon {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 50px;
        height: 50px;
      }

      .display {
        flex: 1;
        font-size: 14px;
        line-height: 50px;
        font-weight: 400;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .arrow {
        width: 50px;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: transform 0.3s ease-in-out;
      }
    }
    .header:hover {
      background-color: var(--sl-color-gray-100);
    }

    .menu {
      width: 100%;
      display: none;
    }

    .drop-menu {
      max-width: 210px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      background-color: var(--sl-color-neutral-0);
      border-radius: 5px;
      border: 1px solid var(--sl-color-gray-200);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      box-sizing: border-box;

      .display {
        padding-left: 30px;
        font-size: 14px;
        line-height: 40px;
        font-weight: 400;
        box-sizing: border-box;
        white-space: nowrap;
      }
    }
    .drop-menu slot::slotted(*) {
      --padding-left: 30px;
    }
  `;

}