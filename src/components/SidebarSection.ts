import { html } from 'lit';
import { property } from 'lit/decorators.js';
import { DirectiveResult } from 'lit/directive.js';

import { BaseElement } from '@iyulab/components/dist/components/BaseElement.js';
import { StyledElement, StyleMap } from '../internals/StyledElement.js';
import type { SidebarLinkConfig } from './SidebarLink.js';
import type { SidebarGroupConfig } from './SidebarGroup.js';
import { styles } from './SidebarSection.styles.js';

type ElementParts = 'host' | 'header' | 'title' | 'subtitle' | 'items';

/** 섹션 내에는 그룹 또는 링크들만 허용 */
export interface SidebarSectionConfig {
  type: 'section';
  title: string | DirectiveResult;
  subTitle?: string | DirectiveResult;
  items: (SidebarGroupConfig | SidebarLinkConfig)[];
  styles?: StyleMap<ElementParts>;
}

/**
 * SidebarSection 컴포넌트는 사이드바의 섹션 헤더를 표시합니다.
 */
export class SidebarSection extends StyledElement<ElementParts> {
  static styles = [ super.styles, styles ];
  static dependencies: Record<string, typeof BaseElement> = {};

  /** 콤팩트 모드 여부 */
  @property({ type: Boolean }) compact = false;
  /** 네비게이션 아이템 데이터 */
  @property({ type: String }) mainTitle?: string | DirectiveResult;
  /** 네비게이션 아이템 데이터 */
  @property({ type: String }) subTitle?: string | DirectiveResult;
  
  render() {
    return html`
      <div class="header" part="header" ?hidden=${this.compact}>
        <span class="title" part="title">
          ${this.mainTitle}
        </span>
        <span class="subtitle" part="subtitle" ?hidden=${!this.subTitle}>
          ${this.subTitle}
        </span>
      </div>
      
      <div class="items" part="items">
        <slot></slot>
      </div>
    `;
  }
}