import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";

import { RouteInfo } from "../../router/Model";
import { App } from "../../App";
import { until } from "lit/directives/until.js";

export interface BreadcrumbItem {
  icon: string;
  display: string;
}
export type BreadcrumbItemLoader = (match: string) => Promise<string | BreadcrumbItem>;
export type BreadcrumbValue = string | BreadcrumbItem | BreadcrumbItemLoader;
export interface BreadcrumbModel { [key: string]: BreadcrumbValue }

@customElement('header-breadcrumb')
export class HeaderBreadcrumb extends LitElement {
  private regexes: { key: RegExp, value: BreadcrumbValue }[] = [];
  
  @state() basepath?: string;
  @state() pathname?: string;

  @property({ type: Object }) model?: BreadcrumbModel;

  connectedCallback() {
    super.connectedCallback();
    if (this.model) this.setValue(this.model);
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
      this.setValue(this.model);
    }
  }

  render() {    
    if (!this.pathname) return nothing;

    return html`
      <u-breadcrumb>
        ${this.renderBaseItem()}
        ${until(this.renderItem(this.pathname), nothing)}
      </u-breadcrumb>
    `;
  }

  private renderBaseItem() {
    return html`
      <u-breadcrumb-item @click=${() => App.router?.go(this.basepath || App.router.basepath)}>
        <u-icon type="system" name="home" slot="prefix"></u-icon>
        <u-icon type="system" name="chevron-right" slot="separator"></u-icon>
        Home
      </u-breadcrumb-item>
    `;
  }

  private async renderItem(pathname: string) {
    if (!this.pathname) return nothing;
    const pathnames = pathname.split('/');
    const items = await Promise.all(pathnames.map(async (rawPathname, index) => {
      const path = pathnames.slice(0, index + 1).join('/');
      const isLast = index === pathnames.length - 1;

      const item = await this.getValue(decodeURI(rawPathname));
      const icon = typeof item === 'object' ? item.icon : undefined;
      const display = typeof item === 'object' ? item.display : item;
  
      return html`
        <u-breadcrumb-item @click=${() => App.router?.go(path)}>
          ${icon ? html`<u-icon name=${icon} slot="prefix"></u-icon>` : nothing}
          ${!isLast ? html`<u-icon type="system" name="chevron-right" slot="separator"></u-icon>` : nothing}
          ${display}
        </u-breadcrumb-item>
      `;
    }));
  
    return items;
  }

  private setValue(model: BreadcrumbModel) {
    this.regexes = Object.entries(model).map(([key, value]) => {
      const regex = new RegExp(key);
      return { key: regex, value };
    });
  }

  private async getValue(pathname: string) {
    for (const { key, value } of this.regexes) {
      if (key.test(pathname)) {
        return typeof value === 'function' ? await value(pathname) : value;
      }
    }
    return pathname;
  }

  private onChangeRoute = (event: Event) => {
    const routeInfo = (event as CustomEvent).detail as RouteInfo;
    this.basepath = routeInfo.basepath;
    this.pathname = routeInfo.pathname.replace(routeInfo.basepath, '').replace(/^\//, '');
  }

  static styles = css`
    :host {
      overflow: hidden;
    }
  `;

}