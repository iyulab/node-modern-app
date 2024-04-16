import type { LitElement } from "lit";
import type { ComponentType } from "react";
import ReactDOM from "react-dom";
import { ReactComponent } from "./ReactComponent";
import React from "react";
import { Router } from "./router/Router";

export interface BaseRoute {
  path?: string;
  children?: Route[];
}

export interface ElementRoute extends BaseRoute {
  element?: LitElement;
}

export interface ComponentRoute extends BaseRoute {
  component?: ComponentType;
}

export type Route = ElementRoute | ComponentRoute;

export interface Breadcrumb {
  icon?: string;
  display?: string;
}

export interface Header {
  logo?: string;
  title?: string;
  breadcrumbs?: Record<string, Breadcrumb>;

  // actions
  help?: string;
  user?: string;
  locale?: string;
}

export interface Menu {
  icon?: string;
  display?: string;
  children?: Menu[];
}

export interface Sidebar {
  mainMenu?: Menu[];
  subMenu?: Menu[];
}

export interface Layout {
  base?: string;
  routes?: Route[];
  breakPoint?: BreakPoint;
  header?: Header;
  sidebar?: Sidebar;
}

export type AppTheme = 'light' | 'dark';

export type ScreenSize = 'small' | 'middle' | 'large';

export type BreakPoint = {
  [L in ScreenSize]: number;
}

export class UTestApp {
  private static theme = 'light';
  private static screen = 'large';
  private static router: Router;
  private static routes: Route[] = [];
  private static breakpoint: BreakPoint;
  
  public static load(layouts: Layout | Layout[]) {
    if (Array.isArray(layouts)) {
      layouts.forEach(layout => {
        const basePath = layout.base;
        console.log(basePath);
      });
    } else {
      const layout = layouts;
      console.log(layout);
    }
    const root = document.getElementById('root');
    ReactDOM.render(React.createElement(ReactComponent), root);
  }

  public static toggleTheme() {
    
  }
}