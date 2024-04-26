import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { DirectiveResult } from "lit/async-directive.js";
import { until } from "lit/directives/until.js";
import { t } from "@iyulab/u-components/localization";

import type { RouteInfo } from "../../router/Model";
import { App } from "../../App";

export interface BreadcrumbItem {
  icon: string;
  display: string;
}
export type BreadcrumbItemLoader = (match: string) => Promise<string | BreadcrumbItem>;
export type BreadcrumbValue = string | BreadcrumbItem | BreadcrumbItemLoader | DirectiveResult;
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
        ${until(
          this.renderItem(this.pathname), 
          html`<u-spinner size="24px"></u-spinner>`
        )}
      </u-breadcrumb>
    `;
  }

  private renderBaseItem() {
    return html`
      <u-breadcrumb-item @click=${() => App.router?.go(this.basepath || App.router.basepath)}>
        <u-icon type="system" name="home" slot="prefix"></u-icon>
        <u-icon type="system" name="chevron-right" slot="separator"></u-icon>
        ${t("app::home")}
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
      const icon = typeof item === 'object' && item.icon ? item.icon : undefined;
      const display = typeof item === 'object' && item.display ? item.display : item;
  
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

  // Breadcrumb 모델을 Regex로 변환하여 저장
  private setValue(model: BreadcrumbModel) {
    this.regexes = Object.entries(model).map(([key, value]) => {
      const regex = new RegExp(key);
      return { key: regex, value };
    });
  }

  // pathname에 매칭되는 Breadcrumb Value를 반환
  private async getValue(pathname: string) {
    for (const { key, value } of this.regexes) {
      if (key.test(pathname)) {
        return typeof value === 'function' ? await value(pathname) : value;
      }
    }
    return pathname;
  }

  // Route 변경 이벤트 핸들러 - basepath와 pathname을 업데이트
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