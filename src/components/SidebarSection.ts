import { html } from 'lit';
import { property } from 'lit/decorators.js';

import { BaseElement } from '@iyulab/components/dist/components/BaseElement.js';
import { ExtendedBaseElement } from '../internals/ExtendedBaseElement.js';
import type { SidebarLinkConfig } from './SidebarLink.js';
import type { SidebarGroupConfig } from './SidebarGroup.js';
import type { StyleMap } from '../types/AppTypes.js';
import { styles } from './SidebarSection.styles.js';

type ElementParts = 'host' | 'container' | 'header' | 'title' | 'subtitle' | 'items';

/** 섹션: 섹션 내에는 그룹 또는 링크들만 허용 */
export interface SidebarSectionConfig {
  type: 'section';
  title: string;
  subTitle?: string;
  items: (SidebarGroupConfig | SidebarLinkConfig)[];
  styles?: StyleMap<ElementParts>;
}

/**
 * SidebarSection 컴포넌트는 사이드바의 섹션 헤더를 표시합니다.
 */
export class SidebarSection extends ExtendedBaseElement<ElementParts> {
  static styles = [ super.styles, styles ];
  static dependencies: Record<string, typeof BaseElement> = {};

  /** 콤팩트 모드 여부 */
  @property({ type: Boolean }) compact = false;
  /** 네비게이션 아이템 데이터 */
  @property({ type: String }) mainTitle?: string;
  /** 네비게이션 아이템 데이터 */
  @property({ type: String }) subTitle?: string;
  
  render() {
    return html`
      <div class="container" part="container">
        <div class="header" part="header"
          ?hidden=${this.compact}>
          <h3 class="title" part="title">
            ${this.mainTitle}
          </h3>
          <p class="subtitle" part="subtitle"
            ?hidden=${!this.subTitle}>
            ${this.subTitle}
          </p>
        </div>
        
        <div class="items" part="items">
          <slot></slot>
        </div>
      </div>
    `;
  }
}