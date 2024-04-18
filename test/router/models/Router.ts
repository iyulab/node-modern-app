import type { ULayout } from "../../layouts/Layout";
import type { Route } from "./Route";

export interface RouterConfig {
  root: ULayout;
  basepath?: string;
  routes: Route[];
  fallback?: any;
}
