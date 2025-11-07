import { html } from 'lit';
import { property } from 'lit/decorators.js';

import { UElement } from '@iyulab/components/dist/internals/UElement.js';
import { styles } from './ProgressBar.styles.js';

/**
 * ProgressBar 컴포넌트는 진행 상태를 시각적으로 표시합니다.
 * 로딩 상태나 작업 진행률을 표시하는데 사용됩니다.
 */
export class ProgressBar extends UElement {
  static styles = [ super.styles, styles ];
  static dependencies: Record<string, typeof UElement> = {};

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
      this.updateProgress();
      this.setAttribute('aria-valuenow', this.value.toString());
    }
    if (changedProperties.has('minValue')) {
      this.updateProgress();
      this.setAttribute('aria-valuemax', this.maxValue.toString());
    }
    if (changedProperties.has('maxValue')) {
      this.updateProgress();
      this.setAttribute('aria-valuemin', this.minValue.toString());
    }

    if (changedProperties.has('indeterminate')) {
      this.updateProgress();
      if (this.indeterminate) {
        this.setAttribute('aria-busy', 'true');
        this.removeAttribute('aria-valuenow');
      } else {
        this.removeAttribute('aria-busy');
      }
    }
  }

  render() {
    return html`<slot></slot>`;
  }

  /** 진행 상태 업데이트 */
  private updateProgress() {
    if (this.indeterminate) return;
    const clamped = Math.min(Math.max(this.value, this.minValue), this.maxValue);
    const progress = (clamped - this.minValue) / (this.maxValue - this.minValue);
    this.style.transform = `scaleX(${progress})`;
  }
}