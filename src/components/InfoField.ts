import { html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { formatNumber, formatCurrency, formatDate } from '@iyulab/components';

import { StyledElement } from '../internals/StyledElement.js';
import { styles } from './InfoField.styles.js';

type ElementParts = 'host' | 'label' | 'value' | 'trend';
export type InfoFieldFormat = 'number' | 'currency' | 'date';
export type InfoFieldSize = 'default' | 'lg';
export type InfoFieldTrend = 'up' | 'down' | 'flat';
export type InfoFieldTone = 'positive' | 'negative' | 'neutral';

function inferTone(trend?: InfoFieldTrend): InfoFieldTone {
  if (trend === 'up') return 'positive';
  if (trend === 'down') return 'negative';
  return 'neutral';
}

/** 값이 "아직 없음"인가 — `0` 과 `false` 는 **값이다**. */
export function isBlank(v: unknown): boolean {
  return v === null || v === undefined || (typeof v === 'string' && v.trim() === '');
}

/**
 * 정보 필드 — 읽기 전용 라벨-값 한 쌍.
 *
 * 🔴★**"아직 없음"과 "0"은 다른 사실이다.**
 *   `null`·`undefined`·빈 문자열 → **`—`**
 *   `0`·`false`·`'0'`            → **그 값 그대로**
 *
 *   ⚠이 규칙을 사람이 기억하는 방식으로 두면 **반드시 어긋난다.** 실제로 한 소비앱에서
 *   *"부수가 0인 주문"* 과 *"부수가 아직 안 정해진 주문"* 이 화면에서 똑같이 `—` 로 보였고,
 *   그 둘은 업무적으로 전혀 다른 상태였다. 그래서 규칙을 컴포넌트가 소유한다.
 *
 * ```html
 * <u-info-field label="부수" .value=${order.quantity} numeric></u-info-field>
 * <u-info-field label="거래처">동서인쇄</u-info-field>   <!-- 슬롯이 value 를 이긴다 -->
 * <u-info-field label="합계" format="currency" currency="KRW" .value=${order.total}></u-info-field>
 * ```
 */
@customElement('u-info-field')
export class InfoField extends StyledElement<ElementParts> {
  static styles = [super.styles, styles];

  /** 필드 이름. */
  @property({ type: String }) label = '';
  /**
   * 값. `null`/`undefined`/빈 문자열이면 `blank` 문구로 대체된다.
   * ⚠`0`·`false` 는 **대체되지 않는다** — 값이기 때문이다.
   * 속성(`value="…"`)과 프로퍼티(`.value=`) 둘 다 받는다 — HTML 속성은 항상 문자열이라
   * `type: String` 변환기가 붙어도 `.value=${order.quantity}` 같은 비-문자열 프로퍼티
   * 바인딩은 그대로 통과한다(변환기는 속성 파싱에만 관여한다). 렌더는 `format` 이 없으면
   * 항상 `String(value)`.
   */
  @property({ type: String }) value?: unknown;
  /** "아직 없음"을 나타낼 문구. */
  @property({ type: String }) blank = '—';
  /**
   * 숫자 값 — 우정렬 + 고정폭 숫자(`tabular-nums`).
   * ★자릿수가 세로로 맞아야 크기 비교가 눈으로 된다. LOB 화면은 금액·수량이 절반이다.
   * `format` 이 `'number'`/`'currency'` 면 이 정렬이 자동으로 함의된다 — 따로 켤 필요 없다.
   */
  @property({ type: Boolean }) numeric = false;
  /**
   * Renders the value through `@iyulab/components`' `formatNumber`/`formatCurrency`/
   * `formatDate`. When unset (default), falls back to plain `String(value)` as before.
   */
  @property({ type: String }) format?: InfoFieldFormat;
  /**
   * Currency code to use when `format="currency"` (e.g. `'KRW'`). **No default** — if
   * omitted, degrades to plain number formatting without a currency symbol (does not throw).
   */
  @property({ type: String }) currency?: string;
  /**
   * Display size. `'lg'` renders the value at the `title` type-scale step
   * (`--u-text-title-size`/`--u-text-title-weight`) — intended for dashboard KPI tiles
   * composed inside `u-info-section`. Reflects to the `size` attribute so
   * `:host([size="lg"])` styling works.
   */
  @property({ type: String, reflect: true }) size: InfoFieldSize = 'default';
  /** Trend direction (optional). Renders a trend indicator when set, alongside `trendLabel`. */
  @property({ type: String }) trend?: InfoFieldTrend;
  /**
   * Trend copy, e.g. `"+12% vs last month"`. **Wording is the consumer's responsibility** — this
   * component does not compose domain phrasing. Setting this alone (without `trend`) still shows
   * the trend part, toned `neutral` unless `tone` is set.
   */
  @property({ type: String }) trendLabel?: string;
  /**
   * Explicit tone override. When unset, resolves from `trend` (`up→positive`, `down→negative`,
   * `flat`/unset→`neutral`). **Always wins over inference** — some metrics invert the usual
   * direction-to-sentiment mapping (e.g. a falling "open tickets" count is `positive`).
   */
  @property({ type: String }) tone?: InfoFieldTone;

  private get hasSlotted(): boolean {
    return this.childNodes.length > 0 &&
      [...this.childNodes].some(n => n.nodeType !== Node.TEXT_NODE || (n.textContent ?? '').trim() !== '');
  }

  private formatValue(): string {
    if (this.format === 'currency') {
      return this.currency
        ? formatCurrency(Number(this.value), this.currency)
        : formatNumber(Number(this.value));
    }
    if (this.format === 'number') {
      return formatNumber(Number(this.value));
    }
    if (this.format === 'date') {
      return formatDate(this.value as string | Date);
    }
    return String(this.value);
  }

  render() {
    const blank = !this.hasSlotted && isBlank(this.value);
    const numeric = this.numeric || this.format === 'number' || this.format === 'currency';
    const showTrend = this.trend !== undefined || this.trendLabel !== undefined;
    const effectiveTone = this.tone ?? inferTone(this.trend);
    const glyph = this.trend === 'up' ? '▲' : this.trend === 'down' ? '▼' : '';
    return html`
      <div class="label" part="label">${this.label}</div>
      <div class="value ${numeric ? 'numeric' : ''} ${blank ? 'blank' : ''}" part="value">
        ${this.hasSlotted ? html`<slot></slot>` : blank ? this.blank : this.formatValue()}
      </div>
      ${showTrend ? html`
        <div class="trend tone-${effectiveTone}" part="trend">
          ${glyph ? html`<span aria-hidden="true">${glyph}</span> ` : ''}${this.trendLabel ?? ''}
        </div>
      ` : ''}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'u-info-field': InfoField;
  }
}
