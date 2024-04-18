import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement('group-menu')
export class GroupMenu extends LitElement {
  
  @property({ type: String }) user?: string;

  render() {
    return html`
      
    `;
  }

  static styles = css`
    
  `;

}