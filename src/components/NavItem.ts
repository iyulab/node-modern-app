import { html, nothing } from 'lit';
import { property, state } from 'lit/decorators.js';

import type { NavItemConfig } from '../types/AppConfigs.js';
import { Icon } from '@iyulab/components/dist/components/Icon/Icon.js';
import { UElement } from '@iyulab/components/dist/internals/UElement.js';
import { styles } from './NavItem.styles.js';

/**
 * NavItem 컴포넌트는 계층형 네비게이션 아이템을 표시합니다.
 * 아이콘, 레이블, 하위 아이템을 지원합니다.
 */
export class NavItem extends UElement {
  static styles = [ super.styles, styles ];
  static dependencies: Record<string, typeof UElement> = {
    'u-icon': Icon
  };

  /** 하위 아이템 펼침 상태 */
  @state() private expanded = false;

  /** collapsed 상태 */
  @property({ type: Boolean, reflect: true }) collapsed = false;
  /** 네비게이션 아이템 데이터 */
  @property({ type: Object }) item?: NavItemConfig;
  /** 현재 활성화된 경로 */
  @property({ type: String }) activePath = '';
  /** 들여쓰기 레벨 (중첩 깊이) */
  @property({ type: Number }) level = 0;
  
  render() {
    if (!this.item) return nothing;
    
    // 구분선인 경우
    if (this.item.divider) {
      return html`<div class="nav-divider"></div>`;
    }

    const hasChildren = this.item.children && this.item.children.length > 0;
    const isActive = this.item.path === this.activePath;
    const indent = this.level * 16;

    return html`
      <div class="nav-item-container">
        <div 
          class="nav-item ${isActive ? 'active' : ''} ${hasChildren ? 'has-children' : ''}"
          style="padding-left: ${indent}px"
          @click="${this.handleClick}"
        >
          ${this.item.icon ? html`
            <span class="nav-item__icon">
              <slot name="icon">
                <u-icon remote name="${this.item.icon}"></u-icon>
              </slot>
            </span>
          ` : nothing}
          
          ${!this.collapsed ? html`
            <span class="nav-item__label">${this.item.label}</span>
          ` : nothing}
          
          ${hasChildren && !this.collapsed ? html`
            <span class="nav-item__arrow ${this.expanded ? 'expanded' : ''}">
              ▶
            </span>
          ` : nothing}
        </div>
        
        ${hasChildren && this.expanded && !this.collapsed ? html`
          <div class="nav-item__children">
            ${this.item.children?.map(child => html`
              <app-nav-item
                .item="${child}"
                .activePath="${this.activePath}"
                .level="${this.level + 1}"
                .collapsed="${this.collapsed}"
              ></app-nav-item>
            `)}
          </div>
        ` : nothing}
      </div>
    `;
  }

  private handleClick(e: Event) {
    e.stopPropagation();
    
    const hasChildren = this.item?.children && this.item.children.length > 0;
    
    if (hasChildren) {
      // 하위 아이템이 있으면 펼침/접힘 토글
      this.expanded = !this.expanded;
    } else if (this.item?.path) {
      // 경로가 있으면 네비게이션 이벤트 발생
      this.dispatchEvent(new CustomEvent('navigate', {
        detail: { path: this.item.path },
        bubbles: true,
        composed: true
      }));
    }
  }
}