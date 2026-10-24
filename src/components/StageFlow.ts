import { html, nothing } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { formatNumber } from '@iyulab/components/dist/utilities/format.js';

import { StyledElement } from '../internals/StyledElement.js';
import { styles } from './StageFlow.styles.js';

type ElementParts = 'host' | 'base' | 'stage' | 'count' | 'bar' | 'label' | 'description' | 'note';

/** 단계의 톤 — `warning` 은 «밀리기 시작», `negative` 는 «병목» 같은 막힘. */
export type StageFlowTone = 'neutral' | 'warning' | 'negative';

/** 흐름의 한 단계. */
export interface StageFlowItem {
  /** 단계 이름. */
  label: string;
  /** 그 단계에 머문 건수 — 막대 높이가 된다. */
  count: number;
  /** 수 아래 보조 줄(그 단계에 묶인 금액 등). */
  description?: string;
  /** 누르면 갈 곳 — 주면 단계 전체가 링크가 된다(이름 = 단계 이름 + 수 + 보조 줄). */
  href?: string;
  /** 단계의 톤. 기본 `neutral`. */
  tone?: StageFlowTone;
  /** 톤을 준 이유 — 단계 아래 알약으로 그리고 이름에도 싣는다(색만으로 전하지 않게). */
  note?: string;
}

/**
 * 단계 흐름 — 순서가 있는 단계마다 «지금 몇 건이 머물러 있나» 를 막대로 견주고, 막힌 단계를 짚는다.
 *
 * 주문 · 작업 · 결재처럼 일이 정해진 단계를 차례로 지나가는 화면의 첫 줄이다. 단계를 독립된 KPI 타일로 늘어놓으면
 * «순서» 와 «상대 규모» 가 사라져 어디가 막혔는지 숫자를 하나씩 견줘야 한다 — 이 요소는 그 둘을 모양으로 준다:
 * 막대 높이는 가장 많은 단계에 대한 비율이고, 단계 사이에는 흐름 표시가 놓인다.
 *
 * `u-steps` 는 «한 레코드가 어디까지 왔나» 이고, 이것은 «여러 레코드가 단계마다 몇 건 쌓였나» 다.
 *
 * ```html
 * <u-stage-flow label="Order flow" unit="orders" .items=${[
 *   { label: 'Received', count: 403, description: '$626k', href: '/orders?stage=0' },
 *   { label: 'Billing', count: 669, description: '$187k', tone: 'negative', note: '2.1× usual', href: '/orders?stage=5' },
 * ]}></u-stage-flow>
 * ```
 *
 * 좁은 폭에서는 단계가 다음 줄로 넘어간다(각 단계의 최소 폭은 `--stage-flow-min-width`).
 *
 * @csspart base - 단계 목록(`<ol>`)
 * @csspart stage - 한 단계(링크면 `<a>`, 아니면 `<div>`)
 * @csspart count - 건수
 * @csspart bar - 상대 규모 막대
 * @csspart label - 단계 이름(번호 포함)
 * @csspart description - 보조 줄
 * @csspart note - 톤을 준 이유 알약
 * @cssprop --stage-flow-bar-height - 막대 칸의 높이(기본 `6.5rem`)
 * @cssprop --stage-flow-min-width - 한 단계의 최소 폭(기본 `7rem`) — 이보다 좁아지면 다음 줄로 넘어간다
 */
@customElement('u-stage-flow')
export class StageFlow extends StyledElement<ElementParts> {
  static styles = [super.styles, styles];

  /** 단계들 — 흐름 순서대로. 속성으로만 준다. */
  @property({ attribute: false }) items: StageFlowItem[] = [];
  /** 건수 뒤의 단위(예: `'건'`). */
  @property({ type: String }) unit = '';
  /** 목록의 접근 가능한 이름(예: `'주문 흐름'`). */
  @property({ type: String }) label = '';
  /** 단계 이름 앞에 순번(01, 02 …)을 붙인다 — 순서 자체가 정보일 때. */
  @property({ type: Boolean, reflect: true }) numbered = false;
  /** 막대 비율의 기준값 — 비우면 가장 많은 단계. 여러 흐름을 같은 눈금으로 견줄 때 준다. */
  @property({ type: Number }) max?: number;

  private ratio(count: number, max: number): number {
    if (!(max > 0) || !(count > 0)) return 0;
    return Math.min(1, count / max);
  }

  render() {
    const items = this.items ?? [];
    const max = this.max ?? Math.max(0, ...items.map((i) => i.count));
    const width = String(items.length).length < 2 ? 2 : String(items.length).length;

    return html`
      <ol class="base" part="base" aria-label=${this.label || nothing}>
        ${items.map((item, i) => {
          const tone = item.tone ?? 'neutral';
          const count = formatNumber(item.count);
          const ratio = this.ratio(item.count, max);
          const body = html`
            <span class="label" part="label">${this.numbered
              ? html`<span class="index" aria-hidden="true">${String(i + 1).padStart(width, '0')}</span>`
              : nothing}${item.label}</span>
            <span class="count" part="count"><span class="figure">${count}</span>${this.unit ? html`<span class="unit">${this.unit}</span>` : nothing}</span>
            <span class="well" aria-hidden="true">
              <span class="bar" part="bar" style="--_ratio:${ratio}" ?data-empty=${ratio === 0}></span>
            </span>
            ${item.description ? html`<span class="description" part="description">${item.description}</span>` : nothing}
            ${item.note ? html`<span class="note" part="note">${item.note}</span>` : nothing}
          `;
          return html`
            <li class="item" data-tone=${tone}>
              ${item.href
                ? html`<a class="stage" part="stage" href=${item.href}>${body}</a>`
                : html`<div class="stage" part="stage">${body}</div>`}
            </li>
          `;
        })}
      </ol>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'u-stage-flow': StageFlow;
  }
}
