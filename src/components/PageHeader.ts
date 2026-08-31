import { html, nothing } from 'lit';
import { property, state, customElement } from 'lit/decorators.js';

import { StyledElement } from '../internals/StyledElement.js';
import { getLocaleStrings } from '../internals/locale.js';
import { slotHasContent } from '../internals/slotted.js';
import { styles } from './PageHeader.styles.js';
import type React from 'react';

type ElementParts = 'host' | 'back' | 'heading' | 'title' | 'subtitle' | 'status' | 'actions';

/**
 * 페이지 헤더 — 모든 LOB 화면 최상단의 같은 골격.
 *
 * ★**왜 이것이 라이브러리에 있나**: 이 골격은 화면마다 손으로 다시 짜인다. 손으로 짜면
 *   ⑴제목 크기가 화면마다 달라지고 ⑵액션 정렬이 미묘하게 어긋나고 ⑶좁은 화면 규칙이
 *   빠진다. 셋 다 개별로는 사소해 보이지만, 화면을 옮겨 다니는 사용자에게는 *"제품이
 *   하나로 만들어지지 않았다"* 로 읽힌다.
 *
 * ```html
 * <u-page-header title="주문 G-2026-I-0629" subtitle="2026-02-24 접수" back="/orders">
 *   <span slot="status"><!-- 배지 --></span>
 *   <span slot="actions"><!-- 버튼 --></span>
 * </u-page-header>
 * ```
 *
 * 오버라이드: `part`(host·back·heading·title·subtitle·status·actions) + slot 치환.
 * 값은 전부 토큰을 경유한다 — 리터럴을 두면 소비자가 밀도를 바꿀 수 없다.
 */
@customElement('u-page-header')
export class PageHeader extends StyledElement<ElementParts> {
  static styles = [super.styles, styles];

  /** 페이지 제목. 타입 스케일의 `display` 단을 쓴다. */
  @property({ type: String }) title = '';
  /** 제목 아래 보조 설명. 없으면 렌더하지 않는다. */
  @property({ type: String }) subtitle?: string;
  /**
   * 뒤로가기 링크 주소. 주면 제목 왼쪽에 `← 목록` 형태로 나온다.
   * ⚠텍스트는 `backLabel` 또는 locale 레지스트리로 바꾼다.
   */
  @property({ type: String }) back?: string;
  /**
   * 뒤로가기 링크 문구. 비우면 locale 레지스트리 값, 그것도 없으면 **영어**(`Back`).
   * ⚠이 패키지는 범용 층이라 특정 언어를 기본값으로 가질 수 없다 —
   * 한국어는 `registerLocale('ko', { back: '뒤로' })` 로 소비자가 등록한다.
   */
  @property({ type: String, attribute: 'back-label' }) backLabel = '';
  /** 언어 태그. 비우면 `setDefaultLocale()` 값, 그것도 없으면 영어. */
  @property({ type: String }) locale = '';

  /**
   * 슬롯 배정 상태. ★CSS 로는 알 수 없다 — `<slot>` 자신이 자식이라 `:has(*)` 가
   * 항상 참이다(실브라우저로 확인). 빈 배지 자리가 남으면 제목 위치가 화면마다 달라진다.
   */
  @state() private hasStatus = false;
  @state() private hasActions = false;

  render() {
    return html`
      ${this.back
        ? html`<a class="back" part="back" href=${this.back}>${this.backLabel || getLocaleStrings(this.locale || undefined).back}</a>`
        : nothing}
      <div class="heading" part="heading">
        <div class="title-row">
          <h1 class="title" part="title">${this.title}</h1>
          <span class="status ${this.hasStatus ? '' : 'empty'}" part="status">
            <slot name="status"
              @slotchange=${(e: Event) => (this.hasStatus = slotHasContent(e.target as HTMLSlotElement))}
            ></slot>
          </span>
        </div>
        ${this.subtitle
          ? html`<p class="subtitle" part="subtitle">${this.subtitle}</p>`
          : nothing}
      </div>
      <div class="actions ${this.hasActions ? '' : 'empty'}" part="actions">
        <slot name="actions"
          @slotchange=${(e: Event) => (this.hasActions = slotHasContent(e.target as HTMLSlotElement))}
        ></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'u-page-header': PageHeader;
  }
}

// React JSX.IntrinsicElements 증강 — 이 파일 안에 직접 둔다(선언 번들러가
// 다른 파일에서 값으로 아무것도 쓰지 않는 side-effect import를 트리셰이킹해
// deep-import 소비자에게 증강이 안 닿는 문제를 겪었다, `ISSUE-modern-app-
// 20260812-*` 재오픈 절 참조 — 같은 파일 안의 선언은 그 문제가 없다).
declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'u-page-header': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        title?: string;
        subtitle?: string;
        back?: string;
        'back-label'?: string;
        locale?: string;
      };
    }
  }
}
