import { html } from 'lit';
import { property } from 'lit/decorators.js';
import { DirectiveResult } from 'lit/directive.js';

import { BaseElement } from '@iyulab/components/dist/components/BaseElement.js';
import { UIcon } from '@iyulab/components/dist/components/icon/UIcon.component.js';

import { StyledElement, StyleMap } from '../internals/StyledElement.js';
import { styles } from './SidebarLink.styles.js';

type ElementParts = 'host' | 'base' | 'icon' | 'label';

/** 링크 항목 디폴트 타입 */
export interface SidebarLinkConfig {
  type: 'link';
  icon?: string;
  label: string | DirectiveResult;
  href: string;
  pattern?: string | URLPattern;
  styles?: StyleMap<ElementParts>;
}

/**
 * SidebarLink 컴포넌트는 계층형 네비게이션 아이템을 표시합니다.
 * 아이콘, 레이블, 하위 아이템을 지원합니다.
 */
export class SidebarLink extends StyledElement<ElementParts> {
  static styles = [ super.styles, styles ];
  static dependencies: Record<string, typeof BaseElement> = {
    'u-icon': UIcon
  };

  /** selected 상태 */
  @property({ type: Boolean, reflect: true }) selected = false;
  /** 콤팩트 모드 여부 */
  @property({ type: Boolean }) compact = false;
  /** 네비게이션 아이템 데이터 */
  @property({ type: String }) icon?: string;
  /** 네비게이션 아이템 데이터 */
  @property({ type: String }) label?: string | DirectiveResult;
  /** 네비게이션 링크 */
  @property({ type: String }) href?: string;
  /** 네비게이션 패턴 매칭 */
  @property({ type: String }) pattern?: string | URLPattern;
  
  render() {
    return html`
      <u-link .href=${this.href || '#'}>
        <div class="container" part="base" ?compact=${this.compact}>
          <u-icon part="icon" ?hidden=${!this.icon}
            .name=${this.icon}
          ></u-icon>
          <span part="label" ?hidden=${this.compact}>
            ${this.label}
          </span>
        </div>
      </u-link>
    `;
  }
}