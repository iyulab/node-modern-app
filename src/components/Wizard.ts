import { html, nothing, PropertyValues } from 'lit';
import { property, state, customElement } from 'lit/decorators.js';
import '@iyulab/components/dist/components/button/UButton.js';

import { StyledElement } from '../internals/StyledElement.js';
import { getLocaleStrings } from '../internals/locale.js';
import { styles } from './Wizard.styles.js';

type ElementParts = 'host' | 'indicator' | 'step' | 'panel' | 'actions';

/** 스텝 상태. `done`은 마디를 채워 표시, `error`는 위험색, `disabled`는 도달 불가로 만든다. */
export type WizardStepState = 'done' | 'error' | 'disabled';

/** 스텝 정의 — `steps` 배열의 순서가 곧 스텝 순서다. */
export interface WizardStep {
  id: string;
  label: string;
  state?: WizardStepState;
}

/** `step-change` 이벤트의 detail. */
export interface WizardStepChangeDetail {
  from: number;
  to: number;
}

/**
 * 마법사/스테퍼 — 다단계 흐름의 스텝 인디케이터 + 패널 + 전진/후진 액션.
 *
 * ★**검증(validation)과 저장/재개는 의도적으로 컴포넌트 밖이다.** 도메인 상태 관리라
 *   `lob-layers.md` §4("도메인 변환은 소비앱의 어댑터 층에 산다")와 정면으로 맞물린다.
 *   `active` 는 controlled prop — 소비자가 외부에서 영속화·복원한다(`UExpander` 의
 *   `open` 과 같은 패턴: 컴포넌트가 스스로 갱신하되, 소비자도 직접 대입할 수 있다).
 *
 * 기본 슬롯에 스텝 개수만큼 자식을 넣으면(문서 순서 = `steps` 순서) 활성 스텝만 보이고
 * 나머지는 `hidden`. `slot="actions"` 로 기본 Back/Next 버튼을 완전히 대체할 수 있다
 * ("Submit"이냐 "Next"냐는 라이브러리가 정할 도메인 어휘가 아니다 — 소비자 책임).
 *
 * ```html
 * <u-wizard .steps=${[
 *   { id: 'info', label: '기본 정보' },
 *   { id: 'payment', label: '결제', state: 'error' },
 *   { id: 'review', label: '확인' },
 * ]} active=${1}
 *   @step-change=${(e: CustomEvent<WizardStepChangeDetail>) => {
 *     if (!isValid()) e.preventDefault();
 *   }}>
 *   <section>…info 패널…</section>
 *   <section>…payment 패널…</section>
 *   <section>…review 패널…</section>
 * </u-wizard>
 * ```
 *
 * `linear`(기본 `true`)이면 인디케이터 클릭으로 미방문 스텝을 건너뛸 수 없다 — 이미 지나온
 * 스텝(또는 `state="done"`으로 명시된 스텝)으로만 돌아갈 수 있다. `linear=false`("editable")면
 * 비활성(`disabled`)이 아닌 스텝은 전부 클릭으로 바로 이동 가능.
 *
 * **접근성**: 키보드만으로 완주 가능(인디케이터는 화살표로 포커스 이동 + Enter/Space로
 * 이동, `Home`/`End`로 처음/끝 도달 가능 스텝) · 스텝 전환 시 포커스가 패널로 이동 ·
 * 상태 변화가 `aria-live="polite"` 영역으로 announce.
 *
 * 오버라이드: `part`(host·indicator·step·panel·actions) + `actions` slot 완전 치환.
 */
@customElement('u-wizard')
export class Wizard extends StyledElement<ElementParts> {
  static styles = [super.styles, styles];

  /** 스텝 정의 배열. 문서 순서로 기본 슬롯의 자식과 매칭된다. */
  @property({ type: Array, attribute: false }) steps: WizardStep[] = [];

  /** 현재 스텝 인덱스(controlled) — 소비자가 외부에서 영속화·복원할 수 있다. */
  @property({ type: Number, reflect: true }) active = 0;

  /** 인디케이터 방향. 대시보드형 앱엔 세로가 권장(리서치 근거는 계획 문서 §4). */
  @property({ type: String, reflect: true }) orientation: 'horizontal' | 'vertical' = 'vertical';

  /**
   * 순차 강제 여부. `true`(기본)면 인디케이터 클릭으로 미방문 스텝을 건너뛸 수 없다 —
   * 이미 지나온 스텝이나 `state="done"` 스텝으로만 돌아갈 수 있다. `false`면 `disabled`가
   * 아닌 모든 스텝을 클릭으로 바로 이동 가능.
   */
  @property({ type: Boolean, reflect: true }) linear = true;

  /** 언어 태그. 기본 Back/Next 라벨과 live region 문구에 쓰인다. */
  @property({ type: String }) locale = '';

  /** `aria-live` 영역에 낼 문구 — 스텝이 바뀔 때만 갱신된다. */
  @state() private announcement = '';

  protected updated(changed: PropertyValues): void {
    super.updated(changed);
    if (changed.has('active') || changed.has('steps')) {
      this.syncPanels();
    }
  }

