import { html, nothing, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

import { UElement } from '@iyulab/components/dist/internals/UElement.js';
import { styles } from './Logo.styles.js';

/**
 * Logo 컴포넌트는 앱 로고를 표시합니다.
 */
export class Logo extends UElement {
  static styles = [ super.styles, styles ];
  static dependencies: Record<string, typeof UElement> = {};

  /** collapsed 상태 */
  @property({ type: Boolean, reflect: true }) collapsed = false;
  /** 로고 이미지 URL, HTML 또는 Template */
  @property({ type: Object }) src?: string | TemplateResult;
  /** 로고 텍스트 (이미지가 없을 때 표시) */
  @property({ type: String }) text?: string;
  /** 로고 크기 */
  @property({ type: Number }) size = 32;

  render() {
    if (this.collapsed && !this.src) {
      return nothing;
    }

    return html`
      <div class="logo" style="width: ${this.size}px; height: ${this.size}px">
        ${this.renderContent()}
      </div>
    `;
  }

  private renderContent() {
    if (this.src) {
      // TemplateResult인 경우
      if (typeof this.src !== 'string') {
        return this.src;
      }
      
      // 문자열인 경우
      const srcStr = this.src as string;
      
      // src가 URL인지 HTML 문자열인지 확인
      if (srcStr.startsWith('http') || srcStr.startsWith('/') || srcStr.startsWith('./')) {
        // URL인 경우 이미지로 표시
        return html`<img src="${srcStr}" alt="${this.text || 'Logo'}" />`;
      } else {
        // HTML 문자열인 경우 그대로 렌더링
        return html`${unsafeHTML(srcStr)}`;
      }
    } else if (this.text && !this.collapsed) {
      // 텍스트만 있는 경우
      return html`<span class="logo-text">${this.text}</span>`;
    }
    
    return nothing;
  }
}

// 커스텀 엘리먼트 정의
if (!customElements.get('app-logo')) {
  customElements.define('app-logo', Logo);
}
