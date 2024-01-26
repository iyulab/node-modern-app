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
        display: none;
      }
      
      :host([show]) {
        z-index: 999;
        display: block;
        position: absolute;
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

  @property({ type: Boolean, reflect: true })
  show = true;

  busy() {
    this.show = true;
    this.hidden = false;
  }

  unbusy() {
    this.show = false;
    this.hidden = true;
  }
  
  render() {
    if (!this.show) return html``;
    
    return html`
      <div class="busy-indicator">
        <fast-progress-ring indeterminate></fast-progress-ring>
        <div>${this.message}</div>
      </div>`;
  }
  
}