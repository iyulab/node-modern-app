import { LitElement, css, html, nothing } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { convertReact } from '@iyulab/u-components/utils';

import { type AppScreen } from '../App';
import type { SidebarOption, MenuItem } from './Sidebar.model';
import { RouteInfo } from '../router/Model';
import { GroupMenuItemModel, SingleMenuModel } from '../components/sidebar-parts';
import { combinePath } from '../router/Utils';

@customElement('u-sidebar')
export class USidebar extends LitElement {

  @query('.menu') menuEl!: HTMLElement;
  @query('.elevator.up') elevatorUp!: HTMLElement;
  @query('.elevator.down') elevatorDown!: HTMLElement;

  @state() topMenu?: MenuItem[];
  @state() bottomMenu?: MenuItem[];
  @state() activePath?: string;

  @property({ type: String }) screen?: AppScreen;
  @property({ type: Boolean }) open: boolean = true;
  @property({ type: Boolean }) collapsed: boolean = false;

  @property({ type: String }) basepath?: string;
  @property({ type: Array }) menu?: MenuItem[];
  @property({ type: Object }) option?: SidebarOption;  
  @property({ type: String }) backgroundColor?: string;

  connectedCallback() {
    super.connectedCallback();
    if (this.menu) this.setMenu(this.menu);
    document.addEventListener('route-change', this.handleRouteChange);
  }

  disconnectedCallback() {
    document.removeEventListener('route-change', this.handleRouteChange);
    super.disconnectedCallback(); 
  }

  protected async updated(changedProperties: any) {
    super.updated(changedProperties);
    await this.updateComplete;

    if (changedProperties.has('backgroundColor') && this.backgroundColor) {
      this.style.backgroundColor = this.backgroundColor;
    }
    if (changedProperties.has('menu') && this.menu) {
      this.setMenu(this.menu);
    }
    if (changedProperties.has('open')) {
      this.collapsed = !this.open && this.screen !== 'small';
    }
  }

  render() {
    if (this.option?.noSidebar) return nothing;

    return html`
      <slot name="header"></slot>
      <div class="menu" @scroll=${this.handleScrollMenu}>
        <u-icon class="elevator up" 
          type="system" name="chevron-up"
          @click=${this.handleScrollTop}
        ></u-icon>
        ${this.renderMenuItems(this.topMenu)}
        <div class="flex"></div>
        ${this.renderMenuItems(this.bottomMenu)}
        <u-icon class="elevator down" 
          type="system" name="arrow-down"
          @click=${this.handleScrollBottom}
        ></u-icon>
      </div>
      <slot name="footer"></slot>
    `;
  }

  private renderMenuItems(menuItems?: MenuItem[]) {
    return menuItems?.map(item => this.renderMenuItem(item));
  }

  private renderMenuItem(item: MenuItem) {
    if(item.type === 'divider') {
      return html`
        <menu-divider
          ?collapsed=${this.collapsed}
          .text=${item.text}
          .line=${item.line}
          .height=${item.height}
        ></menu-divider>`;
    } else if(item.path) {
      return html`
        <single-menu
          ?active=${this.activePath === item.path}
          ?collapsed=${this.collapsed}
          .icon=${item.icon}
          .display=${item.display}
          .path=${item.path}
        ></single-menu>`;
    } else if(item.items) {
      const isActived = item.items.some(subItem => this.activePath === subItem.path);
      return html`
        <group-menu 
          ?active=${isActived}
          ?collapsed=${this.collapsed}
          .icon=${item.icon}
          .display=${item.display}>
          ${item.items.map((subItem) => {
            return html`
              <group-menu-item
                ?active=${this.activePath === subItem.path}
                .display=${subItem.display}
                .path=${subItem.path}
              ></group-menu-item>`
          })}
        </group-menu>`;
    } else {
      return nothing;
    }
  }

  private handleScrollMenu = (event: Event) => {
    const target = event.target as HTMLElement;
    if (target.scrollHeight - target.scrollTop === target.clientHeight) {
      this.elevatorDown.classList.remove('show');
    } else {
      this.elevatorDown.classList.add('show');
    }
    if (target.scrollTop > 20) {
      this.elevatorUp.classList.add('show');
    } else {
      this.elevatorUp.classList.remove('show');
    }
  }

  private handleScrollTop = () => {
    this.menuEl.scrollTo({ top: 0, behavior: 'smooth' });
  }

  private handleScrollBottom = () => {
    this.menuEl.scrollTo({ top: this.menuEl.scrollHeight, behavior: 'smooth' });
  }

  private handleRouteChange = (event: Event) => {
    const routeInfo = (event as CustomEvent).detail as RouteInfo;
    const pathname = routeInfo.pathname;
    this.menu?.forEach((item) => {
      if (item.type === 'divider') return;
      if (item.path) this.checkPattern(item, pathname);
      if (item.items) item.items.forEach(subItem => this.checkPattern(subItem, pathname));
    });
  }

  private setMenu(items: MenuItem[]): void {
    items.forEach(item => {
      if (item.type === 'divider') return;
      if (item.path) this.setPattern(item);
      if (item.items) item.items.forEach(subItem => this.setPattern(subItem));
    });
    this.topMenu = items.filter((item) => item.position === 'top' || !item.position);
    this.bottomMenu = items.filter((item) => item.position === 'bottom');
  }

  private setPattern(item: SingleMenuModel | GroupMenuItemModel) {
    const pathname = item.path.startsWith('/') ? item.path : combinePath(this.basepath || '', item.path);
    item.pattern ||= new URLPattern({ pathname: pathname + '*' });
  }

  private checkPattern(item: SingleMenuModel | GroupMenuItemModel, pathname: string) {
    const isMatched = item.pattern?.test({ pathname: pathname });
    if (isMatched) this.activePath = item.path;
  }

  static styles = css`
    :host {
      position: relative;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      overflow: hidden;
      box-sizing: border-box;
      background-color: var(--sl-color-neutral-0);
      border-right: 1px solid var(--sl-color-gray-200);
      user-select: none;
    }

    .menu {
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      flex: 1;
      overflow-x: hidden;
      overflow-y: auto;

      .flex {
        flex: 1;
      }

      .elevator {
        position: absolute;
        z-index: 1;
        display: none;
        width: 100%;
        justify-content: center;
        cursor: pointer;
      }
      .elevator:hover {
        color: var(--sl-color-sky-600);
      }
      .elevator.show {
        display: flex;
      }
      .elevator.up {
        top: 0;
        box-shadow: inset 0px 5px 10px -5px rgba(0, 0, 0, 0.3);
      }
      .elevator.down {
        bottom: 0;
        box-shadow: inset 0 -5px 10px -5px rgba(0, 0, 0, 0.3);
      }
    }
    .menu::-webkit-scrollbar {
      width: 0px;
    }

  `;
}

export const Sidebar = convertReact({
  elementClass: USidebar,
  tagName: 'u-sidebar',
});