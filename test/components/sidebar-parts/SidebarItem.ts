import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement('sidebar-item')
export class SidebarItem extends LitElement {
  
  @property({ type: String }) user?: string;

  render() {
    return html`
      
    `;
  }

  static styles = css`
    
  `;

}