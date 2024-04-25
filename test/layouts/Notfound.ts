import { LitElement, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('u-notfound')
export class UNotfound extends LitElement {

  render() {
    return html`
      <u-icon
        type="system"
        name="alert-danger"
      ></u-icon>
      <div class="message">
        페이지를 찾을 수 없습니다.
      </div>
      <u-button 
        theme="text"
        size="large"
        @click=${() => window.history.back()}
      >
        뒤로가기
      </u-button>
    `;
  }

  static styles = css`
    :host {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
      justify-content: center;
      user-select: none;
    }

    u-icon {
      color: var(--sl-color-red-500);
      font-size: 48px;
    }

    .message {
      font-size: 18px;
      line-height: 1.5;
    }
  `
}
