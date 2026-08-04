import { html } from 'lit';
import { property, state, customElement } from 'lit/decorators.js';

import { StyledElement } from '../internals/StyledElement.js';
import { slotHasContent } from '../internals/slotted.js';
import { styles } from './ActionBar.styles.js';

type ElementParts = 'host' | 'danger' | 'main';

/**
 * 푸터 액션 바 — 상세·편집 화면 맨 아래의 같은 골격.
 *
 * ★**왜 이것이 라이브러리에 있나**: 화면마다 손으로 짜면 ⑴«저장»의 위치가 화면마다
 *   달라지고 ⑵위험 액션(삭제)이 주 액션 **옆에** 놓여 오조작을 부르고 ⑶긴 폼에서
 *   버튼을 찾아 끝까지 스크롤해야 한다. 셋 다 개별로는 사소해 보이지만 **오조작은
 *   되돌릴 수 없다.**
 *
 * ```html
 * <u-action-bar sticky>
 *   <u-button slot="danger" color="danger" variant="ghost">삭제</u-button>
 *   <u-button variant="ghost">취소</u-button>
 *   <u-button color="primary">저장</u-button>
 * </u-action-bar>
 * ```
 *
 * 배치 규칙: **위험 액션은 왼쪽 끝, 주 액션은 오른쪽 끝** — 거리가 안전장치다.
 * 좁아지면 두 무리가 각자 한 줄을 갖고 **주 액션이 위로** 온다(엄지 위치에 위험 액션을
 * 두지 않기 위해서다).
 *
 * 오버라이드: `part`(host·danger·main) + slot 치환.
 */
@customElement('u-action-bar')
export class ActionBar extends StyledElement<ElementParts> {
  static styles = [super.styles, styles];

  /**
   * 화면 하단에 고정한다(`position: sticky`).
   * ⚠스크롤 컨테이너 안에서만 의미가 있다 — 부모가 `overflow: auto` 여야 한다.
   */
  @property({ type: Boolean, reflect: true }) sticky = false;

  /**
   * 위험 액션 슬롯 배정 상태.
   * ★CSS `:has()` 로는 알 수 없다 — `<slot>` 자신이 자식이라 항상 참이다
   * (`internals/slotted.ts` 참조). 빈 래퍼가 남으면 주 액션이 가운데로 밀린다.
   */
  @state() private hasDanger = false;

  render() {
    return html`
      <div class="danger ${this.hasDanger ? '' : 'empty'}" part="danger">
        <slot name="danger"
          @slotchange=${(e: Event) => (this.hasDanger = slotHasContent(e.target as HTMLSlotElement))}
        ></slot>
      </div>
      <div class="main" part="main"><slot></slot></div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'u-action-bar': ActionBar;
  }
}
