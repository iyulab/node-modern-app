import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { convertReact } from "@iyulab/u-components/utils";

@customElement('u-link')
export class ULink extends LitElement {

  /**
   * 링크 URL
   */
  @property({ type: String }) href?: string;

  /**
   * 외부 링크 여부
   */
  @property({ type: Boolean }) external = false;

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('click', this.handleClickEvent);
  }

  disconnectedCallback() {
    this.removeEventListener('click', this.handleClickEvent);
    super.disconnectedCallback();
  }

  render() {
    return html`
      <slot></slot>
    `;
  }

  /**
   * 클릭 이벤트 핸들러, 브라우저 히스토리를 조작하고, 히스토리 이벤트를 발생시킵니다.
  */
  private handleClickEvent = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    if (!this.href) {
      throw new Error('링크의 href 속성이 정의되지 않았습니다.');
    }
    
    if (this.external) {
      window.open(this.href, '_blank');
    } else {
      window.history.pushState({}, '', this.href);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  }

  static styles = css`
    :host {
      display: inline-flex;
      cursor: pointer;
    }
  `;
}

export const Link = convertReact({
  tagName: 'u-link',
  elementClass: ULink,
});