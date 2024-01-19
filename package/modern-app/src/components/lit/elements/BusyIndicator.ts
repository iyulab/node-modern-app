import { css, html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { 
  fastProgressRing,
  provideFASTDesignSystem,
} from "@microsoft/fast-components";

provideFASTDesignSystem().register(
  fastProgressRing()
);

@customElement('busy-indicator')
export class BusyIndicator extends LitElement {

  static styles = [
    css`
      :host {
        z-index: 999;
      }

      :host([full]) .busy-indicator {
        position: fixed; /* 전체 화면을 커버하기 위한 스타일 */
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
      }
      
      .busy-indicator {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background: #2224;
        display: flex;
        align-items: center;
        justify-content: center;

        display: flex;
        flex-direction: column;
      }
      `
  ];

  @property({ type: String })
  message?: string;

  // 화면 전체영역을 커버합니다. <busy-indicator full></busy-indicator>
  @property({ type: Boolean, reflect: true })
  full = false;

  @property({ type: Boolean, reflect: true })
  show = true;
  
  render() {
    if (!this.show) return html``;
    
    return html`
      <div class="busy-indicator">
        <fast-progress-ring indeterminate></fast-progress-ring>
        <div>${this.message}</div>
      </div>`;
  }
  
}