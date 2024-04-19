import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

export interface LineDivider {
  type: 'line';
  color?: string;
}

export interface BlankDivider {
  type: 'blank';
}

export interface TextDivider {
  type: 'text';
  text: string;
}

export type MenuDividerModel = ( LineDivider | BlankDivider | TextDivider ) & {
  height?: string;
}

@customElement('menu-divider')
export class MenuDivider extends LitElement {
  
  @property({ type: Object }) model?: MenuDividerModel;

  @property({ type: String }) type?: string;

  render() {
    return html`
      <u-divider></u-divider>
    `;
  }

  static styles = css`
    
  `;

}