import { html, nothing } from 'lit';
import { property } from 'lit/decorators.js';
import type { DirectiveResult } from 'lit/directive.js';

import { BaseElement } from '@iyulab/components/dist/components/BaseElement.js';
import { Icon } from '@iyulab/components/dist/components/icon/Icon.js';
import { ExtendedBaseElement } from '../internals/ExtendedBaseElement.js';
import type { StyleMap } from '../types/AppTypes.js';
import { styles } from './SidebarLogo.styles.js';

type ElementParts = 'host' | 'container' | 'image' | 'icon' | 'label';

/** 로고  설정 */
export interface SidebarLogoConfig {
  type: 'image' | 'icon';
  image?: string;
  icon?: string;
  label?: string | DirectiveResult;
  styles?: StyleMap<ElementParts>;
  onClick?: (e: MouseEvent) => void;
}

/**
 * SidebarLogo 컴포넌트는 사이드바에 표시되는 로고를 나타냅니다.
 */
export class SidebarLogo extends ExtendedBaseElement<ElementParts> {
  static styles = [ super.styles, styles ];
  static dependencies: Record<string, typeof BaseElement> = {
    'u-icon': Icon,
  };

  /** 콤팩트 모드 여부 */
  @property({ type: Boolean }) compact = false;
  /** 로고 타입 */
  @property({ type: String }) type: 'image' | 'icon' = 'icon';
  /** 로고 이미지 URL */
  @property({ type: String }) image?: string;
  /** 로고 아이콘 svg 이름 */
  @property({ type: String }) icon?: string;
  /** 로고 아이콘 텍스트 */
  @property({ type: String }) label?: string | DirectiveResult;

  render() {
    return html`
      <div class="container" part="container">
        ${this.type === 'image' && this.image ? html`
          <img part="image"
            src=${this.image}
            alt="App Logo"
          />`
        : this.type === 'icon' && this.icon ? html`
          <u-icon part="icon" 
            .remote=${true}
            .name=${this.icon}
          ></u-icon>`
        : nothing}
        <span part="label"
          ?hidden=${this.compact || !this.label}>
          ${this.label}
        </span>
      </div>
    `;
  }
}