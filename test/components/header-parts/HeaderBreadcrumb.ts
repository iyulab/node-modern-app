import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

export type BreadCrumbValue = string | ((match:string) => Promise<string>);
export interface Breadcrumb {
  [key: string]: BreadCrumbValue;
}

@customElement('header-breadcrumb')
export class HeaderBreadcrumb extends LitElement {
  
  @property({ type: Object }) breadcrumb?: Breadcrumb;

  render() {
    return html`
      <u-breadcrumb>
        <u-breadcrumb-item>Home</u-breadcrumb-item>
        <u-breadcrumb-item>Application Center</u-breadcrumb-item>
        <u-breadcrumb-item>Application List</u-breadcrumb-item>
        <u-breadcrumb-item>An Application</u-breadcrumb-item>
      </u-breadcrumb>
    `;
  }

  static styles = css`
    
  `;

}