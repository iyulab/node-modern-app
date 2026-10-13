import { html } from 'lit';
import { property, customElement } from 'lit/decorators.js';

import { StyledElement } from '../internals/StyledElement.js';
import { styles } from './InfoSection.styles.js';

type ElementParts = 'host' | 'grid';

/** 배치 — `grid` 라벨-값 칸의 반응형 그리드 · `strip` 지표 띠(구분선으로 나뉜 한 면의 칸). */
export type InfoSectionLayout = 'grid' | 'strip';

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
 *
 * `layout="strip"` 은 지표 띠다 — 결과의 합계를 문장이 아니라 칸으로(목록 위 «주문 962 · 청구 ₩…»).
 * 한 면 위에 1px 구분선으로 나뉜 칸들이 **전부 나란히, 아니면 전부 쌓인다**(띠 폭 640px 미만 — 들쭉날쭉한 줄을
 * 만들지 않는다). 임계는 크기 containment 가 아니라 칸의 flex-basis 가 건다(«Holy Albatross» — u-action-bar 와 같은
 * 근거). 구분선은 칸 사이 1px 간격으로 비치는 면의 테두리 색이라 가로·세로가 저절로 바뀐다. 이 배치에서 `min` 은 쓰지 않는다.
 */
@customElement('u-info-section')
export class InfoSection extends StyledElement<ElementParts> {
  static styles = [super.styles, styles];

  /** 한 칸의 최소 폭(px). 이 값보다 좁아지면 열 수가 줄어든다. */
  @property({ type: Number }) min = 160;
  /** 배치 — `grid`(기본) · `strip`(지표 띠). */
  @property({ type: String, reflect: true }) layout: InfoSectionLayout = 'grid';

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
