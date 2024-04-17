import type { LitElement } from "lit";
import type { ComponentType } from "react";
import { Router } from "./router/core/Router";
import { Route } from "./router/models/Route";

export interface Breadcrumb {
  icon: string;
  display: string;
}

export interface Header {
  logo?: string;
  title?: string;
  breadcrumbs?: Record<string, Breadcrumb | string>;
  help?: string;
  locale?: string;
  user?: string;
  actions?: (ComponentType | LitElement)[];
}

export interface Menu {
  icon?: string;
  display?: string;
  children?: Menu[];
}

export interface Sidebar {
  header?: ComponentType | LitElement;
  footer?: ComponentType | LitElement;
  mainMenu?: Menu[];
  subMenu?: Menu[];
}

export interface Shell {
  base?: string;
  routes?: Route[];
  layout?: ComponentType | LitElement;
  header?: Header;
  sidebar?: Sidebar;
  breakPoint?: BreakPoint;
}

export type AppTheme = 'light' | 'dark';

export type ScreenSize = 'small' | 'medium' | 'large';

export type BreakPoint = {
  [L in ScreenSize]: number;
}

export class UTestApp {
  private static theme: AppTheme;
  private static screen: ScreenSize;
  private static breakpoint: BreakPoint;

  private static _currentShell: Shell;
  private static shell: Shell | Shell[];
  private static router: Router;
  
  public static async load(shell: Shell | Shell[]) {
    this.dispose();
    
    if (Array.isArray(shell)) {

      shell.forEach(s => {
        s.base ||= '/';
        s.base = s.base.startsWith('/') ? s.base : '/' + s.base;
      });
    } else {
      shell.base ||= '/';
      shell.base = shell.base.startsWith('/') ? shell.base : '/' + shell.base;
      this.router.setRoutes([
        {
          index: true,
          component: shell.layout as ComponentType,
          children: shell.routes || [],
        }
      ], document.body);
    }
    const currentPathname = window.location.pathname;
    const shell = this.findShell(currentPathname);
    if (shell) {
      this.router.setRoutes(shell.routes || [], document.body);
    } else {
      throw new Error('Shell not found');
    }
  }

  public static dispose() {
     
  }

  private static findShell(pathname: string) {
    if (Array.isArray(this.shell)) {
      return this.shell.find(s => pathname.startsWith(s.base || '/'));
    } else {
      return this.shell.base === pathname ? this.shell : undefined;
    }
  }

  private static onPopState() {
    const pathname = window.location.pathname;
    const shell = this.findShell(pathname);
    if (shell !== this._currentShell) {
      this.router.setRoutes(shell.routes || [], document.body);
    }
  }

  private static changeShell() {

  }

  private static onResize() {

  }

  public static toggleTheme() {
    
  }
  
}