import { LitElement, css, html, nothing } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';

import type { AppScreen } from '../system/App';
import type { RouteInfo } from '@iyulab/router';
import type { 
  MenuDividerModel, 
  SingleMenuModel, 
  GroupMenuModel, 
  GroupMenuItemModel
} from "../components/sidebar-parts";
import { combinePath } from '@iyulab/router';

export type MenuItem = ( SingleMenuModel | GroupMenuModel | MenuDividerModel ) & {
  position?: 'top' | 'bottom';
}

export interface SidebarOption {
  noSidebar?: boolean;
}

export interface SidebarModel {
  header?: typeof LitElement | string;
  footer?: typeof LitElement | string;
  menu?: MenuItem[];
  option?: SidebarOption;
  backgroundColor?: string;
}

@customElement('u-sidebar')
export class USidebar extends LitElement {

  @query('.menu') menuEl!: HTMLElement;
  @query('.elevator.up') elevatorUp!: HTMLElement;
  @query('.elevator.down') elevatorDown!: HTMLElement;

  @state() topMenu?: MenuItem[];
  @state() bottomMenu?: MenuItem[];
  @state() activePath?: string;

  @property({ type: Boolean, reflect: true }) collapsed: boolean = false;
  @property({ type: String }) screen?: AppScreen;
  @property({ type: Boolean }) open: boolean = true;

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

    if (changedProperties.has('menu') && this.menu) {
      this.setMenu(this.menu);
    }
    if (changedProperties.has('open') || changedProperties.has('screen')) {
      this.collapsed = !this.open && this.screen !== 'small';
    }
    if (changedProperties.has('backgroundColor') && this.backgroundColor) {
      this.style.backgroundColor = this.backgroundColor;
    }
  }

  render() {
    return html`
      <!-- 사이드바 상단 엘리먼트 -->
      <slot name="header"></slot>

      <!-- 상단 메뉴 스크롤 버튼 -->
      <u-icon class="elevator up" type="system" name="chevron-up"
        @click=${this.handleScrollTop}
      ></u-icon>

      <!-- 사이드바 메인 네비게이션 메뉴 -->
      <div class="menu" @scroll=${this.handleScrollMenu}>
        ${this.renderMenuItems(this.topMenu)}
        <div class="flex"></div>
        ${this.renderMenuItems(this.bottomMenu)}
      </div>

      <!-- 하단 메뉴 스크롤 버튼 -->
      <u-icon class="elevator down" type="system" name="chevron-down"
        @click=${this.handleScrollBottom}
      ></u-icon>

      <!-- 사이드바 하단 엘리먼트 -->
      <slot name="footer"></slot>
    `;
  }

  private renderMenuItems(menuItems?: MenuItem[]) {
    return menuItems?.map(item => this.renderMenuItem(item));
  }

  private renderMenuItem(item: MenuItem) {
    if(item.type === 'divider') {
      // ===== 메뉴 구분선 아이템  ===== //
      return html`
        <menu-divider
          ?collapsed=${this.collapsed}
          .text=${item.text}
          .line=${item.line}
          .height=${item.height}
        ></menu-divider>`;
    } else if(item.path !== undefined) {
      // ===== 단일 메뉴 아이템 ===== //
      return html`
        <single-menu
          ?active=${this.activePath === item.path}
          ?collapsed=${this.collapsed}
          .icon=${item.icon}
          .display=${item.display}
          .path=${item.path}
        ></single-menu>`;
    } else if(item.items) {
      // ===== 그룹 메뉴 아이템 ===== //
      const isActived = item.items.some(subItem => this.activePath === subItem.path);
      return html`
        <group-menu
          ?open=${this.open}
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

  // ===== 메뉴 설정 및 라우팅 핸들러 ===== //

  private handleRouteChange = (event: Event) => {
    const routeInfo = (event as CustomEvent).detail as RouteInfo;
    const pathname = routeInfo.pathname;
    let activePath: string | undefined = undefined;
    for (const item of this.menu || []) {
      if (item.type === 'divider') continue;
      if (item.path && this.checkPattern(item, pathname)) activePath = item.path;
      if (item.items) item.items.forEach(subItem => this.checkPattern(subItem, pathname) && (activePath = subItem.path));
    }
    this.activePath = activePath;
  }

  private setMenu(items: MenuItem[]): void {
    for (const item of items) {
      if (item.type === 'divider') continue;
      if (item.path) this.setPattern(item);
      if (item.items) item.items.forEach(subItem => this.setPattern(subItem));
    }
    this.topMenu = items.filter((item) => item.position === 'top' || !item.position);
    this.bottomMenu = items.filter((item) => item.position === 'bottom');
  }

  private setPattern(item: SingleMenuModel | GroupMenuItemModel) {
    const pathname = item.path.startsWith('/') ? item.path : combinePath(this.basepath || '', item.path);
    item.pattern ||= new URLPattern({ pathname: pathname + '*' });
  }

  private checkPattern(item: SingleMenuModel | GroupMenuItemModel, pathname: string) {
    const isMatched = item.pattern?.test({ pathname: pathname });
    return isMatched;
  }

  // ===== 네비게이션 메뉴 스크롤 핸들러 ===== //

  private handleScrollMenu = (event: Event) => {
    const target = event.target as HTMLElement;
    if (target.scrollTop > 20) {
      this.elevatorUp.classList.add('show');
    } else {
      this.elevatorUp.classList.remove('show');
    }
    const scrollHeight = target.scrollHeight - target.scrollTop - 20;
    if (scrollHeight <= target.clientHeight) {
      this.elevatorDown.classList.remove('show');
    } else {
      this.elevatorDown.classList.add('show');
    }
  }

  private handleScrollTop = () => {
    this.menuEl.scrollTo({ top: 0, behavior: 'smooth' });
  }

  private handleScrollBottom = () => {
    this.menuEl.scrollTo({ top: this.menuEl.scrollHeight, behavior: 'smooth' });
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
    :host([collapsed]) slot {
      display: none;
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
    }
    .menu::-webkit-scrollbar {
      width: 0px;
    }

    .elevator {
      position: relative;
      display: none;
      width: 100%;
      justify-content: center;
      cursor: pointer;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    }
    .elevator:hover {
      background-color: var(--sl-color-gray-100);
      color: var(--sl-color-sky-600);
    }
    .elevator.show {
      display: flex;
    }

  `;
}
