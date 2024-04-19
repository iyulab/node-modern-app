import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

export interface GroupMenuModel {
  icon?: string;
  display: string;
  path?: undefined;
  items: GroupMenuItem[];
}

export interface GroupMenuItem {
  display: string;
  path: string;
}

@customElement('group-menu')
export class GroupMenu extends LitElement {
  
  @property({ type: Boolean, reflect: true }) collapsed: boolean = false;
  @property({ type: Object }) model?: GroupMenuModel;

  @property({ type: String }) icon?: string;
  @property({ type: String }) display?: string;
  @property({ type: Array }) items?: GroupMenuItem[];

  protected async updated(changedProperties: any) {
    super.updated(changedProperties);
    await this.updateComplete;

    if (changedProperties.has('model') && this.model) {
      this.icon = this.model?.icon;
      this.display = this.model?.display;
      this.items = this.model?.items;
    }
  }

  render() {
    return html`
      <div class="header">
        ${this.renderIcon()}
        <div class="display">${this.display}</div>
        <u-icon type="system" name="arrow-down"></u-icon>
      </div>
      <div class="menu">
        ${this.renderMenuItems()}
      </div>
    `;
  }

  private renderIcon() {
    return this.icon 
    ? html`<u-icon name=${this.icon}></u-icon>` 
    : html`<u-icon type="system" name="box"></u-icon>`;
  }

  private renderMenuItems() {
    return this.items?.map((item) => {
      return html`
        <u-link .href=${item.path}>
          ${item.display}
        </u-link>
      `;
    });
  }


  static styles = css`
    :host {
      display: block;
      width: 100%;
    }

    .header {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;

      u-icon {
        font-size: 20px;
      }
      .display {
        flex: 1;
      }
    }
    .header:hover {
      background-color: #f0f0f0;
    }

    .menu {
      display: flex;
      flex-direction: column;
      
      u-link {
        margin-left: 20px;
        padding: 10px 0px;
      }
    }
  `;

}