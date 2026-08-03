import { html, nothing } from 'lit';
import { property, customElement } from 'lit/decorators.js';

import { StyledElement } from '../internals/StyledElement.js';
import { styles } from './GroupBox.styles.js';

type ElementParts = 'host' | 'header' | 'title' | 'actions' | 'body';

/**
 * 그룹 박스 — 제목이 붙은 카드. LOB 상세 화면의 기본 단위다.
 *
 * ★**왜 `u-card` 가 아니라 이것인가**: `u-card` 는 면(surface)만 준다. LOB 화면에서 반복되는
 *   것은 *면 + 제목 + 우측 액션 슬롯* 이라는 **묶음**이고, 그 묶음을 소비자가 매번 조립하면
 *   제목 크기·여백·구분선이 화면마다 달라진다. 카드 30여 곳을 손으로 그리던 소비앱에서
 *   실제로 그렇게 갈라졌다.
 *
 * ```html
 * <u-group-box title="수금">
 *   <a slot="actions" href="/receivables">미수금·결제</a>
 *   …본문…
 * </u-group-box>
 * ```
 *
 * 오버라이드: `part`(host·header·title·actions·body) + slot 치환.
 * `divider` 속성으로 제목과 본문 사이 구분선을 켠다(기본 꺼짐 — 선이 많으면 화면이 시끄럽다).
 */
@customElement('u-group-box')
export class GroupBox extends StyledElement<ElementParts> {
  static styles = [super.styles, styles];

  /** 카드 제목. 비우면 헤더 자체를 렌더하지 않는다. */
  @property({ type: String }) title = '';
  /** 제목과 본문 사이에 구분선을 넣는다. */
  @property({ type: Boolean }) divider = false;
  /** 본문 여백을 없앤다 — 표를 카드 가장자리까지 붙일 때. */
  @property({ type: Boolean }) flush = false;

  render() {
    const hasHeader = !!this.title || this.querySelector('[slot="actions"]');
    return html`
      ${hasHeader
        ? html`
            <div class="header ${this.divider ? 'divider' : ''}" part="header">
              <h3 class="title" part="title">${this.title}</h3>
              <div class="actions" part="actions"><slot name="actions"></slot></div>
            </div>
          `
        : nothing}
      <div class="body ${this.flush ? 'flush' : ''}" part="body"><slot></slot></div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'u-group-box': GroupBox;
  }
}
