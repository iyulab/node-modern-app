import { LitElement, css, html, nothing } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { ComponentType, createElement } from 'react';
import ReactDOM from 'react-dom';

import { convertReact } from '@iyulab/u-components/utils';

@customElement('u-outlet')
export class UOutlet extends LitElement {

  @state() outlet?: LitElement | ComponentType;
  @state() element?: LitElement;

  protected async updated(changedProperties: any) {
    super.updated(changedProperties);
    await this.updateComplete;

    if (changedProperties.has('outlet') && this.outlet) {
      if (this.outlet instanceof LitElement) {
        const Outlet = this.outlet.constructor as new () => LitElement;
        this.element = new Outlet();
      } else {
        const main = this.querySelector('main');
        ReactDOM.render(createElement(this.outlet), main);
      }
    }
  }

  override connectedCallback() {
    super.connectedCallback();
  }
  
  override disconnectedCallback() {
    super.disconnectedCallback();
  }

  render() {
    return html`
      <main>
        ${this.element ?? nothing}
      </main>
    `
  }

  static styles = css`
    main {
      display: contents;
    }
  `;
  
}

export const Outlet = convertReact({
  elementClass: UOutlet,
  tagName: 'u-outlet',  
});