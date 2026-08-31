import { html, PropertyValues } from 'lit';
import { property, state, customElement } from 'lit/decorators.js';
import '@iyulab/components/dist/components/button/UButton.js';
import '@iyulab/components/dist/components/icon/UIcon.js';

import { StyledElement } from '../internals/StyledElement.js';
import { slotHasContent } from '../internals/slotted.js';
import { getLocaleStrings } from '../internals/locale.js';
import { styles } from './MasterDetailLayout.styles.js';
// 타입 전용 — React JSX.IntrinsicElements 증강을 이 파일을 로드하는 소비자에게 함께
// 실어 보낸다(deep-import든 barrel import든 이 파일 자체를 거치므로 항상 배선됨).
import type {} from '../types/jsx.js';

type ElementParts = 'host' | 'master' | 'divider' | 'detail' | 'detail-close';

/**
 * master›detail 반응형 split-pane 셸.
 *
 * ★**Vaadin `MasterDetailLayout` 을 선례로 삼되 범위를 의도적으로 줄였다.** 드래그 가능한
 *   스플리터는 v1 스코프 아웃(`masterSize` 는 고정 prop) — "얇은 구조" 원칙상 과하다.
 *
 * 기본 슬롯 = master 영역, `slot="detail"` = detail 영역. **detail 은 채워지면 나타나고
 * 비우면 사라진다** — Vaadin 과 동일 계약. 선택 상태 관리(무엇을 detail 에 보여줄지)는
 * 이 컴포넌트가 하지 않는다 — "그릇이지 디자인이 아니다"(`lob-layers.md` §3). 소비자가
 * `u-rich-table` 의 `selection-change` 등으로 `slot="detail"` 자식을 직접 갈아끼운다.
 *
 * ```html
 * <u-master-detail-layout>
 *   <u-rich-table @selection-change=${onSelect}>…</u-rich-table>
 *   <div slot="detail">…선택된 레코드 상세…</div>
 * </u-master-detail-layout>
 * ```
 *
 * 좁은 화면(자기 폭 기준, `overlayBreakpoint` 미만)에서 detail 이 master 위 전체 오버레이로
 * 전환된다 — 오버레이 모드에서만 보이는 작은 닫기 버튼이 `detail-close` 이벤트를 낸다.
 * 이건 구조적 기능(레이아웃 역학)이라 도메인 로직이 아니므로 컴포넌트가 가져도 된다.
 *
 * ★**왜 `@container` 미디어 질의가 아니라 `ResizeObserver` 인가**: `overlayBreakpoint` 는
 *   prop 이라 인스턴스마다 다른 값을 가질 수 있는데, CSS `@container` 조건은 빌드 시점에
 *   고정된 값만 받는다(런타임 커스텀 프로퍼티를 조건절에 못 쓴다) — 그래서 자기 폭을 직접
 *   재서 `overlay` 속성을 반영한다. `masterSize`/`overlayBreakpoint` 가 고정 디자인값이
 *   아니라 소비자가 화면마다 바꿀 구조 파라미터이기 때문에 생기는 필연적 차이이지,
 *   `PageHeader`/`GroupBox`/`ActionBar` 의 고정 중단점 관행을 벗어나려는 것이 아니다.
 *
 * 오버라이드: `part`(host·master·divider·detail·detail-close) + slot 치환.
 */
@customElement('u-master-detail-layout')
export class MasterDetailLayout extends StyledElement<ElementParts> {
  static styles = [super.styles, styles];

  /** master 영역의 고정 폭(CSS 길이). detail 은 나머지 공간을 채운다. */
  @property({ type: String, attribute: 'master-size' }) masterSize = '22rem';

  /**
   * 이 값(px, 자기 폭 기준) 미만이면 detail 이 전체 오버레이로 전환된다.
   * `masterSize` + 최소한의 읽기 가능한 detail 폭을 더한 값보다 커야 두 패널이
   * 동시에 설 자리가 있다.
   */
  @property({ type: Number, attribute: 'overlay-breakpoint' }) overlayBreakpoint = 760;

  /**
   * 언어 태그. 비우면 `setDefaultLocale()` 값, 그것도 없으면 영어.
   * 닫기 버튼의 접근성 라벨에만 쓰인다.
   */
  @property({ type: String }) locale = '';

  /** detail 슬롯 배정 상태 — CSS `:has()` 로는 알 수 없다(`internals/slotted.ts` 참조). */
  @state() private hasDetail = false;

  private resizeObserver?: ResizeObserver;

  connectedCallback(): void {
    super.connectedCallback();
    this.resizeObserver = new ResizeObserver(entries => {
      const width = entries[0]?.contentRect.width ?? 0;
      // width === 0 은 아직 레이아웃되지 않은 과도 상태일 수 있다(예: 조상이 display:none) —
      // 그 순간의 값으로 오버레이를 강제하지 않는다.
      if (width === 0) return;
      this.toggleAttribute('overlay', width < this.overlayBreakpoint);
    });
    this.resizeObserver.observe(this);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.resizeObserver?.disconnect();
  }

  protected updated(changed: PropertyValues): void {
    super.updated(changed);
    if (changed.has('masterSize')) {
      this.style.setProperty('--_master-size', this.masterSize);
    }
  }

  /**
   * 오버레이 모드의 닫기 버튼이 눌렸을 때. detail 내용을 지우는 것은 소비자 몫이라
   * 컴포넌트 내부에 취소로 막을 동작이 없다 — 그래서 취소 불가 이벤트다(`fire()` 기본값인
   * `cancelable: true` 를 명시적으로 끈다).
   */
  private handleDetailClose = () => {
    this.fire('detail-close', { cancelable: false });
  };

  private handleDetailSlotChange = (e: Event) => {
    this.hasDetail = slotHasContent(e.target as HTMLSlotElement);
  };

  render() {
    return html`
      <div class="master" part="master"><slot></slot></div>
      <div class="divider ${this.hasDetail ? '' : 'empty'}" part="divider"></div>
      <div class="detail ${this.hasDetail ? '' : 'empty'}" part="detail">
        <u-button class="detail-close" part="detail-close" variant="ghost"
          aria-label=${getLocaleStrings(this.locale || undefined).detailClose}
          @click=${this.handleDetailClose}
        >
          <u-icon lib="internal" name="x"></u-icon>
        </u-button>
        <slot name="detail" @slotchange=${this.handleDetailSlotChange}></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'u-master-detail-layout': MasterDetailLayout;
  }
}
