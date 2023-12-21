import { html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { autorun } from 'mobx';

import { inject } from '@iyulab/modern-app/core/DI';
import type { GroupMenu, SubMenu } from '@iyulab/modern-app/stores/MenuStore';
import { LocatorStore } from '@iyulab/modern-app/stores/LocatorStore';

import { FlyoutElement, Position } from './FlyoutElement';

@customElement('sub-nav-menu')
export class SubNavMenu extends FlyoutElement {
  keepHover: boolean = true;
  position: Position = Position.RightBottom;

  @inject(LocatorStore)
  locator!: LocatorStore;

  @state()
  key?: string;

  @property({ type: Object })
  item?: GroupMenu;

  connectedCallback(): void {
    super.connectedCallback();
    this.style.zIndex = "4";

    autorun(() => {
      this.key = this.locator.current?.key;
    });
  }

  render() {
    const selected = this.item?.subMenu.find((i) => i.key === this.key) ? true : false;

    return html`
      <div class="container">
        <div class="header ${selected ? "selected" : null}">
          ${this.item?.display}
        </div>
        <div class="body">
          ${this.item?.subMenu.map((menu) => html`
            <div key=${menu.key} class="menu ${menu.key === this.key ? "selected" : null}"
              @click=${() => this.handleChangeLocation(menu)}>
              ${menu.display}
            </div>
          `)}
        </div>
      </div>
    `;
  }

  private handleChangeLocation(menu: SubMenu) {
    let path = menu.path!;
    const hasParm = path.endsWith("/:id?");
    const url = hasParm ? path.replace("/:id?","") : path;

    if (menu.force) {
      window.location.href = url;
    } else {
      this.locator.go(url);  
    }
  }

  static styles = css`
    .container {
      position: relative;
      display: block;
      margin-left: 5px;
      background-color: var(--gray-light3);
      width: 180px;
      user-select: none;
      box-shadow: 0 6px 12px rgba(0,0,0,.12);
      padding: 5px;
    }

    .header {
      padding: 10px;
      color: var(--primary-text);
      font-weight: normal;
      font-size: 16px;
      line-height: 20px;
      overflow: hidden;
      text-align: left;
      text-overflow: ellipsis;
      white-space: nowrap;
      border-bottom: 1px solid var(--alpha-20);

      &.selected {
        font-weight: bold;
      }
    }

    .body {
      overflow: hidden;
      overflow-y: auto;
      min-height: 20px;

      &::-webkit-scrollbar {
        width: 16px;
      }

      &::-webkit-scrollbar-thumb {
        height: 56px;
        border-radius: 8px;
        border: 4px solid transparent;
        background-clip: content-box;
        background-color: hsl(0,0%,37%)
      }

      &::-webkit-scrollbar-thumb:hover {
        background-color: hsl(0,0%,67%)
      }
    }

    .menu {
      padding: 5px 5px 5px 25px;
      text-align: left;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-weight: normal;
      font-size: 14px;
      color: var(--primary-text);
      line-height: 30px;
      cursor: pointer;

      &:hover {
        background-color: var(--ui-subtle-hover);
      }

      &.selected {
        font-weight: bold;
        background-color: var(--ui-subtle-active);
      }
    }
  `;
}