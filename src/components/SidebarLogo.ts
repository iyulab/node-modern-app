import { html } from 'lit';
import { property } from 'lit/decorators.js';

import { UElement } from '@iyulab/components/dist/internals/UElement.js';
import { Icon } from '@iyulab/components/dist/components/icon/Icon.js';
import { styles } from './SidebarLogo.styles.js';

/**
 * SidebarLogo 컴포넌트는 사이드바에 표시되는 로고를 나타냅니다.
 */
export class SidebarLogo extends UElement {
  static styles = [ super.styles, styles ];
  static dependencies: Record<string, typeof UElement> = {
    'u-icon': Icon,
  };

  /** 로고 아이콘 이미지 네임 */
  @property({ type: String }) icon?: string;
  /** 로고 텍스트 */
  @property({ type: String }) label?: string;

  render() {
    return html`
      <div class="container">
        <u-icon remote .name=${this.icon}></u-icon>
        <span>${this.label}</span>
      </div>
    `;
  }
}