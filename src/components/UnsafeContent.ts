import { property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

import { BaseElement } from '@iyulab/components/dist/components/BaseElement.js';
import { styles } from './UnsafeContent.styles.js';

/** Raw HTML content */
export interface UnsafeContentConfig {
  type: 'content';
  content: string;
}

/**
 * 일반 HTML 콘텐츠를 표시하는 사이드바 컴포넌트
 */
export class UnsafeContent extends BaseElement {
  static styles = [ super.styles, styles ];
  static dependencies: Record<string, typeof BaseElement> = {};

  /** HTML 콘텐츠 */
  @property({ type: String }) content?: string;
  
  render() {
    return unsafeHTML(this.content);
  }
}