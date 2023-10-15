import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { FlyoutElement, Position } from './FlyoutElement';

import { trash } from '@iyulab/modern-app/layouts/IconVector';

export interface Notification {
  id: number;
  title: string;
  content: string;
  date?: Date;
  read: boolean;
}

@customElement('notification-menu')
export class NotificationMenu extends FlyoutElement {
  position: Position = Position.BottomLeft;

  @property({ type: Array })
  items: Notification[] = [];

  connectedCallback(): void {
    super.connectedCallback();
    this.getUserInfo();
  }

  render() {
    return html`
      <div class="container">
          <div class="header">
            <div class="title">알림</div>
            <div class="count">${this.items.filter((i) => {
              if (i.read === false) return i;
              else return null;
              }).length}</div>
            <div class="flex"></div>
            <div class="delete" @click=${this.deleteAll}>전체 삭제</div>
            <div class="delete" @click=${this.deleteRead}>읽음 삭제</div>
          </div>
          <div class="body">
          ${this.items.length > 0
            ? this.items.map(i => html`
              <div class="item">
                <div class=${`main ${i.read ? "read" : ''}`} @click=${() => this.readItem(i.id)}>
                  <div class="title">${i.title}</div>
                  <div class="content">${i.content}</div>
                  <div class="date">${i.date ? this.formatDate(i.date) : null}</div>
                </div>
                <div class="delete" @click=${() => this.deleteItem(i.id)}>
                  <svg class="icon" viewBox="0 0 24 24">
                    <path d=${trash}></path>
                  </svg>
                </div>
              </div>
            `)
            : html`
              <div class="empty">
                알림이 없습니다.
              </div>`
          }
          </div>
      </div>
    `;
  }

  private async getUserInfo() {
    this.items = [
      {
        id: 1,
        title: '첫 번째 알림입니다.',
        content: '첫 번째 알림 내용입니다.',
        date: new Date(),
        read: false
      },
      {
        id: 2,
        title: '두 번째 알림입니다.',
        content: '두 번째 알림 내용입니다.',
        date: new Date(),
        read: false
      },
      {
        id: 3,
        title: '세 번째 알림입니다.',
        content: '세 번째 알림 내용입니다.',
        date: new Date(),
        read: false
      },
      {
        id: 4,
        title: '네 번째 알림입니다.',
        content: '네 번째 알림 내용입니다.',
        date: new Date(),
        read: false
      },
      {
        id: 5,
        title: '다섯 번째 알림입니다.',
        content: '다섯 번째 알림 내용입니다.',
        date: new Date(),
        read: false
      }
    ];
  }

  private async readItem(id: number) {
    const item = this.items.find(item => item.id === id);
    if (item) {
      item.read = true;
    }
    this.requestUpdate();
  }

  private async deleteItem(id: number) {
    this.items = this.items.filter(item => item.id !== id);
  }

  private async deleteAll() {
    this.items = [];
  }

  private async deleteRead() {
    this.items = this.items.filter(item => !item.read);
  }

  private formatDate(date: Date): string {
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    });
  }

  static styles = css`
    .container {
      margin: 5px;
      width: 400px;
      background-color: white;
      border-radius: 5px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
      user-select: none;
    }

    .header {
      padding: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 10px;
      border-bottom: 1px solid #ccc;
      padding-bottom: 10px;

      .title {
        font-size: 20px;
        font-weight: bold;
      }

      .count {
        width: 20px;
        height: 20px;
        background-color: #ff5722;
        color: white;
        border-radius: 50%;
        padding: 5px 10px;
        font-size: 16px;
      }

      .flex {
        flex-grow: 1;
      }

      .delete {
        color: #ff5722;
        cursor: pointer;
      }
    }

    .body {
      display: flex;
      flex-direction: column;
      gap: 5px;
      margin-top: 5px;
      margin-bottom: 5px;
      margin-left: 10px;
      margin-right: 10px;
      height: 350px;
      overflow-y: auto;

      .item {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        border-bottom: 1px solid #ccc;
        padding: 10px 0;
        cursor: pointer;

        .main {
          display: flex;
          flex-direction: column;
          gap: 3px;
          width: 100%;

          .title {
            font-size: 20px;
            font-weight: bold;
          }
  
          .content {
            font-size: 14px;
          }
  
          .date {
            color: #666;
            font-size: 12px;
          }

          &.read {
            .title {
              font-weight: normal;
              color: #666;
            }
  
            .content {
              color: #999;
            }
          }
        }
    
        .delete {
          display: none;
          justify-content: center;
          align-items: center;
          color: #ff5722;
          cursor: pointer;
          width: 30px;
          height: 100%;

          .icon {
            width: 20px;
            height: 20px;

            path {
              fill: var(--primary-text);
              fill-rule: evenodd;
            }
          }

          &:hover {
            background-color: #ff5722;
          }
        }

        &:hover {
          background-color: #f5f5f5;

          .delete {
            display: flex;
          }
        }

        &:last-child {
          border-bottom: none;
        }
      }

      .empty {
        text-align: center;
        color: #999;
        padding: 20px 0;
      }

      &::-webkit-scrollbar {
        width: 16px;
      }

      &::-webkit-scrollbar-thumb {
        height: 56px;
        border-radius: 8px;
        border: 4px solid transparent;
        background-clip: content-box;
        background-color: hsl(0,0%,37%)
      }

      &::-webkit-scrollbar-thumb:hover {
        background-color: hsl(0,0%,67%)
      }
    }
    
  `;
}