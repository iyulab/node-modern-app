import { LitElement, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { createElement } from "react";

import type { RouteInfo } from '../router/models/Route';
import { App } from '../App';

const defaultRouteInfo: RouteInfo = {
  pathname: window.location.pathname,
  params: {},
};

@customElement('lit-page')
export class LitPage extends LitElement {
  protected routeInfo: RouteInfo = App.router?.routeInfo || defaultRouteInfo;

  static styles = css`
    :host {
      display: block;
    }
  `;
}

export function ReactPage(PageComponent: React.ComponentType<RouteInfo>) {
  return function WithPageComponent() {
    const routeInfo: RouteInfo = App.router?.routeInfo || defaultRouteInfo;

    return createElement(PageComponent, routeInfo);
  }
}

