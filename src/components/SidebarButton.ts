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
  /** 렌더된 `<u-sidebar-button>` 호스트에 그대로 전달된다 — `u-popover[for="#id"]` 같은
   *  외부 앵커링에 쓴다. */
  id?: string;
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
    // ⚠**콤팩트 상태에서 라벨이 숨는 것과 접근 가능한 이름이 사라지는 것은 다르다.**
    //   라벨은 `compact` 속성으로 **시각적으로만** 숨긴다(스타일의 visually-hidden) — 내용이 곧
    //   버튼의 이름이다. `hidden` 은 접근성 트리에서도 빼서 이름 없는 버튼을 만들었고(스크린리더
    //   실측), 문자열일 때만 `aria-label` 로 승격하던 종전 대책은 번역 디렉티브 라벨을 구하지 못했다.
    return html`
      <button part="base" ?compact=${this.compact}>
        <u-icon part="icon"
          .lib=${this.lib}
          .name=${this.icon}
          .fallback=${DEFAULT_NAV_ICON}
        ></u-icon>
        <span part="label" ?compact=${this.compact}>
          ${this.label}
        </span>
      </button>
    `;
  }
}