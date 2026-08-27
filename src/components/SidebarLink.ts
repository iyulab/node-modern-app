import { html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { DirectiveResult } from 'lit/directive.js';

import '@iyulab/components/dist/components/icon/UIcon.js';
import { DEFAULT_NAV_ICON } from '../internals/nav-icon.js';
import { StyledElement, StyleMap } from '../internals/StyledElement.js';
import type { SidebarPermissionGuard } from '../layouts/SidebarPermission.js';
import { styles } from './SidebarLink.styles.js';

type ElementParts = 'host' | 'base' | 'icon' | 'label';

/** 링크 항목 디폴트 타입 */
export interface SidebarLinkConfig extends SidebarPermissionGuard {
  type: 'link';
  icon?: string;
  lib?: string;
  label: string | DirectiveResult;
  href: string;
  pattern?: string | URLPattern;
  styles?: StyleMap<ElementParts>;

  /**
   * 라우터가 가로채지 않고 브라우저의 문서 이동에 맡긴다 — 같은 오리진의 비-SPA 경로용.
   *
   * 실무 앱의 메뉴에는 SPA 화면만 서지 않는다: 도움말/문서 사이트, 리포트 출력 엔드포인트,
   * 관리 콘솔, 레거시 페이지가 같은 목록에 선다. 종전에는 그것을 **표현할 수 없어서**
   * 메뉴에 걸면 라우터가 클릭을 가로채 not-found 로 떨어졌다.
   *
   * ```ts
   * { type: 'link', label: '도움말', href: '/help/', navigate: 'document' }
   * ```
   */
  navigate?: 'router' | 'document';

  /**
   * 앵커 `target`. 새 탭으로 열 때 쓴다.
   *
   * ⚠**`navigate` 를 대신하지 못한다** — `_blank` 는 **새 탭을 강제**하므로 「같은 탭에서
   * 다른 문서로」를 표현할 수 없다. 그것이 종전에 유일한 탈출구였고, 그래서 부족했다.
   */
  target?: '_self' | '_blank';
}

/**
 * SidebarLink 컴포넌트는 계층형 네비게이션 아이템을 표시합니다.
 * 아이콘, 레이블, 하위 아이템을 지원합니다.
 */
@customElement('u-sidebar-link')
export class SidebarLink extends StyledElement<ElementParts> {
  static styles = [ super.styles, styles ];

  /** selected 상태. `true`면 내부 `<u-link>`에 `aria-current="page"`도 함께 세팅한다. */
  @property({ type: Boolean, reflect: true }) selected = false;
  /** 콤팩트 모드 여부 */
  @property({ type: Boolean }) compact = false;
  /** 네비게이션 아이템 데이터 */
  @property({ type: String }) icon?: string;
  /** `icon`을 해석할 등록 라이브러리 이름 */
  @property({ type: String }) lib?: string;
  /** 네비게이션 아이템 데이터 */
  @property({ type: String }) label?: string | DirectiveResult;
  /** 네비게이션 링크 */
  @property({ type: String }) href?: string;
  /** 네비게이션 패턴 매칭 */
  @property({ type: String }) pattern?: string | URLPattern;
  /** 라우터가 가로채지 않고 브라우저 문서 이동에 맡긴다 (같은 오리진의 비-SPA 경로) */
  @property({ type: String }) navigate?: 'router' | 'document';
  /** 앵커 target — 새 탭으로 열 때 */
  @property({ type: String }) target?: '_self' | '_blank';

  render() {
    // ⚠**앵커를 유지하는 것이 요점이다.** 이것이 표현되지 않으면 소비앱은 `type: 'button'` +
    //   `location.assign()` 으로 우회하게 되는데, 그러면 가운데 클릭·주소 복사·상태바 미리보기·
    //   스크린리더의 «링크» 역할·`pattern` 기반 선택 표시를 전부 잃고, 섹션·그룹이 `button` 을
    //   받지 않아 **메뉴 최상위로 밀려난다.**
    // ⚠**콤팩트 상태에서 라벨이 숨는 것과 접근 가능한 이름이 사라지는 것은 다르다** —
    //   `label`이 순수 문자열일 때 `aria-label`로 승격한다(`u-link`가 이미 호스트의
    //   `aria-label`을 내부 `<a>`로 forwarding한다, docket #45/#75 실측 — SidebarButton/
    //   SidebarGroup과 같은 수정, docket #109).
    const compactLabel = this.compact && typeof this.label === 'string' ? this.label : nothing;
    return html`
      <u-link
        .href=${this.href || '#'}
        .navigate=${this.navigate}
        .target=${this.target}
        aria-current=${this.selected ? 'page' : nothing}
        aria-label=${compactLabel}
      >
        <div class="container" part="base" ?compact=${this.compact}>
          <u-icon part="icon"
            .lib=${this.lib}
            .name=${this.icon}
            .fallback=${DEFAULT_NAV_ICON}
          ></u-icon>
          <span part="label" ?hidden=${this.compact}>
            ${this.label}
          </span>
        </div>
      </u-link>
    `;
  }
}