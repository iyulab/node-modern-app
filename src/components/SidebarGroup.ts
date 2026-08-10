import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { DirectiveResult } from 'lit/directive.js';

import '@iyulab/components/dist/components/icon/UIcon.js';
import { DEFAULT_NAV_ICON } from '../internals/nav-icon.js';
import { StyledElement, StyleMap } from '../internals/StyledElement.js';
import { SidebarLink, type SidebarLinkConfig } from './SidebarLink.js';
import type { SidebarPermissionGuard } from '../layouts/SidebarPermission.js';
import { styles } from './SidebarGroup.styles.js';

type ElementParts = 'host' | 'header' | 'icon' | 'label' | 'caret' | 'items';

/** 그룹: 하위 링크들 묶음 */
export interface SidebarGroupConfig extends SidebarPermissionGuard {
  type: 'group';
  /** 기본 접힘 상태 */
  collapsed?: boolean;
  icon: string;
  lib?: string;
  label: string | DirectiveResult;
  items: SidebarLinkConfig[];
  styles?: StyleMap<ElementParts>;
}

/**
 * SidebarGroup 컴포넌트는 네비게이션 그룹 아이템을 표시합니다.
 */
@customElement('u-sidebar-group')
export class SidebarGroup extends StyledElement<ElementParts> {
  static styles = [ super.styles, styles ];

  /** 콤팩트 모드 여부 */
  @property({ type: Boolean, reflect: true }) compact: boolean = false;
  /** 선택된 상태 */
  @property({ type: Boolean, reflect: true }) selected: boolean = false;
  /** collapsed 상태 */
  @property({ type: Boolean, reflect: true }) collapsed: boolean = true;
  /** 네비게이션 아이템 데이터 */
  @property({ type: String }) icon?: string;
  /** `icon`을 해석할 등록 라이브러리 이름 */
  @property({ type: String }) lib?: string;
  /** 네비게이션 아이템 데이터 */
  @property({ type: String }) label?: string | DirectiveResult;
  
  render() {
    return html`
      <button part="header"
        ?compact=${this.compact}
        ?selected=${this.selected}
        @click=${this.handleButtonClick}>
        <!--
          ⚠ ?hidden 을 걸지 않는다. 접힌 상태에서는 라벨과 캐럿이 모두 숨으므로,
            아이콘까지 숨기면 **버튼이 통째로 비어 누를 것이 없어진다** — 이것이
            SidebarLink·SidebarButton 에서 폴백을 도입한 바로 그 결함이고, 이 자리만
            빠져 있었다.
        -->
        <u-icon class="icon" part="icon"
          .lib=${this.lib}
          .name=${this.icon}
          .fallback=${DEFAULT_NAV_ICON}
        ></u-icon>
        <span class="label" part="label" ?hidden=${this.compact}>
          ${this.label}
        </span>
        <u-icon class="caret" part="caret" ?hidden=${this.compact}
          ?collapsed=${this.collapsed}
          lib="internal"
          name="chevron-down"
        ></u-icon>
      </button>
      
      <div class="items" part="items" ?hidden=${this.compact}
        ?collapsed=${this.collapsed}>
        <slot></slot>
      </div>
    `;
  }

  /** 버튼 클릭 핸들러 */
  private handleButtonClick = (_: MouseEvent) => {
    if (this.compact) {
      const slink = this.shadowRoot?.querySelector('slot')?.assignedElements({ flatten: true })
        .find(el => el instanceof SidebarLink) as SidebarLink | undefined;
      const ulink = slink?.renderRoot.querySelector('u-link') as HTMLElement | undefined;
      ulink?.click(); 
    } else {
      this.collapsed = !this.collapsed;
    }
  }
}