import { LitElement, css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { DirectiveResult } from 'lit/async-directive.js';
import { t } from '@iyulab/u-components/localization';

@customElement('u-loader')
export class ULoader extends LitElement {

  @state() progress: number = 0;
  @state() message?: string | DirectiveResult;

  render() {
    return html`
      <u-progress-ring 
        value=${this.progress}
        size="130px"
        thickness="8px"
      ></u-progress-ring>
      <div class="message">
        ${this.message}
      </div>
    `;
  }

  public step(progress: number, message: string | DirectiveResult) {
    this.progress = progress * 100;
    this.message = message;
  }

  public start() {
    if (document.body.contains(this)) return;
    document.body.appendChild(this);
    this.step(0, t('app::startLoading'));
  }

  public end() {
    this.step(1, t('app::endLoading'));
    this.remove();
  }

  static styles = css`
    :host {
      position: fixed;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 20px;
      z-index: 1000;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background-color: rgba(0, 0, 0, 0.5);
      user-select: none;
    }

    u-progress-ring {
      color: var(--sl-color-neutral-0);
    }

    .message {
      color: var(--sl-color-neutral-0);
      font-size: 18px;
      line-height: 1.5;
      font-weight: 500;
    }
  `;
}