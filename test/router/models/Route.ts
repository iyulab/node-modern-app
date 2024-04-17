import type { LitElement } from "lit";
import type { ComponentType } from "react";

export interface IndexRoute {
  index: true;
}

export interface NonIndexRoute {
  index?: false;
  path: string;
}

export type BaseRoute = (IndexRoute | NonIndexRoute) & {
  children?: Route[];
  loader?: () => Promise<any>;
  fallback?: typeof LitElement | ComponentType;
};

export type ElementRoute = BaseRoute & {
  element: typeof LitElement;
}

export type ComponentRoute = BaseRoute & {
  component: ComponentType;
}

export type Route = ElementRoute | ComponentRoute;
