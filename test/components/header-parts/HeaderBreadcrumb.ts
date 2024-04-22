import { LitElement, css, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";

import { RouteInfo } from "../../router/Route";
import { App } from "../../App";
import { until } from "lit/directives/until.js";

export type BreadCrumbValue = string | ((match:string) => Promise<string>);
export interface BreadcrumbModel { [key: string]: BreadCrumbValue }

@customElement('header-breadcrumb')
export class HeaderBreadcrumb extends LitElement {
  private regexes: { regex: RegExp, value: BreadCrumbValue }[] = [];
  
  @property({ type: Object }) model?: BreadcrumbModel;
  @property({ type: String }) pathname: string = window.location.pathname;

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('route-change', this.onChangeRoute);
  }

  disconnectedCallback() {
    document.removeEventListener('route-change', this.onChangeRoute);
    super.disconnectedCallback();
  }

  protected async firstUpdated(changedProperties: any) {
    super.firstUpdated(changedProperties);
    await this.updateComplete;

    if (changedProperties.has('model') && this.model) {
      const keys = Object.keys(this.model);
      this.regexes = keys.map(key => ({
        regex: new RegExp(key),
        value: this.model![key]
      }));
    }
  }

  render() {    
    return html`
      <u-breadcrumb>
        ${this.renderBaseItem()}
        ${until(this.renderItem(), nothing)}
      </u-breadcrumb>
    `;
  }

  private renderBaseItem() {
    if (this.pathname === App.router?.basepath) return nothing;
    return html`
      <u-breadcrumb-item @click=${() => App.router?.goBase()}>
        <u-icon type="system" name="home" slot="prefix"></u-icon>
        <u-icon type="system" name="chevron-right" slot="separator"></u-icon>
        Home
      </u-breadcrumb-item>
    `;
  }

  private async renderItem() {
    const pathnames = this.pathname.split('/').filter((_, index) => index > 0); // 0번째 세그먼트는 무시
    const items = await Promise.all(pathnames.map(async (rawPathname, index) => {
      const pathname = decodeURI(rawPathname);
      const path = pathnames.slice(0, index + 1).join('/');
      const customPathname = await this.findName(pathname);
      const isLast = index === pathnames.length - 1;
  
      return html`
        <u-breadcrumb-item @click=${() => App.router?.go(path)}>
          ${customPathname}
          ${!isLast ? html`<u-icon type="system" name="chevron-right" slot="separator"></u-icon>` : nothing}
        </u-breadcrumb-item>
      `;
    }));
  
    return items;
  }

  private async findName(pathname: string) {
    for (const { regex, value } of this.regexes) {
      if (regex.test(pathname)) {
        return typeof value === 'function' ? await value(pathname) : value;
      }
    }
    return pathname;
  }

  private onChangeRoute = (event: Event) => {
    const routeInfo = (event as CustomEvent).detail as RouteInfo;
    this.pathname = routeInfo.pathname;
  }

  static styles = css`
    :host {
      overflow: hidden;
    }
  `;

}