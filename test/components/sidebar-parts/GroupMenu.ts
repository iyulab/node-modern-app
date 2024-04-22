import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { GroupMenuItemModel } from "./GroupMenuItem";

export interface GroupMenuModel {
  type: 'group';
  icon?: string;
  display: string;
  items: GroupMenuItemModel[];
}

@customElement('group-menu')
export class GroupMenu extends LitElement {
  
  @property({ type: Boolean, reflect: true }) collapsed: boolean = false;
  @property({ type: Boolean, reflect: true }) active?: boolean;
  @property({ type: Boolean, reflect: true }) open: boolean = false;

  @property({ type: String }) icon?: string;
  @property({ type: String }) display?: string;

  protected async updated(changedProperties: any) {
    super.updated(changedProperties);
    await this.updateComplete;
    
    if (changedProperties.has('active') && this.active) {
      this.open = true;
    }
  }

  render() {
    const content = this.renderContent();

    if (this.collapsed)
      return this.renderDropdownWith(content);
    else
      return content;
  }

  private renderDropdownWith(content: any) {
    return html`
      <u-dropdown hoist placement="right-end">
        ${content}
      </u-dropdown>
    `;
  }

  private renderContent() {
    return html`
      <div class="header" slot="trigger"
        @click=${this.handleOpenGroup}>
        <div class="icon">
          ${this.renderIcon()}
        </div>
        <div class="display">
          ${this.display}
        </div>
        <u-icon class="arrow"
          type="system" 
          name="arrow-down"
        ></u-icon>
      </div>
      <div class="menu">
        <slot></slot>
      </div>
    `;
  }

  private renderIcon() {
    return this.icon 
    ? html`<u-icon name=${this.icon}></u-icon>` 
    : html`<u-icon type="system" name="box"></u-icon>`;
  }

  private handleOpenGroup() {
    if (this.collapsed) return;
    this.open = !this.open;
  }

  private renderMenuItem() {
    if (this.collapsed)
      return html``;
  }

  static styles = css`
    :host {
      position: relative;
      display: block;
      width: 100%;
    }
    :host([collapsed]) .header .display {
      display: none;
    }
    :host([collapsed]) .header .arrow {
      position: absolute;
      right: 0;
      width: auto;
      height: auto;
      transform: rotate(-90deg);
    }
    :host([active]) .header .display {
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
      height: auto;
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
      height: 0px;
      overflow: hidden;
      transition: height 0.3s ease-in-out;
    }
  `;

}