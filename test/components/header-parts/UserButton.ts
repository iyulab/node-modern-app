import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

export interface UserConfig {
  name?: string;
  avatar?: string;
}

@customElement('user-button')
export class UserButton extends LitElement {
  
  @property({ type: Object }) user?: UserConfig;

  render() {
    return html`
      
    `;
  }

  static styles = css`
    
  `;

}