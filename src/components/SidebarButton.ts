import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { DirectiveResult } from 'lit/directive.js';

import '@iyulab/components/dist/components/icon/UIcon.js';
import { DEFAULT_NAV_ICON } from '../internals/nav-icon.js';
import { StyledElement, StyleMap } from '../internals/StyledElement.js';
import type { SidebarPermissionGuard } from '../layouts/SidebarPermission.js';
import { styles } from './SidebarButton.styles.js';

/** 버튼 항목 부분 */
type ElementParts = 'host' | 'base' | 'icon' | 'label';

/** 버튼 항목 구성 */
export interface SidebarButtonConfig extends SidebarPermissionGuard {
  type: 'button';
  icon?: string;
  /** `icon`을 어느 등록 라이브러리에서 찾을지. 미지정 시 `u-icon`의 기본 URL 경로로
   *  해석된다(`IconRegistry.register()`로 등록한 이름 있는 세트를 쓰려면 지정해야 함). */
  lib?: string;
  label?: string | DirectiveResult;
  styles?: StyleMap<ElementParts>;
  onClick?: (event?: Event) => void;
}

/**
 * SidebarButton 컴포넌트는 사이드바 내의 버튼을 표시합니다.
 */
@customElement('u-sidebar-button')
export class SidebarButton extends StyledElement<ElementParts> {
  static styles = [ super.styles, styles ];

  /** 콤팩트 모드 여부 */
  @property({ type: Boolean, reflect: true }) compact = false;
  /** 기본 u-icon 경로의 아이콘 이름 */
  @property({ type: String }) icon?: string;
  /** `icon`을 해석할 등록 라이브러리 이름 */
  @property({ type: String }) lib?: string;
  /** 버튼 텍스트 라벨 */
  @property({ type: String }) label?: string | DirectiveResult;
  
  render() {
    return html`
      <button part="base" ?compact=${this.compact}>
        <u-icon part="icon"
          .lib=${this.lib}
          .name=${this.icon}
          .fallback=${DEFAULT_NAV_ICON}
        ></u-icon>
        <span part="label" ?hidden=${this.compact}>
          ${this.label}
        </span>
      </button>
    `;
  }
}