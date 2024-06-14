import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { convertReact } from "@iyulab/u-components/utils";

@customElement('u-page')
export class UPage extends LitElement {

  @property({ type: Boolean, reflect: true }) show: boolean = false;
  @property({ type: Boolean, reflect: true }) loading: boolean = false;
  @property({ type: Boolean, reflect: true }) isBusy: boolean = false;

  @property({ type: String }) headline?: any;

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('scroll', this.handleScroll);
  }

  disconnectedCallback() {
    this.removeEventListener('scroll', this.handleScroll);
    super.disconnectedCallback();
  }

  render() {
    return this.loading
    ? html`<u-spinner size="5vw" width="5px"></u-spinner>`
    : html`
      <!-- 페이지 타이틀 -->
      ${this.renderTitle()}

      <!-- 메인 컨텐츠 -->
      <slot></slot>

      <!-- 페이지 스크롤 버튼 -->
      <div class="elevator"
        @click=${this.scrollToTop}>
        <u-icon
          type="system"
          name="chevron-up"
          size="18px"
        ></u-icon>
      </div>

      <!-- 페이지 로딩 중 -->
      <div class="overlay">
        <u-spinner size="5vw" width="5px"></u-spinner>
      </div>
    `;
  }

  private renderTitle() {
    if (!this.headline) return;
    return html`
      <div class="title">
        ${this.headline}
      </div>
    `;
  }

  private handleScroll = () => {
    if (this.scrollTop <= 20 && this.show) {
      this.show = false;
    } else if (this.scrollTop > 20 && !this.show) {
      this.show = true;
    }
  }

  private scrollToTop = () => {
    this.scrollTo({ top: 0, behavior: 'smooth' });
  }

  static styles = css`
    :host {
      position: relative;
      width: 100%;
      height: 100%;
      display: block;
      overflow: auto;
    }
    :host::-webkit-scrollbar {
      width: 10px;
    }
    :host::-webkit-scrollbar-thumb {
      background-color: var(--sl-color-gray-500);
    }
    :host([loading]) {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    :host([show]) .elevator {
      display: flex;
    }
    :host([isBusy]) .overlay {
      display: flex;
    }

    .title {
      padding: 24px;
      font-size: 24px;
      line-height: 1;
      font-weight: 600;
    }

    .elevator {
      display: none;
      position: fixed;
      z-index: 10;
      right: 30px;
      bottom: 20px;
      width: 35px;
      height: 35px;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      background-color: var(--sl-color-neutral-0);
      box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
      cursor: pointer;
    }
    .elevator:hover u-icon {
      animation: bounce 1s ease-in-out infinite;
    }

    .overlay {
      display: none;
      position: absolute;
      z-index: 10;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: var(--sl-overlay-background-color);
      align-items: center;
      justify-content: center;
    }

    @keyframes bounce {
      0%, 100% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-5px);
      }
    }
  `;
}

export const Page = convertReact({
  elementClass: UPage,
  tagName: 'u-page',
});