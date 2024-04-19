import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

export interface UserModel {
  name?: string;
  avatar?: string;
}

@customElement('user-button')
export class UserButton extends LitElement {
  
  @property({ type: Object }) model?: UserModel;

  render() {
    return html`
      
    `;
  }

  static styles = css`
    
  `;

}