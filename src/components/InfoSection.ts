import { html } from 'lit';
import { property, customElement } from 'lit/decorators.js';

import { StyledElement } from '../internals/StyledElement.js';
import { styles } from './InfoSection.styles.js';

type ElementParts = 'host' | 'grid';

/**
 * 정보 섹션 — `u-info-field` 들의 반응형 그리드.
 *
 * ★**열 수를 소비자가 세지 않는다.** 손으로 짠 라벨-값 그리드의 실패는 대부분
 *   *"열 수를 화면마다 다르게 하드코딩"* 이다 — 그러면 태블릿에서만 칸이 어긋나고,
 *   그 화면을 아무도 안 열어 봐서 오래 남는다. 여기서는 **컨테이너 폭**이 열 수를 정한다
 *   (미디어 쿼리가 아니라 `auto-fit` — 사이드 패널 안에 들어가도 맞는다).
 *
 * ```html
 * <u-info-section>
 *   <u-info-field label="파트" .value=${'일반'}></u-info-field>
 *   <u-info-field label="부수" .value=${0} numeric></u-info-field>
 * </u-info-section>
 * ```
 *
 * `min` 으로 한 칸의 최소 폭을 조절한다(기본 160px). 라벨이 긴 도메인은 값을 올린다.
 */
@customElement('u-info-section')
export class InfoSection extends StyledElement<ElementParts> {
  static styles = [super.styles, styles];

  /** 한 칸의 최소 폭(px). 이 값보다 좁아지면 열 수가 줄어든다. */
  @property({ type: Number }) min = 160;

  render() {
    // ⚠인라인 스타일은 이 한 값뿐이다 — 그리드 트랙은 CSS 변수로 계산해야 하고
    //   `repeat(auto-fit, minmax(var(--x), 1fr))` 는 변수를 받을 수 있다.
    return html`
      <div class="grid" part="grid" style="--info-min: ${this.min}px"><slot></slot></div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'u-info-section': InfoSection;
  }
}
