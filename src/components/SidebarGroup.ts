import { html } from 'lit';
import { property } from 'lit/decorators.js';
import { DirectiveResult } from 'lit/directive.js';

import { BaseElement } from '@iyulab/components/dist/components/BaseElement.js';
import { UIcon } from '@iyulab/components/dist/components/icon/UIcon.component.js';

import { app } from '../App.js';
import type { StyleMap } from '../types/AppTypes.js';
import { ExtendedBaseElement } from '../internals/ExtendedBaseElement.js';
import { SidebarLink, type SidebarLinkConfig } from './SidebarLink.js';
import { styles } from './SidebarGroup.styles.js';

type ElementParts = 'host' | 'container' | 'base' | 'icon' | 'label' | 'toggler' | 'items';

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
export class SidebarGroup extends ExtendedBaseElement<ElementParts> {
  static styles = [ super.styles, styles ];
  static dependencies: Record<string, typeof BaseElement> = {
    'u-icon': UIcon
  };

  /** 콤팩트 모드 여부 */
  @property({ type: Boolean, reflect: true }) compact: boolean = false;
  /** collapsed 상태 */
  @property({ type: Boolean, reflect: true }) collapsed: boolean = true;
  /** 네비게이션 아이템 데이터 */
  @property({ type: String }) icon?: string;
  /** 네비게이션 아이템 데이터 */
  @property({ type: String }) label?: string | DirectiveResult;
  
  render() {
    return html`
      <div class="container" part="container">
        <button part="base"
          @click=${this.handleButtonClick}>
          <u-icon class="icon" part="icon"
            ?hidden=${!this.icon}
            .name=${this.icon}
          ></u-icon>
          <span class="label" part="label">
            ${this.label}
          </span>
          <u-icon class="toggler" part="toggler"
            lib="internal"
            name="chevron-down"
          ></u-icon>
        </button>
        
        <div class="items" part="items">
          <slot></slot>
        </div>
      </div>
    `;
  }

  /** 버튼 클릭 핸들러 */
  private handleButtonClick = (_: MouseEvent) => {
    if (this.compact) {
      const link = this.shadowRoot?.querySelector('slot')?.assignedElements({ flatten: true })
        .find(el => el instanceof SidebarLink) as SidebarLink | undefined;
      app.navigate(link?.href || '/');
    } else {
      this.collapsed = !this.collapsed;
    }
  }
}