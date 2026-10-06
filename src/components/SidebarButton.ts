import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
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
  /** 이 버튼이 여는 팝업의 종류 — 안쪽 `<button>` 의 `aria-haspopup` 으로 간다(셸의 `type: 'menu'` 트리거). */
  @property({ type: String }) haspopup?: 'menu';
  /** 팝업이 열려 있는가 — `haspopup` 과 함께 `aria-expanded` 로 간다. 팝업이 없는 버튼에는 붙이지 않는다. */
  @property({ type: Boolean }) expanded = false;

  /** 포커스는 안쪽 `<button>` 으로 — 호스트는 포커스를 받지 않는다(팝업을 닫을 때 셸이 이것으로 되돌린다). */
  override focus(options?: FocusOptions): void {
    this.renderRoot.querySelector<HTMLButtonElement>('button')?.focus(options);
  }
  
  render() {
    // ⚠**콤팩트 상태에서 라벨이 숨는 것과 접근 가능한 이름이 사라지는 것은 다르다.**
    //   라벨은 `compact` 속성으로 **시각적으로만** 숨긴다(스타일의 visually-hidden) — 내용이 곧
    //   버튼의 이름이다. `hidden` 은 접근성 트리에서도 빼서 이름 없는 버튼을 만들었고(스크린리더
    //   실측), 문자열일 때만 `aria-label` 로 승격하던 종전 대책은 번역 디렉티브 라벨을 구하지 못했다.
    return html`
      <button part="base" ?compact=${this.compact}
        aria-haspopup=${ifDefined(this.haspopup)}
        aria-expanded=${ifDefined(this.haspopup ? String(this.expanded) : undefined)}>
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