import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { convertReact } from "@iyulab/u-components/utils";
import { combinePath } from "./Utils";

@customElement('u-link')
export class ULink extends LitElement {

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
   * - href 속성이 없으면 아무것도 하지 않습니다.
   * - ?로 시작하면 현재 경로에 쿼리스트링을 추가합니다.
   * - #으로 시작하면 현재 경로에 해시를 추가하고, hashchange 이벤트를 발생시킵니다.
   * - 상대경로로 시작하면 (basepath + 상대경로)를 추가합니다.
   */
  private handleClickEvent = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    if (!this.href) return;

    if (this.href.startsWith('/') || this.href.startsWith('http')) {
      window.history.pushState({}, '', this.href);
      window.dispatchEvent(new PopStateEvent('popstate'));
    } else if (this.href.startsWith('?')) {
      window.history.pushState({}, '', window.location.pathname + this.href);
      window.dispatchEvent(new PopStateEvent('popstate'));
    } else if (this.href.startsWith('#')) {
      window.history.pushState({}, '', window.location.pathname + window.location.search + this.href);
      window.dispatchEvent(new HashChangeEvent('hashchange'));
    } else {
      const basepath = window.history.state?.basepath || '';
      window.history.pushState({}, '', combinePath(basepath, this.href));
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