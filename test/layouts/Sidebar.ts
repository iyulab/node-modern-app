import { LitElement, css, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { autorun } from 'mobx';
import { convertReact } from '@iyulab/u-components/utils';

import { App, type AppScreen } from '../App';
import type { SidebarOption, MenuItem } from './Sidebar.model';

@customElement('u-sidebar')
export class USidebar extends LitElement {
  
  @property({ type: String, reflect: true }) screen?: AppScreen;
  @property({ type: Boolean, reflect: true }) open: boolean = true;
  @property({ type: Array }) menuItem?: MenuItem[];
  @property({ type: Object }) option?: SidebarOption;

  protected async firstUpdated(changedProperties: any) {
    super.firstUpdated(changedProperties);
    await this.updateComplete;
    autorun(() => {
      this.open = App.openSidebar.get();
    });
  }

  render() {
    if (this.option?.noSidebar) return nothing;

    return html`
      <slot name="header"></slot>
      <div class="menu">
        <u-icon-button class="up-elevator" 
          type="system" name="arrow-up"
        ></u-icon-button>
        ${this.renderMenuItems()}
        <u-icon-button class="down-elevator" 
          type="system" name="arrow-down"
        ></u-icon-button>
      </div>
      <slot name="footer"></slot>
    `;
  }

  private renderMenuItems() {
    return this.menuItem?.map((item) => {
      if(item.type) {
        return html`<menu-divider .model=${item}></menu-divider>`;
      } else if(item.path) {
        return html`<single-menu .model=${item}></single-menu>`;
      } else if(item.items) {
        return html`<group-menu .model=${item}></group-menu>`;
      } else {
        return nothing;
      }
    });
  }

  static styles = css`
    :host {
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 50px;
      height: 100%;
      overflow: hidden;
      box-sizing: border-box;
      user-select: none;
    }
    :host([open]) {
      width: 260px;
    }

    .menu {
      position: relative;
      flex: 1;
      overflow-y: auto;

      u-icon-button {
        position: absolute;
        z-index: 1;
        left: 50%;
        cursor: pointer;
      }

      .up-elevator {
        top: 0;
      }

      .down-elevator {
        bottom: 0;
      }
    }

  `;
}

export const Sidebar = convertReact({
  elementClass: USidebar,
  tagName: 'u-sidebar',
});