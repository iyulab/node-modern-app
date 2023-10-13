import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('notification-menu')
export class NotificationMenu extends LitElement {

  static styles = css`
    .menu-container {
      position: relative;
      overflow: hidden;
    }

    .notification-button {
      cursor: pointer;
    }

    .notification-list {
      display: block;
      position: absolute;
      top: 100%;
      right: 0;
      width: 200px;
      border: 1px solid #ccc;
      background-color: #fff;
    }
  `;

  @property({ type: Array })
  notifications = [
    '첫 번째 알림 메시지입니다.',
    '두 번째 알림 메시지입니다.'
  ];

  render() {
    return html`
      <div class="menu-container">
        <button class="notification-button">
          알림
        </button>
        <div class="notification-list">
          ${this.notifications.map((notification) => html`
            <div class="notification-item">${notification}</div>
          `)}
        </div>
      </div>
    `;
  }
}