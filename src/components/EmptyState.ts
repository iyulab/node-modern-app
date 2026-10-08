import { html, nothing } from 'lit';
import { property, state, customElement } from 'lit/decorators.js';

import { StyledElement } from '../internals/StyledElement.js';
import { slotHasContent } from '../internals/slotted.js';
import { getLocaleStrings } from '../internals/locale.js';
import { styles } from './EmptyState.styles.js';

type ElementParts = 'host' | 'icon' | 'message' | 'title' | 'description' | 'actions';

/** 빈 상태가 전하는 사실 — 다음 행동이 갈린다(`EmptyState.variant` 참조). */
export type EmptyStateVariant = 'no-data' | 'no-results' | 'error' | 'no-access' | 'not-found';

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
 *
 * <u-empty-state variant="error" .description=${error.message}>
 *   <u-button slot="actions" @click=${retry}>Try again</u-button>
 * </u-empty-state>
 *
 * <!-- 라우트 가드가 막았다(403) — 장애가 아니라 권한의 사실이다. -->
 * <u-empty-state variant="no-access"></u-empty-state>
 *
 * <!-- 주소가 아무것도 가리키지 않는다(404) — 다음 행동은 주소 확인 · 돌아가기. -->
 * <u-empty-state variant="not-found"></u-empty-state>
 * ```
 *
 * `app.load()` 에 `fallback` 을 주지 않으면 라우팅 실패가 이 요소로 그려진다 — 403 `no-access` · 404 `not-found` ·
 * 그 밖 `error`(오류 메시지가 설명).
 *
 * ⚠**기본 문구는 영어다** — 이 패키지는 범용 층이라 특정 언어를 기본값으로 가질 수 없다.
 * 한국어 표는 내장돼 있고(언어는 `Locale.set()`), 다른 언어는 `modernAppLocale.register(lang, …)` 로 소비자가 등록한다. 화면별로 덮으려면
 * `title`·`description` 을 준다.
 *
 * ★이 줄은 «한국어다»라고 적혀 있었고 **같은 파일의 `locale` 프로퍼티 주석이 «영어다»라고
 * 말하고 있었다** — 로케일 이주(0.9.0) 때 클래스 주석만 낡은 것이다. 이 JSDoc 은
 * `dist/**.d.ts` 로 게시되므로, 소비자는 **사실과 반대인 문장**을 읽고 있었다.
 */
@customElement('u-empty-state')
export class EmptyState extends StyledElement<ElementParts> {
  static styles = [super.styles, styles];

  /**
   * `no-data` = 아직 없음 / `no-results` = 조건에 맞는 것이 없음 / `error` = 불러오지 못함 /
   * `no-access` = 있지만 이 사용자에게 보여 줄 수 없음(라우트 가드의 거부 · 403) /
   * `not-found` = 주소가 가리키는 화면이 없음(404).
   * 다섯은 다음 행동이 다르다(만들기 · 조건 바꾸기 · 다시 시도 · 권한 요청 · 주소 확인) — `error` 의 제목은 보조기기에 알린다(`role="alert"`).
   * `no-access`·`not-found` 는 알리지 않는다 — 장애가 아니라 화면의 내용이고, 라우트 완료 때 본문으로 가는 포커스가 그것을 읽게 한다.
   */
  @property({ type: String, reflect: true }) variant: EmptyStateVariant = 'no-data';
  /** 제목. 비우면 variant 기본 문구. */
  @property({ type: String }) title = '';
  /** 보조 설명. 비우면 variant 기본 문구. */
  @property({ type: String }) description = '';
  /**
   * 언어 태그 — 이 요소만 문서와 다른 언어로 쓸 때. 비우면 `Locale` 의 활성 로케일.
   * ⚠기본 문구는 영어다 — 이 패키지는 범용 층이라 특정 언어를 기본값으로 가질 수 없다.
   * 한국어 표는 내장돼 있다 — 다른 언어는 `modernAppLocale.register(lang, …)` 로 소비자가 등록한다.
   */
  @property({ type: String }) locale = '';

  /** 액션 슬롯 배정 상태 — CSS `:has()` 로는 알 수 없다(`internals/slotted.ts` 참조). */
  @state() private hasActions = false;

  private get defaults() {
    const t = getLocaleStrings(this.locale || undefined);
    switch (this.variant) {
      case 'error': return { icon: '⚠️', title: t.errorTitle, description: t.errorDescription };
      case 'no-access': return { icon: '🔒', title: t.noAccessTitle, description: t.noAccessDescription };
      case 'not-found': return { icon: '🧭', title: t.notFoundTitle, description: t.notFoundDescription };
      case 'no-results': return { icon: '🔍', title: t.noResultsTitle, description: t.noResultsDescription };
      default: return { icon: '📄', title: t.noDataTitle, description: t.noDataDescription };
    }
  }

  render() {
    const d = this.defaults;
    const description = this.description || d.description;
    return html`
      <div class="icon" part="icon" aria-hidden="true">
        <slot name="icon">${d.icon}</slot>
      </div>
      <!-- 오류는 경보다 — 그 범위는 이 상태가 전하는 사실 전체(제목 + 사유)다. 사유가 다음 행동(다시 시도 · 권한 요청 ·
           조건 고치기)을 가르므로 제목만 읽히면 듣는 사람이 다른 사실을 받는다. 행동 슬롯은 밖. -->
      <div class="message" part="message" role=${this.variant === 'error' ? 'alert' : nothing}>
        <p class="title" part="title">${this.title || d.title}</p>
        ${description ? html`<p class="description" part="description">${description}</p>` : nothing}
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
    'u-empty-state': EmptyState;
  }
}
