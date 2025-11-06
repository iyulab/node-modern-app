import { html } from 'lit';
import { property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import { UElement } from '@iyulab/components/dist/internals/UElement.js';
import { styles } from './ProgressBar.styles.js';

/**
 * ProgressBar 컴포넌트는 진행 상태를 시각적으로 표시합니다.
 * 로딩 상태나 작업 진행률을 표시하는데 사용됩니다.
 */
export class ProgressBar extends UElement {
  static styles = [ super.styles, styles ];

  /** 진행률 (0-100) */
  @property({ type: Number }) value = 0;
  /** 불확정 상태 (로딩 애니메이션 표시) */
  @property({ type: Boolean, reflect: true }) indeterminate = false;
  /** 높이 (px) */
  @property({ type: Number }) height = 4;
  /** 진행률 바 색상 */
  @property({ type: String }) color = '#2563eb';

  render() {
    const width = Math.min(100, Math.max(0, this.value));
    
    return html`
      <div 
        class="progress-bar" 
        style="height: ${this.height}px"
        role="progressbar"
        aria-valuenow="${ifDefined(this.indeterminate ? undefined : this.value)}"
        aria-valuemin="0"
        aria-valuemax="100"
      >
        <div 
          class="progress-bar__fill ${this.indeterminate ? 'indeterminate' : ''}"
          style="width: ${this.indeterminate ? '100%' : `${width}%`}; background-color: ${this.color}"
        ></div>
      </div>
    `;
  }
}