import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { autorun } from 'mobx';
import { convertReact } from '@iyulab/u-components/utils';

import { App, type AppScreen } from '../App';

@customElement('u-sidebar')
export class USidebar extends LitElement {
  
  @property({ type: Boolean, reflect: true }) open: boolean = false;
  @property({ type: String }) screen?: AppScreen;
  @property({ type: Object }) header?: string | typeof LitElement;
  @property({ type: Object }) footer?: string | typeof LitElement;
  @property({ type: Array }) menuItem?: any[];

  protected async firstUpdated(changedProperties: any) {
    super.firstUpdated(changedProperties);
    await this.updateComplete;
    autorun(() => {
      this.open = App.openSidebar.get();
    });
  }

  render() {
    return html`
      <slot name="header"></slot>
      <div class="menu">
        ${this.renderMenuItems()}
      </div>
      <slot name="footer"></slot>
    `;
  }

  private renderMenuItems() {
    return this.menuItem?.map((item: any) => {
      return html`
        <u-link href=${item.href}>${item.title}</u-link>
      `;
    });
  }

  static styles = css`
    :host {
      position: relative;
      display: block;
      width: 260px;
      height: 100%;
    }
  `;
}

export const Sidebar = convertReact({
  elementClass: USidebar,
  tagName: 'u-sidebar',
});