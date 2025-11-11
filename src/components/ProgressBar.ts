import { html } from 'lit';
import { property } from 'lit/decorators.js';

import { BaseElement } from '@iyulab/components/dist/components/BaseElement.js';
import { styles } from './ProgressBar.styles.js';

/**
 * ProgressBar 컴포넌트는 진행 상태를 시각적으로 표시합니다.
 * 로딩 상태나 작업 진행률을 표시하는데 사용됩니다.
 */
export class ProgressBar extends BaseElement {
  static styles = [ super.styles, styles ];
  static dependencies: Record<string, typeof BaseElement> = {};

  /** 불확정 상태 (로딩 애니메이션 표시) */
  @property({ type: Boolean, reflect: true }) indeterminate = false;
  /** 최소값 (기본값: 0) */
  @property({ type: Number }) minValue = 0;
  /** 최대값 (기본값: 100) */
  @property({ type: Number }) maxValue = 100;
  /** 현재값 */
  @property({ type: Number }) value = 0;

  connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('role', 'progressbar');
  }

  protected updated(changedProperties: Map<string, unknown>): void {
    super.updated(changedProperties);

    if (changedProperties.has('value')) {
      this.updateProgress(changedProperties.get('value') as number, this.value);
      this.setAttribute('aria-valuenow', this.value.toString());
    }
    if (changedProperties.has('minValue')) {
      this.updateProgress(this.value, this.value);
      this.setAttribute('aria-valuemax', this.maxValue.toString());
    }
    if (changedProperties.has('maxValue')) {
      this.updateProgress(this.value, this.value);
      this.setAttribute('aria-valuemin', this.minValue.toString());
    }

    if (changedProperties.has('indeterminate')) {
      this.updateProgress(this.value, this.value);
      if (this.indeterminate) {
        this.removeAttribute('aria-valuenow');
        this.setAttribute('aria-busy', 'true');
      } else {
        this.removeAttribute('aria-busy');
      }
    }
  }

  render() {
    return html`<slot></slot>`;
  }

  /** 진행 상태 업데이트 */
  private updateProgress(from: number, to: number) {
    if (this.indeterminate) return;

    const clamped = Math.min(Math.max(to, this.minValue), this.maxValue);
    const progress = (clamped - this.minValue) / (this.maxValue - this.minValue);

    if (from < to) {
      // 진행 상태가 증가할 때
      this.style.transform = `scaleX(${progress})`;
      
      // 진행상태가 최대치에 도달했을 경우 fade out 처리
      if (to >= this.maxValue) {
        setTimeout(() => {
          this.style.opacity = '0';
        }, 300);
      }
    } else {
      // 처음부터 다시 시작
      this.style.opacity = '0';
      this.style.transform = `scaleX(0)`;

      // 다음 프레임에서 transition을 다시 적용
      setTimeout(() => {
        this.style.opacity = '1';
        this.style.transform = `scaleX(${progress})`;
      }, 300);
    }
  }
}