import { html, nothing } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { formatNumber } from '@iyulab/components/dist/utilities/format.js';
import '@iyulab/components/dist/components/button/UButton.js';

import { StyledElement } from '../internals/StyledElement.js';
import { styles } from './AttentionList.styles.js';

type ElementParts = 'host' | 'base' | 'item' | 'rail' | 'title' | 'description' | 'count' | 'action';

/** 줄의 긴급도 — `negative` 지금 어긋남(지연) · `warning` 곧 어긋남(임박) · `info` 확인할 것 · `neutral` 참고. */
export type AttentionTone = 'negative' | 'warning' | 'info' | 'neutral';

/** 사람이 봐야 하는 일 한 줄. */
export interface AttentionItem {
  /** 무엇인가(예: «납기 지연»). */
  title: string;
  /** 왜 · 기준(예: «약속한 날을 넘긴 주문 — 가장 오래된 것 39일»). */
  description?: string;
  /** 해당 건수. `0` 이면 줄이 물러서고 행동을 그리지 않는다 — 할 일이 없다. */
  count: number;
  /** 긴급도. 기본 `neutral`. */
  tone?: AttentionTone;
  /** 행동이 갈 곳. `action` 과 함께 주면 줄 끝에 그 버튼을 그린다. */
  href?: string;
  /** 행동 이름(예: «처리하기», «대조하기»). */
  action?: string;
}

/**
 * 주의 목록 — 자동으로 넘어가지 못하고 사람을 기다리는 일을 한 줄씩: 긴급도 띠 · 무엇과 왜 · 건수 · 그 일로 가는 행동.
 *
 * 업무 앱의 첫 화면이 «오늘 사람이 손대야 할 것» 을 모을 때 같은 줄을 매번 손으로 짰다 — 태그 · 설명 · 숫자 · 버튼의 칸 폭과
 * 정렬이 화면마다 달라진다. 이 요소가 그 줄의 모양을 정한다. 긴급도는 띠의 색과 함께 `title` 의 말로 전한다(색만으로 전하지 않는다).
 *
 * ```html
 * <u-attention-list label="Needs a person" .items=${[
 *   { title: 'Late', description: 'Past the promised date — oldest 39 days', count: 14, tone: 'negative', href: '/orders?view=late', action: 'Open' },
 *   { title: 'Due in 3 days', count: 8, tone: 'warning', href: '/orders?view=soon', action: 'Open' },
 *   { title: 'Partner requests', description: 'Nothing new', count: 0 },
 * ]}></u-attention-list>
 * ```
 *
 * @csspart base - 목록(`<ul>`)
 * @csspart item - 한 줄
 * @csspart rail - 긴급도 띠
 * @csspart title - 무엇인가
 * @csspart description - 왜 · 기준
 * @csspart count - 건수
 * @csspart action - 행동 버튼(`u-button`)
 */
@customElement('u-attention-list')
export class AttentionList extends StyledElement<ElementParts> {
  static styles = [super.styles, styles];

  /** 줄들 — 급한 것부터. 속성으로만 준다. */
  @property({ attribute: false }) items: AttentionItem[] = [];
  /** 목록의 접근 가능한 이름(예: `'사람이 봐야 하는 것'`). */
  @property({ type: String }) label = '';

  render() {
    return html`
      <ul class="base" part="base" aria-label=${this.label || nothing}>
        ${(this.items ?? []).map((item) => {
          const idle = !(item.count > 0);
          const tone = idle ? 'neutral' : (item.tone ?? 'neutral');
          return html`
            <li class="item" part="item" data-tone=${tone} ?data-idle=${idle}>
              <span class="rail" part="rail" aria-hidden="true"></span>
              <span class="text">
                <span class="title" part="title">${item.title}</span>
                ${item.description ? html`<span class="description" part="description">${item.description}</span>` : nothing}
              </span>
              <span class="count" part="count">${formatNumber(item.count)}</span>
              <span class="action-cell">
                ${!idle && item.href && item.action
                  ? html`<u-button part="action" appearance="outlined" size="sm" href=${item.href}>${item.action}</u-button>`
                  : nothing}
              </span>
            </li>
          `;
        })}
      </ul>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'u-attention-list': AttentionList;
  }
}
