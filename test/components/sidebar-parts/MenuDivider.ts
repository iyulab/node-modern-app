import { LitElement, css, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";

export interface MenuDividerModel {
  type: 'divider';
  text?: string;
  line?: boolean;
  height?: string;
}

@customElement('menu-divider')
export class MenuDivider extends LitElement {
  
  @property({ type: Boolean, reflect: true }) collapsed: boolean = false;
  @property({ type: String, reflect: true }) text?: string;
  @property({ type: Boolean }) line?: boolean;
  @property({ type: String }) height?: string;
  
  protected async updated(changedProperties: any) {
    super.updated(changedProperties);
    await this.updateComplete;

    if (changedProperties.has('height') && this.height) {
      this.style.setProperty('height', this.height);
    }
  }

  render() {
    return html`
      ${this.line ? html`<u-divider spacing="0px"></u-divider>`: nothing}
    `;
  }

  static styles = css`
    :host {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-between;
      
      --divider-height: 21px;
      height: var(--divider-height);
    }
    :host::before {
      content: '';
    }
    :host([text])::after {
      content: attr(text);
      color: var(--sl-color-gray-600);
      font-size: 14px;
      line-height: 1.5;
      padding: 0 15px;
    }
    :host([collapsed]) {
      height: calc(var(--divider-height) * 0.2);
    }
  `;

}