import { html, type PropertyValues } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { formatNumber, formatCurrency, formatDate } from '@iyulab/components/dist/utilities/format.js';

import { StyledElement } from '../internals/StyledElement.js';
import { styles } from './InfoField.styles.js';

type ElementParts = 'host' | 'label' | 'value' | 'unit' | 'trend';
export type InfoFieldFormat = 'number' | 'currency' | 'date';
export type InfoFieldSize = 'default' | 'lg';
export type InfoFieldTrend = 'up' | 'down' | 'flat';
export type InfoFieldTone = 'positive' | 'negative' | 'warning' | 'neutral';

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
 * <u-info-field label="미결 작업지시" size="lg" .value=${12} unit="건"></u-info-field>
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
   * Numeric value — renders with tabular figures (`tabular-nums`) so digits keep their width
   * when the value changes. Implied by `format="number"`/`"currency"`.
   *
   * It does **not** change alignment: this is a label/value pair, not a table cell, so there are
   * no neighbouring figures to line up and right-aligning only pushes the value away from its
   * label. Where a layout does need right-aligned figures, style `::part(value)`.
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
   * Unit shown after the value — e.g. `'건'`, `'%'`, `'h'`. Drawn one step below the value (label
   * size, body weight, weak color) so a KPI figure keeps its emphasis at `size="lg"`. Hidden while
   * the value is blank: a placeholder has no unit. Follows slotted value content too.
   */
  @property({ type: String }) unit?: string;
  /**
   * Display size. `'lg'` renders the value at the `title` type-scale step
   * (`--u-text-title-size`/`--u-text-title-weight`) — intended for dashboard KPI tiles
   * composed inside `u-info-section`. Reflects to the `size` attribute so
   * `:host([size="lg"])` styling works.
   */
  @property({ type: String, reflect: true }) size: InfoFieldSize = 'default';
  /**
   * Trend direction (optional). Renders a trend indicator when set. The directional glyph
   * (▲/▼) is decorative (`aria-hidden`) — **pair `trend` with `trendLabel`** so the indicator
   * has an accessible name; `trend` alone conveys direction by color only.
   */
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
   *
   * Colors the value text itself, independent of `trend` — a static "balance due" figure can be
   * toned `negative` without a trend arrow. `warning` is for "needs attention, not wrong" (a
   * deadline coming up, a rate under target but within limits) and is never inferred from `trend`.
   * `neutral` has no visual effect on the value text (it already renders at full strength; only
   * `positive`/`negative`/`warning` stand out from it). Colors come from the theme's
   * `--u-success|danger|warning-color-strong`.
   */
  @property({ type: String }) tone?: InfoFieldTone;

  /** 라벨을 이름으로 준 슬롯 위젯과 그때의 라벨 — 소비자가 바꾼 이름은 우리 것이 아니다. */
  private readonly namedWidgets = new WeakMap<Element, string>();

  /**
   * 슬롯에 든 **이름 없는** 진행 막대·계량기(`progressbar`·`meter`, 네이티브 `<progress>`·`<meter>`)에 라벨을 이름으로 준다.
   *
   * 글자 값은 읽는 순서로 라벨 바로 뒤에 들리지만, 이 역할들은 자기 이름이 없으면 «이름 없는 위젯» 이다(axe
   * `aria-progressbar-name` · WCAG 1.3.1 — 화면에서 짝지은 관계는 프로그램으로도 이어져야 한다). 이미 이름을 가진
   * 위젯(`aria-label`·`aria-labelledby` — 스피너의 기본 이름 포함)은 건드리지 않는다.
   */
  private async nameSlottedWidgets(): Promise<void> {
    const slot = this.shadowRoot?.querySelector('slot');
    if (!slot) return;
    for (const el of slot.assignedElements({ flatten: true })) {
      // 컴포넌트는 첫 업데이트에서 자기 역할을 단다 — 슬롯 배정이 그보다 먼저 올 수 있다.
      await (el as { updateComplete?: Promise<unknown> }).updateComplete;
      const role = el.getAttribute('role') ?? (el.localName === 'progress' ? 'progressbar' : el.localName === 'meter' ? 'meter' : null);
      if (role !== 'progressbar' && role !== 'meter') continue;
      const ours = this.namedWidgets.get(el);
      const current = el.getAttribute('aria-label');
      if (el.hasAttribute('aria-labelledby') || (current !== null && current !== ours)) {
        this.namedWidgets.delete(el);
        continue;
      }
      if (this.label) {
        el.setAttribute('aria-label', this.label);
        this.namedWidgets.set(el, this.label);
      } else if (ours !== undefined) {
        el.removeAttribute('aria-label');
        this.namedWidgets.delete(el);
      }
    }
  }

  protected updated(changed: PropertyValues): void {
    super.updated(changed);
    if (changed.has('label')) void this.nameSlottedWidgets();
  }

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
    const unit = !blank && this.unit ? html`<span class="unit" part="unit">${this.unit}</span>` : '';
    return html`
      <div class="label" part="label">${this.label}</div>
      <div class="value ${numeric ? 'numeric' : ''} ${blank ? 'blank' : ''} tone-${effectiveTone}" part="value">${
        this.hasSlotted ? html`<slot @slotchange=${() => void this.nameSlottedWidgets()}></slot>` : blank ? this.blank : this.formatValue()}${unit}</div>
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
