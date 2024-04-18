import { LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { createElement } from "react";

import type { RouteInfo } from './Route';
import { App } from '../App';

const defaultRouteInfo: RouteInfo = {
  pathname: window.location.pathname,
  params: {},
};

@customElement('lit-channel')
export class LitChannel extends LitElement {
  protected routeInfo: RouteInfo = App.router?.routeInfo || defaultRouteInfo;
}

export function ReactChannel(ReactComponent: React.ComponentType<RouteInfo>) {
  return function WithReactComponent() {
    const routeInfo: RouteInfo = App.router?.routeInfo || defaultRouteInfo;

    return createElement(ReactComponent, routeInfo);
  }
}
