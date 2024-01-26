import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { FlyoutElement, Position } from './FlyoutElement';

import { VectorIcons } from '../../layouts/VectorIcons';

export interface Notification {
  id: number;
  title: string;
  content: string;
  date?: Date;
  read: boolean;
}

@customElement('notification-menu')
export class NotificationMenu extends FlyoutElement {
  keepHover: boolean = true;
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
            <div class="title">Notification</div>
            <div class="count">${this.items.filter((i) => {
              if (i.read === false) return i;
              else return null;
              }).length}</div>
            <div class="flex"></div>
            <div class="delete" @click=${this.deleteAll}>Delete All</div>
            <div class="delete" @click=${this.deleteRead}>Delete Read</div>
          </div>
          <div class="body">
          ${this.items.length > 0
            ? this.items.map(i => html`
              <div class="item">
                <div class=${`main ${i.read ? "read" : ''}`} @click=${() => this.readItem(i.id)}>
                  <div class="title">${i.title}</div>
                  <div class="content" title=${i.content}>${i.content}</div>
                  <div class="date">${i.date ? this.formatDate(i.date) : null}</div>
                </div>
                <div class="delete" @click=${() => this.deleteItem(i.id)}>
                  <svg class="icon" viewBox="0 0 24 24">
                    <path d=${VectorIcons.trash}></path>
                  </svg>
                </div>
              </div>
            `)
            : html`<div class="empty">There is no notification</div>`
          }
          </div>
      </div>
    `;
  }

  private async getUserInfo() {
    this.items = [
      {
        id: 1,
        title: '길이 테스트용입니다. ㄴㄴㄴㄴㄴㄴㄴㄴㄴsssㄴㄴㄴㄴㄴㄴㄴㄴㄴ',
        content: '첫 번째 알림 길이테스트입니다.ㅁㄴㅇㄴㅁㅇㅁㄴ차처챵ㅊㄴ마ㅡㅊㅋㅌ,ㅡ차트ㅏ킅챠ㅐㅁ차ㅣㅇ추카티추먕추ㅏㅣㅋ추애ㅣ차퉄차ㅣ',
        date: new Date(2022, 10, 10),
        read: false
      },
      {
        id: 2,
        title: '두 번째 알림입니다.',
        content: '두 번째 알림 내용입니다.',
        date: new Date(2023, 7, 10),
        read: false
      },
      {
        id: 3,
        title: '세 번째 알림입니다.',
        content: '세 번째 알림 내용입니다.',
        date: new Date(2023, 9, 10),
        read: false
      },
      {
        id: 4,
        title: '네 번째 알림입니다.',
        content: '네 번째 알림 내용입니다.',
        date: new Date(2023, 9, 16, 10),
        read: false
      },
      {
        id: 5,
        title: '다섯 번째 알림입니다.',
        content: '다섯 번째 알림 내용입니다.',
        date: new Date(2023, 9, 16, 12, 33, 50),
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

  // UTC시간을 현재 시간과의 차이를 계산하여 표시
  private formatDate(utc: Date): string {
    const now = new Date();
    const locale = navigator.language;
    // UTC를 클라이언트 로컬 시간으로 변환
    const clientLocalDate = new Date(utc.getTime() - utc.getTimezoneOffset() * 60000); 
    const timeDiffSec = Math.floor((now.getTime() - clientLocalDate.getTime()) / 1000);
    const dateFormatted = this.formatDateToFullDate(clientLocalDate);

    if(timeDiffSec < 60) {
      return `${timeDiffSec} seconds ago - ${dateFormatted} ${locale}`; // 1분 미만인 경우
    } else if(timeDiffSec < 3600) {
      const minutes = Math.floor(timeDiffSec / 60); // 1시간 미만인 경우
      return `${minutes} minutes ago - ${dateFormatted} ${locale}`;
    } else if(timeDiffSec < 86400) {
      const hours = Math.floor(timeDiffSec / 3600); // 1시간 이상인 경우
      return `${hours} hours ago - ${dateFormatted} ${locale}`;
    } else if(timeDiffSec < 2592000) {
      const days = Math.floor(timeDiffSec / 86400); // 1일 이상인 경우
      return `${days} days ago - ${dateFormatted} ${locale}`;
    } else if(timeDiffSec < 31536000) {
      const months = Math.floor(timeDiffSec / 2592000); // 한달 이상인 경우
      return `${months} months ago - ${dateFormatted} ${locale}`;
    } else {
      const years = Math.floor(timeDiffSec / 31536000); // 1년 이상인 경우
      return `${years} years ago - ${dateFormatted} ${locale}`;
    }
  }

  // date "yyyy/MM/dd hh:mm" 형식 변환 (클라이언트 로컬 시간 기준)
  private formatDateToFullDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    return `${year}/${month}/${day} ${hours}:${minutes}`;
  }

  static styles = css`
    .container {
      margin: 5px;
      width: 400px;
      background-color: var(--surface-card);
      border-radius: 5px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
      user-select: none;
    }

    .header {
      padding: 7px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 10px;
      border-bottom: 2px solid #ccc;

      .title {
        font-size: 16px;
        font-weight: bold;
      }

      .count {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 10px;
        height: 10px;
        padding: 4px;
        border-radius: 50%;
        background-color: red;
        color: white;
        font-size: 12px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .flex {
        flex-grow: 1;
      }

      .delete {
        font-size: 14px;
        color: var(--alpha-80);
        cursor: pointer;

        &:hover {
          opacity: 0.6;
        }

        &:active {
          opacity: 0.8;
        }
      }
    }

    .body {
      display: flex;
      flex-direction: column;
      height: 350px;
      overflow-x: hidden;
      overflow-y: auto;

      .item {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        border-bottom: 1px solid #ccc;
        cursor: pointer;

        .main {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 2px;
          padding: 5px;
          overflow: hidden;

          .title {
            color: var(--primary-text);
            font-size: 16px;
            font-weight: bold;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
  
          .content {
            color: var(--alpha-80);
            font-size: 12px;
            overflow: hidden;
            display: -webkit-box; /* for box-orient 레거시 */
            -webkit-line-clamp: 2; /* 두 줄로 제한 */
            -webkit-box-orient: vertical;
            text-overflow: ellipsis;
            white-space: normal;
          }
  
          .date {
            color: var(--alpha-30);
            font-size: 10px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          &.read {
            .title {
              font-weight: normal;
              color: #999;
            }
  
            .content {
              color: #999;
            }

            .date {
              color: #999;
            }
          }
        }
    
        .delete {
          display: none;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          width: 30px;
          height: 100%;

          .icon {
            width: 20px;
            height: 20px;
            fill: var(--primary-text);
            fill-rule: evenodd;
          }

          &:hover {
            background-color: #ff00004d;
          }
        }

        &:hover {
          background-color: var(--ui-subtle-hover);

          .delete {
            display: flex;
          }
        }

        &:last-child {
          border-bottom: none;
        }
      }

      .empty {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #999;
        font-size: 16px;
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