  /** 기본 슬롯의 각 자식(문서 순서)을 `steps` 인덱스와 맞춰 활성 패널만 보이게 한다. */
  private syncPanels(): void {
    const children = Array.from(this.children).filter(el => !el.hasAttribute('slot'));
    children.forEach((el, i) => {
      (el as HTMLElement).hidden = i !== this.active;
    });
  }

  private isReachable(i: number): boolean {
    const step = this.steps[i];
    if (!step || step.state === 'disabled') return false;
    if (!this.linear) return true;
    // linear 모드에서도 "바로 다음 스텝"은 항상 갈 수 있다 — linear 가 막는 것은
    // *건너뛰기*(2단계 이상 앞으로)이지, next() 자체가 아니다. 그 외엔 이미 지나온
    // 스텝(뒤로) 이거나 명시적으로 done 으로 표시된 스텝만 허용.
    return i <= this.active + 1 || step.state === 'done';
  }

  private nextReachable(from: number, dir: 1 | -1): number {
    for (let i = from + dir; i >= 0 && i < this.steps.length; i += dir) {
      if (this.isReachable(i)) return i;
    }
    return -1;
  }

  /** 다음 스텝으로. 도달 가능한 스텝이 없으면(마지막 스텝) 아무 일도 하지 않는다. */
  public next(): boolean {
    return this.goTo(this.active + 1);
  }

  /** 이전 스텝으로. */
  public back(): boolean {
    return this.goTo(this.active - 1);
  }

  /**
   * 임의 스텝으로 이동. `step-change`(취소 가능)가 막히면(`preventDefault()`) 이동하지
   * 않고 `false`를 돌려준다.
   */
  public goTo(i: number): boolean {
    if (i < 0 || i >= this.steps.length || i === this.active || !this.isReachable(i)) return false;
    const from = this.active;
    if (!this.fire<WizardStepChangeDetail>('step-change', { detail: { from, to: i } })) return false;
    this.active = i;
    this.announceStep(i);
    void this.moveFocusToPanel();
    return true;
  }

  private announceStep(i: number): void {
    const step = this.steps[i];
    const t = getLocaleStrings(this.locale || undefined);
    this.announcement = t.wizardStepAnnouncement(i + 1, this.steps.length, step?.label ?? '');
  }

  private async moveFocusToPanel(): Promise<void> {
    await this.updateComplete;
    (this.renderRoot.querySelector('[part="panel"]') as HTMLElement | null)?.focus();
  }

  private handleTabKeydown = (e: KeyboardEvent, i: number) => {
    const horizontal = this.orientation === 'horizontal';
    const nextKey = horizontal ? 'ArrowRight' : 'ArrowDown';
    const prevKey = horizontal ? 'ArrowLeft' : 'ArrowUp';
    let target = -1;
    if (e.key === nextKey) target = this.nextReachable(i, 1);
    else if (e.key === prevKey) target = this.nextReachable(i, -1);
    else if (e.key === 'Home') target = this.nextReachable(-1, 1);
    else if (e.key === 'End') target = this.nextReachable(this.steps.length, -1);
    else return;
    e.preventDefault();
    if (target !== -1) {
      (this.renderRoot.querySelectorAll('[part="step"]')[target] as HTMLElement | undefined)?.focus();
    }
  };

  private renderStep(step: WizardStep, i: number) {
    const isActive = i === this.active;
    const reachable = this.isReachable(i);
    return html`
      <button type="button"
        class="step ${isActive ? 'active' : ''} ${step.state ? `state-${step.state}` : ''}"
        part="step"
        role="tab"
        id="tab-${i}"
        aria-selected=${isActive ? 'true' : 'false'}
        aria-controls="panel"
        aria-disabled=${!reachable ? 'true' : nothing}
        tabindex=${isActive ? '0' : '-1'}
        ?disabled=${step.state === 'disabled'}
        @click=${() => this.goTo(i)}
        @keydown=${(e: KeyboardEvent) => this.handleTabKeydown(e, i)}
      >
        <span class="marker" aria-hidden="true">${step.state === 'done' ? '✓' : i + 1}</span>
        <span class="label">${step.label}</span>
      </button>
    `;
  }

  render() {
    const t = getLocaleStrings(this.locale || undefined);
    const isLast = this.active >= this.steps.length - 1;
    return html`
      <div class="indicator" part="indicator" role="tablist" aria-orientation=${this.orientation}>
        ${this.steps.map((step, i) => this.renderStep(step, i))}
      </div>
      <div class="content">
        <div class="panel" part="panel" tabindex="-1" id="panel" aria-labelledby="tab-${this.active}">
          <slot @slotchange=${() => this.syncPanels()}></slot>
        </div>
        <div class="actions" part="actions">
          <slot name="actions">
            <u-button variant="ghost" ?disabled=${this.active === 0} @click=${() => this.back()}>
              ${t.wizardBack}
            </u-button>
            ${isLast ? nothing : html`
              <u-button color="primary" @click=${() => this.next()}>${t.wizardNext}</u-button>
            `}
          </slot>
        </div>
        <div class="announcement" aria-live="polite" role="status">${this.announcement}</div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'u-wizard': Wizard;
  }
}
