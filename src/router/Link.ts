import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { convertReact } from "@iyulab/u-components/utils";
import { combinePath } from "./Utils";

@customElement('u-link')
export class ULink extends LitElement {

  /**
   * - 속성을 정의하지 않으면 basepath로 이동합니다.
   * - http 로 시작하면 새로운 페이지를 로드합니다.
   * - 절대경로일 경우 basepath로 시작하면 클라이언트 라우팅을 합니다. 그렇지 않으면 새로운 페이지를 로드합니다.
   * - 상대경로로 시작하면 (현재의 basepath + 상대경로)로 클라이언트 라우팅을 합니다.
   * - ?로 시작하면 현재 경로에 쿼리스트링을 추가하고, 클라이언트 라우팅을 합니다.
   * - #으로 시작하면 현재 경로에 해시를 추가하고, hashchange 이벤트를 발생시킵니다.
   */
  @property({ type: String }) href?: string;

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
   * - 등록되지 않은 경로는 새로운 페이지로 이동합니다.
   */
  private handleClickEvent = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    const basepath = window.history.state?.basepath || '';
    if (!this.href) {
      window.history.pushState({ basepath: basepath }, '', basepath);
      window.dispatchEvent(new PopStateEvent('popstate'));  
    } else if (this.href.startsWith('http')) {
      window.location.href = this.href;
    } else if (this.href.startsWith('/')) {
      if (this.href.startsWith(basepath)) {
        window.history.pushState({ basepath: basepath }, '', this.href);
        window.dispatchEvent(new PopStateEvent('popstate'));  
      } else {
        window.location.href = this.href;
      }
    } else if (this.href.startsWith('?')) {
      window.history.pushState({ basepath: basepath }, '', window.location.pathname + this.href);
      window.dispatchEvent(new PopStateEvent('popstate'));
    } else if (this.href.startsWith('#')) {
      window.history.pushState({ basepath: basepath }, '', window.location.pathname + window.location.search + this.href);
      window.dispatchEvent(new HashChangeEvent('hashchange'));
    } else {
      window.history.pushState({ basepath: basepath }, '', combinePath(basepath, this.href));
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