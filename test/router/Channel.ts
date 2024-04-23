import { LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { createElement } from "react";

import type { RouteInfo } from './Model';
import { App } from '../App';

@customElement('lit-channel')
export class LitChannel extends LitElement {
  protected routeInfo?: RouteInfo = App.router?.routeInfo;
}

export function ReactChannel(ReactComponent: React.ComponentType<RouteInfo>) {
  return function WithReactComponent() {
    const routeInfo: RouteInfo | undefined = App.router?.routeInfo;
    return createElement(ReactComponent, routeInfo);
  }
}
