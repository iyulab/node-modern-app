import { LitElement, css, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { t } from "@iyulab/components/localization";

export interface UserModel {
  name?: string;
  avatar?: string;
  email?: string;
  setting?: string;
  logout?: string;
  privacy?: string;
  terms?: string;
}

@customElement('user-button')
export class UserButton extends LitElement {
  
  @property({ type: Object }) model?: UserModel;

  @property({ type: String }) name?: string;
  @property({ type: String }) avatar?: string;
  @property({ type: String }) email?: string;
  @property({ type: String }) setting?: string;
  @property({ type: String }) logout?: string;
  @property({ type: String }) privacy?: string;
  @property({ type: String }) terms?: string;

  protected async updated(changedProperties: any) {
    super.updated(changedProperties);
    await this.updateComplete;
    
    if (changedProperties.has('model') && this.model) {
      Object.assign(this, this.model);
    }
  }

  render() {
    return html`
      <u-dropdown distance="10" placement="bottom-end">
        <div class="button" slot="trigger">
          ${this.avatar
            ? html`<img src=${this.avatar} alt="avatar" />`
            : html`<div class="name-avatar">${this.name || t("anonymous", { ns: 'app', defaultValue: 'Anonymous User' })}</div>` }
        </div>
        <div class="menu">
          <div class="profile">
            <div class="avatar">
              ${this.avatar
                ? html`<img src=${this.avatar} alt="avatar" />`
                : html`<div class="name-avatar">${this.name || t("anonymous", { ns: 'app', defaultValue: 'Anonymous User' })}</div>` }
            </div>
            <div class="info">
              <div class="name">${this.name}</div>
              ${this.email
                ? html`<div class="email">${this.email}</div>`
                : nothing }
            </div>
          </div>
          <div class="action">
            ${this.model?.setting
              ? html`
                <u-link .href=${this.model?.setting}>
                  <u-icon type="system" name="user-setting"></u-icon>
                  ${t("userSetting", { ns: 'app', defaultValue: 'Profile' })}
                </u-link>`
              : nothing }
            ${this.model?.logout
              ? html`
                <u-link .href=${this.model?.logout}>
                  <u-icon type="system" name="logout"></u-icon>
                  ${t("logout", { ns: 'app', defaultValue: 'Logout' })}
                </u-link>`
              : nothing }
          </div>
          <div class="footer">
            ${this.model?.privacy
              ? html`<u-link .href=${this.model?.privacy}>${t("privacy", { ns: 'app', defaultValue: 'Privacy Policy' })}</u-link>`
              : nothing }
            ${this.model?.terms
              ? html`<u-link .href=${this.model?.terms}>${t("terms", { ns: 'app', defaultValue: 'Terms of Service' })}</u-link>`
              : nothing }
          </div>
        </div>
      </u-dropdown>
    `;
  }

  static styles = css`
    :host {
      display: inline-flex;
    }

    .name-avatar {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      background-color: var(--sl-color-teal-500);
      border-radius: 50%;
      padding: 10px;
      box-sizing: border-box;
      overflow: hidden;
      white-space: nowrap;
      font-size: 14px;
    }

    .button {
      width: 34px;
      height: 34px;
      cursor: pointer;

      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }

    .menu {
      position: relative;
      width: 250px;
      display: flex;
      flex-direction: column;
      padding: 10px 20px;
      border-radius: 5px;
      background-color: var(--sl-color-neutral-0);
      border: 1px solid var(--sl-color-gray-200);
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }

    .profile {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 20px;

      .avatar {
        width: 60px;
        height: 60px;

        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }

      .info {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        
        .name {
          font-size: 16px;
          font-weight: 500;
          color: var(--sl-color-gray-800);
        }
        .email {
          font-size: 14px;
          font-weight: 400;
          color: var(--sl-color-gray-600);
        }
      }
    }

    .action {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      margin: 10px 0px;
      box-sizing: border-box;

      u-link {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 10px;
        padding: 5px;
        font-size: 14px;
        font-weight: 400;
        line-height: 1.5;
        box-sizing: border-box;
        color: var(--sl-color-gray-600);
        border: 1px solid var(--sl-color-gray-200);
      }
      u-link:hover {
        background-color: var(--sl-color-gray-100);
        color: var(--sl-color-primary-600);
      }
    }

    .footer {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      gap: 10px;

      u-link {
        font-size: 12px;
        line-height: 1.5;
        color: var(--sl-color-gray-500);
      }
      u-link:hover {
        color: var(--sl-color-gray-800);
      }
    }
  `;

}