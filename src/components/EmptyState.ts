import { html, nothing } from 'lit';
import { property, customElement } from 'lit/decorators.js';

import { StyledElement } from '../internals/StyledElement.js';
import { styles } from './EmptyState.styles.js';

type ElementParts = 'host' | 'icon' | 'title' | 'description' | 'actions';

/**
 * 빈 상태 — 목록·검색 결과가 비었을 때.
 *
 * 🔴★**"데이터가 없다"와 "검색 결과가 없다"는 다른 사실이다.**
 *   전자는 *"아직 만들지 않았다"* 이고 다음 행동은 **만들기**다.
 *   후자는 *"조건에 맞는 것이 없다"* 이고 다음 행동은 **조건 바꾸기**다.
 *   같은 문구로 보여 주면 사용자는 필터가 걸려 있는 줄 모르고 *"데이터가 사라졌다"* 로 읽는다.
 *   ⇒ `variant` 로 가르고, 기본 문구가 각각 다르다.
 *
 * ```html
 * <u-empty-state variant="no-data" title="아직 주문이 없습니다">
 *   <u-button slot="actions">주문 등록</u-button>
 * </u-empty-state>
 *
 * <u-empty-state variant="no-results"></u-empty-state>
 * ```
 *
 * ⚠기본 문구는 한국어다 — 다국어 소비자는 `title`·`description` 을 준다.
 */
@customElement('u-empty-state')
export class EmptyState extends StyledElement<ElementParts> {
  static styles = [super.styles, styles];

  /** `no-data` = 아직 없음 / `no-results` = 조건에 맞는 것이 없음. */
  @property({ type: String }) variant: 'no-data' | 'no-results' = 'no-data';
  /** 제목. 비우면 variant 기본 문구. */
  @property({ type: String }) title = '';
  /** 보조 설명. 비우면 variant 기본 문구. */
  @property({ type: String }) description = '';

  private get defaults() {
    return this.variant === 'no-results'
      ? { icon: '🔍', title: '조건에 맞는 결과가 없습니다', description: '검색어나 필터를 바꿔 보십시오.' }
      : { icon: '📄', title: '아직 등록된 항목이 없습니다', description: '' };
  }

  render() {
    const d = this.defaults;
    const description = this.description || d.description;
    return html`
      <div class="icon" part="icon" aria-hidden="true">
        <slot name="icon">${d.icon}</slot>
      </div>
      <p class="title" part="title">${this.title || d.title}</p>
      ${description ? html`<p class="description" part="description">${description}</p>` : nothing}
      <div class="actions" part="actions"><slot name="actions"></slot></div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'u-empty-state': EmptyState;
  }
}
