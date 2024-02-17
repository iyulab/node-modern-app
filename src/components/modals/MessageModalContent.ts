import { LitElement, TemplateResult, css, html } from 'lit'
import { customElement, property, query } from 'lit/decorators.js'

import '@iyulab/u-components/components/button';
import { UModalContent } from '@iyulab/u-components/components/modal';

/**
 * 메시지 대화 상자 옵션
 */
export interface MessageDialogOptions {
  /**
   * 다이얼로그 제목
   * @default 메시지
   */
  title?: string;
  /**
   * 다이얼로그 헤더(title, close) 표시 여부
   * @default false
   */
  noHeader?: boolean;
  /**
   * 확인 버튼 텍스트, undefined일 경우 표시하지 않음
   * @default "확인"
   */
  positive?: string;
  /**
   * 취소 버튼 텍스트, undefined일 경우 표시하지 않음
   * @default "취소"
   */
  negative?: string;
  /**
   * 글꼴 옵션
   */
  font?: MessageContentFont;
}

/**
 * 메시지 대화 상자 글꼴 옵션
 */
interface MessageContentFont {
  /**
   * 글꼴 크기
   * @default "18px"
   */
  size?: string;
  /**
   * 글꼴 두께
   * @default "normal"
   */
  weight?: string;
  /**
   * 글꼴 스타일
   * @default "normal"
   */
  style?: string;
  /**
   * 글꼴 색상
   * @default "currentColor"
   */
  color?: string;
}

@customElement('message-modal-content')
export class MessageModalContent extends UModalContent implements MessageDialogOptions {

  @query('.message') content!: HTMLDivElement;

  @property({ attribute: false }) message?: string | HTMLElement | TemplateResult | LitElement;
  @property({ attribute: false }) font?: MessageContentFont;
  @property({ type:String }) positive: string = "확인";
  @property({ type:String }) negative: string = "취소";
  
  constructor(options?: MessageDialogOptions) {
    super();
    if (options) Object.assign(this, options);
  }

  protected async updated(changedProperties: any) {
    super.updated(changedProperties);
    await this.updateComplete;

    if (changedProperties.has("font") && this.font) {
      this.content.style.fontSize = this.font.size || "18px";
      this.content.style.fontWeight = this.font.weight || "normal";
      this.content.style.fontStyle = this.font.style || "normal";
      // this.content.style.color = this.font.color || "currentColor";
    }
  }

  render() {
    return html`
      <div class="message">
        ${this.message}
      </div>
      <u-button-group gap="10px">
        ${this.negative ? html`
          <u-button
            theme="default"
            text=${this.negative}
            @click=${() => this.cancel()}
          ></u-button>`
        : html``}
        ${this.positive ? html`
          <u-button
            theme="primary"
            text=${this.positive}
            @click=${() => this.confirm()}
          ></u-button>` 
        : html``}
      </u-button-group>
    `;
  }

  private async confirm() {
    this.requestConfirm("confirm");
  }

  private async cancel() {
    this.requestCancle("cancel");
  }

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .message {
      margin: 0;
      font-size: 18px;
      font-weight: normal;
      font-style: normal;
    }
  `;
}