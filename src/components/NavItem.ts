import { html } from 'lit';
import { property } from 'lit/decorators.js';

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

  /** collapsed 상태 */
  @property({ type: Boolean, reflect: true }) collapsable = true;
  /** collapsed 상태 */
  @property({ type: Boolean, reflect: true }) collapsed = false;
  /** selected 상태 */
  @property({ type: Boolean, reflect: true }) selected = false;
  /** 네비게이션 아이템 데이터 */
  @property({ type: String }) icon?: string;
  /** 네비게이션 아이템 데이터 */
  @property({ type: String }) label?: string;
  /** 네비게이션 링크 */
  @property({ type: String }) href?: string;
  
  render() {
    return html`
      <u-link .href=${this.href} class="container">
        <u-icon class="icon"
          ?remote=${true}
          .name=${this.icon}
        ></u-icon>
        <span class="label">
          ${this.label}
        </span>
        <u-icon class="arrow"
          ?hidden=${!this.collapsable}
          name="chevron-down"
        ></u-icon>
      </u-link>
    `;
  }
}