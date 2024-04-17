import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement('u-link')
export class ULink extends LitElement {

  @property({ type: String }) href?: string;
  @property({ type: Boolean }) external = false;

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('click', this.handleClickEvent);
  }

  disconnectedCallback() {
    this.removeEventListener('click', this.handleClickEvent);
    super.disconnectedCallback();
  }

  render() {
    return html`
      <slot></slot>
    `;
  }

  private handleClickEvent = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    if (!this.href) return;
    
    if (this.external) {
      window.open(this.href, '_blank');
    } else {
      window.history.pushState({}, '', this.href);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  }

  static styles = css`
    :host {
      display: contents;
    }
  `;
}