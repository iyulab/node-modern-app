import { LitElement, css, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { convertReact } from '@iyulab/u-components/utils';

import { type AppScreen } from '../App';
import type { SidebarOption, MenuItem } from './Sidebar.model';
import { RouteInfo } from '../router/Route';
import { GroupMenuItemModel, SingleMenuModel } from '../components/sidebar-parts';

@customElement('u-sidebar')
export class USidebar extends LitElement {
  private urlPatterns: Map<string, URLPattern> = new Map();
  
  @state() topMenu?: MenuItem[];
  @state() bottomMenu?: MenuItem[];
  @state() activePath?: string;

  @property({ type: String, reflect: true }) screen?: AppScreen;
  @property({ type: Boolean, reflect: true }) open: boolean = true;
  @property({ type: Boolean }) collapsed: boolean = false;

  @property({ type: String }) basepath?: string;
  @property({ type: Array }) menuItem?: MenuItem[];
  @property({ type: Object }) option?: SidebarOption;  

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('route-change', this.handleRouteChange);
    console.log('u-sidebar connected');
  }

  disconnectedCallback() {
    document.removeEventListener('route-change', this.handleRouteChange);
    super.disconnectedCallback(); 
  }

  protected async updated(changedProperties: any) {
    super.updated(changedProperties);
    await this.updateComplete;

    if (changedProperties.has('menuItem') && this.menuItem) {
      this.topMenu = this.menuItem?.filter((item) => item.position === 'top' || !item.position);
      this.bottomMenu = this.menuItem?.filter((item) => item.position === 'bottom');
      this.initializeUrlPatterns(this.menuItem);
    }
    if (changedProperties.has('open')) {
      this.collapsed = !this.open && this.screen !== 'small';
    }
  }

  render() {
    if (this.option?.noSidebar) return nothing;

    return html`
      <slot name="header"></slot>
      <div class="menu">
        <u-icon class="up-elevator" 
          type="system" name="arrow-down"
        ></u-icon>
        ${this.renderMenuItems(this.topMenu)}
        <div class="flex"></div>
        ${this.renderMenuItems(this.bottomMenu)}
        <u-icon class="down-elevator" 
          type="system" name="arrow-down"
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
          .text=${item.text}
          .line=${item.line}
          .height=${item.height}
        ></menu-divider>`;
    } else if(!item.type || item.type === 'single') {
      return html`
        <single-menu
          ?active=${this.activePath === item.path}
          .collapsed=${this.collapsed}
          .icon=${item.icon}
          .display=${item.display}
          .path=${item.path}
        ></single-menu>`;
    } else if(item.type === 'group') {
      const isActived = item.items.some(subItem => this.activePath === subItem.path);
      return html`
        <group-menu 
          ?active=${isActived}
          .collapsed=${this.collapsed}
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

  private handleRouteChange = (event: Event) => {
    console.log('route-change event', event);
    const routeInfo = (event as CustomEvent).detail as RouteInfo;
    const pathname = routeInfo.pathname;
    this.urlPatterns.forEach((pattern, path) => {
      if (pattern.test({ pathname: pathname })) {
        this.activePath = path;
      }
    });
  }

  private initializeUrlPatterns(items: MenuItem[]): void {
    items.forEach(item => {
      if (item.type === 'divider') return;
      if (item.type === 'single' || !item.type) {
        this.setupPattern(item);
      }
      if (item.type === 'group') {
        item.items.forEach(subItem => this.setupPattern(subItem));
      }
    });
  }

  private setupPattern(item: SingleMenuModel | GroupMenuItemModel): void {
    if (!item.pattern) {
      item.path = this.basepath + '/' + item.path.replace(/^\/|\/$/g, '');
      item.pattern = new URLPattern({ pathname: item.path });
      this.urlPatterns.set(item.path, item.pattern);
    }
  }

  static styles = css`
    :host {
      position: relative;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      overflow: hidden;
      box-sizing: border-box;
      user-select: none;
    }

    .menu {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      position: relative;
      flex: 1;
      overflow-x: hidden;
      overflow-y: auto;

      u-icon {
        cursor: pointer;
      }

      .flex {
        flex: 1;
      }
    }

  `;
}

export const Sidebar = convertReact({
  elementClass: USidebar,
  tagName: 'u-sidebar',
});