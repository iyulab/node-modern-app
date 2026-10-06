import { html, nothing } from 'lit';
import { html as staticHtml, literal, type StaticValue } from 'lit/static-html.js';
import { property, state, customElement } from 'lit/decorators.js';

import { StyledElement } from '../internals/StyledElement.js';
import { slotHasContent } from '../internals/slotted.js';
import { styles } from './GroupBox.styles.js';

type ElementParts = 'host' | 'header' | 'title' | 'meta' | 'description' | 'actions' | 'body';

/** 제목 단계 — 페이지 제목(h1)은 `u-page-header` 몫이라 2 부터다. */
export type GroupBoxLevel = 2 | 3 | 4 | 5 | 6;

const HEADINGS: Record<GroupBoxLevel, StaticValue> = {
  2: literal`h2`, 3: literal`h3`, 4: literal`h4`, 5: literal`h5`, 6: literal`h6`,
};

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
 * 오버라이드: `part`(host·header·title·meta·description·actions·body) + slot 치환.
 * `divider` 속성으로 제목과 본문 사이 구분선을 켠다(기본 꺼짐 — 선이 많으면 화면이 시끄럽다).
 */
@customElement('u-group-box')
export class GroupBox extends StyledElement<ElementParts> {
  static styles = [super.styles, styles];

  /** 카드 제목. 비우면 헤더 자체를 렌더하지 않는다. */
  @property({ type: String }) title = '';
  /**
   * Secondary text shown after the title — a count, progress or short status
   * (`3 items`, `2/5 done`), drawn one step below the title: body size and weight, weak color.
   *
   * It sits inside the title's heading, so the heading's accessible name reads it too. Not drawn
   * without a `title`: it describes the title.
   */
  @property({ type: String }) meta?: string;

  /**
   * One line under the title saying what the box holds or what its numbers are based on
   * (`Prices are per unit, VAT excluded`). Caption size, weak color — it explains the title
   * without competing with it. Opens the header on its own, like `title`.
   */
  @property({ type: String }) description?: string;
  /** 제목과 본문 사이에 구분선을 넣는다. */
  @property({ type: Boolean }) divider = false;
  /** 본문 여백을 없앤다 — 표를 카드 가장자리까지 붙일 때. */
  @property({ type: Boolean }) flush = false;
  /**
   * Heading level of the title in the document outline (`2`–`6`, default `3`).
   *
   * The box cannot know how deep it sits in the page, so whoever composes the page says so — a
   * box placed directly under `u-page-header` (the page's `h1`) is usually `2`, and leaving it at
   * `3` skips a level and puts it deeper than its sibling sections. This changes semantics only:
   * the title keeps its visual size at every level. Out-of-range values fall back to `3`.
   */
  @property({ type: Number, reflect: true }) level: GroupBoxLevel = 3;

  /**
   * 액션 슬롯 배정 상태.
   * ★종전에는 'render()' 안에서 'this.querySelector()' 로 라이트 DOM 을 읽었다. 그것은
   *   **자식이 늦게 붙으면 못 본다** — 소비자가 'requestUpdate()' 를 부르지 않는 한
   *   헤더가 통째로 사라진 채로 남는다. 슬롯 배정은 'slotchange' 가 알려 준다.
   */
  @state() private hasActions = false;

  render() {
    const hasHeader = !!this.title || !!this.description || this.hasActions;
    return html`
      <div class="header ${this.divider ? 'divider' : ''} ${hasHeader ? '' : 'empty'}" part="header">
        <div class="titles">
          ${staticHtml`<${HEADINGS[this.level] ?? HEADINGS[3]} class="title" part="title">${this.title}${this.title && this.meta ? html` <span class="meta" part="meta">${this.meta}</span>` : ''}</${HEADINGS[this.level] ?? HEADINGS[3]}>`}
          ${this.description ? html`<p class="description" part="description">${this.description}</p>` : nothing}
        </div>
        <div class="actions ${this.hasActions ? '' : 'empty'}" part="actions">
          <slot name="actions"
            @slotchange=${(e: Event) => (this.hasActions = slotHasContent(e.target as HTMLSlotElement))}
          ></slot>
        </div>
      </div>
      <div class="body ${this.flush ? 'flush' : ''}" part="body"><slot></slot></div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'u-group-box': GroupBox;
  }
}
