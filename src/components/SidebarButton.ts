import { html } from 'lit';
import { property } from 'lit/decorators.js';
import type { DirectiveResult } from 'lit/directive.js';

import { Icon } from '@iyulab/components/dist/components/Icon/Icon.js';
import { BaseElement } from '@iyulab/components/dist/components/BaseElement.js';
import { ExtendedBaseElement } from '../internals/ExtendedBaseElement.js';
import type { StyleMap } from '../types/AppTypes.js';
import { styles } from './SidebarButton.styles.js';

/** 버튼 항목 부분 */
type ElementParts = 'host' | 'base' | 'icon' | 'label';

/** 버튼 항목 구성 */
export interface SidebarButtonConfig {
  type: 'button';
  icon?: string;
  label?: string | DirectiveResult;
  styles?: StyleMap<ElementParts>;
  onClick?: (event?: Event) => void;
}

/**
 * SidebarButton 컴포넌트는 사이드바 내의 버튼을 표시합니다.
 */
export class SidebarButton extends ExtendedBaseElement<ElementParts> {
  static styles = [ super.styles, styles ];
  static dependencies: Record<string, typeof BaseElement> = {
    'u-icon': Icon
  };

  /** 콤팩트 모드 여부 */
  @property({ type: Boolean, reflect: true }) compact = false;
  /** 기본 u-icon 경로의 아이콘 이름 */
  @property({ type: String }) icon?: string;
  /** 버튼 텍스트 라벨 */
  @property({ type: String }) label?: string | DirectiveResult;
  
  render() {
    return html`
      <button part="base">
        <u-icon part="icon"
          ?hidden=${!this.icon}
          ?remote=${true}
          .name=${this.icon}
        ></u-icon>
        <span part="label"
          ?hidden=${this.compact}>
          ${this.label}
        </span>
      </button>
    `;
  }
}