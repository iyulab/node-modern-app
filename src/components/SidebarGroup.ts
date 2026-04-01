import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { DirectiveResult } from 'lit/directive.js';

import '@iyulab/components/dist/components/icon/UIcon.js';
import { StyledElement, StyleMap } from '../internals/StyledElement.js';
import { SidebarLink, type SidebarLinkConfig } from './SidebarLink.js';
import { styles } from './SidebarGroup.styles.js';

type ElementParts = 'host' | 'header' | 'icon' | 'label' | 'caret' | 'items';

/** 그룹: 하위 링크들 묶음 */
export interface SidebarGroupConfig {
  type: 'group';
  /** 기본 접힘 상태 */
  collapsed?: boolean;
  icon: string;
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
  /** 네비게이션 아이템 데이터 */
  @property({ type: String }) label?: string | DirectiveResult;
  
  render() {
    return html`
      <button part="header"
        ?compact=${this.compact}
        ?selected=${this.selected}
        @click=${this.handleButtonClick}>
        <u-icon class="icon" part="icon" ?hidden=${!this.icon}
          .name=${this.icon}
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