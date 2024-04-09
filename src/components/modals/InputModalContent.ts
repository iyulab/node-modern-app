import { css, html, LitElement, TemplateResult } from 'lit'
import { customElement, query, property } from 'lit/decorators.js'

import '@iyulab/u-components/components/input';
import { type UInputType, UInput } from '@iyulab/u-components/components/form';
import '@iyulab/u-components/components/button';
import { UModalContent } from '@iyulab/u-components/components/modal';

/**
 * 입력 대화 상자 옵션
 */
export interface InputDialogOptions {
  /**
   * 다이얼로그 제목
   * @default 입력 대화 상자
   */
  title?: string;
  /**
   * 다이얼로그 헤더(title, close) 표시 여부
   * @default false
   */
  noHeader?: boolean;
  /**
   * 입력 대화 상자 메시지
   * @default "다음 내용을 입력하세요."
   */
  message?: string | HTMLElement | TemplateResult | LitElement;
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
}

@customElement('input-modal-content')
export class InputModalContent extends UModalContent {

  @query('u-input') input!: UInput;

  @property({ type:String }) type: UInputType = "text";
  @property({ attribute: false }) message: string | HTMLElement | TemplateResult | LitElement = "다음 내용을 입력하세요.";
  @property({ type:String }) positive: string = "확인";
  @property({ type:String }) negative: string = "취소";
  
  constructor(options?: InputDialogOptions) {
    super();
    if(options) Object.assign(this, options);
  }

  render() {
    return html`
      <div class="message">
        ${this.message}
      </div>
      <u-input
        .type=${this.type}
        .autofocus=${true}
        required
      ></u-input>
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
    const isValid = this.input.checkValidity();
    if(!isValid) return;
    this.requestConfirm(this.input.value);
  }

  private async cancel() {
    this.requestCancel('cancel');
  }

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
  `;
}