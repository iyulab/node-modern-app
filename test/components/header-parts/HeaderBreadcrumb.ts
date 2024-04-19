import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

import { RouteInfo } from "../../router/Route";
import { App } from "../../App";

export type BreadCrumbValue = string | ((match:string) => Promise<string>);
export interface BreadcrumbModel { [key: string]: BreadCrumbValue }

@customElement('header-breadcrumb')
export class HeaderBreadcrumb extends LitElement {
  
  @property({ type: Object }) model?: BreadcrumbModel;
  @property({ type: String }) pathname?: string;

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('route-changed', this.onChangeRoute);
  }

  disconnectedCallback() {
    document.removeEventListener('route-changed', this.onChangeRoute);
    super.disconnectedCallback();
  }

  render() {    
    return html`
      <u-breadcrumb>
        <u-breadcrumb-item @click=${() => App.router?.goBase()}>
          <u-icon type="system" name="home" slot="prefix"></u-icon>
          <u-icon type="system" name="chevron-right" slot="separator"></u-icon>
          Home
        </u-breadcrumb-item>

        <u-breadcrumb-item>Application Center</u-breadcrumb-item>
        <u-breadcrumb-item>Application List</u-breadcrumb-item>
        <u-breadcrumb-item>An Application</u-breadcrumb-item>
      </u-breadcrumb>
    `;
  }

  private renderItem() {
    return html`
      <u-breadcrumb-item>
        <u-icon type="system" name="home" slot="prefix"></u-icon>
        <u-icon type="system" name="chevron-right" slot="separator"></u-icon>
        Home
      </u-breadcrumb-item>
    `;
  }

  private onChangeRoute = (event: any) => {
    const routeInfo = event.detail as RouteInfo;
    this.pathname = routeInfo.pathname;
  }

  static styles = css`
    
  `;

}