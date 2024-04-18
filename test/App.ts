import { observable, IObservableValue } from 'mobx';

import type { Route } from "./router/Route";
import type { HeaderConfig } from "./layouts/Header.model";
import type { SidebarConfig } from "./layouts/Sidebar.model";

import "./settings/UComponentsSetup";
import { Router } from "./router/Router";
import { ULayout } from "./layouts/Layout";

export interface AppConfig {
  routes: Route[];
  basepath?: string;
  breakPoint?: BreakPoint;
  header?: HeaderConfig;
  sidebar?: SidebarConfig;
}

export type AppTheme = 'light' | 'dark' | 'system';

export type AppScreen = 'small' | 'medium' | 'large';

export type BreakPoint = {
  [L in AppScreen]: number;
}

export class App {
  private static breakpoint: BreakPoint = { small: 768, medium: 1024, large: 1440 };

  public static theme: IObservableValue<AppTheme> = observable.box('system');
  public static screen: IObservableValue<AppScreen> = observable.box('large');
  public static openSidebar: IObservableValue<boolean> = observable.box(true);
  public static router?: Router;
  
  public static async load(config: AppConfig) {
    this.dispose();
    
    window.addEventListener('resize', this.onResize);

    const theme = localStorage.getItem('theme') as AppTheme;
    this.changeTheme(theme || 'system');

    const layout = new ULayout();
    layout.header = config.header;
    layout.sidebar = config.sidebar;
    document.body.appendChild(layout);

    this.router = new Router({
      root: layout,
      basepath: config.basepath,
      routes: config.routes,
    });
  }

  public static dispose() {
    window.removeEventListener('resize', this.onResize);

    const layout = document.body.querySelector('u-layout');
    if(layout) document.body.removeChild(layout);

    this.router = undefined;
  }

  public static go(pathname: string) {
    this.router?.go(pathname);
  }

  public static changeTheme(theme: AppTheme) {
    localStorage.setItem('theme', theme);
    if (theme === 'system') {
      const media = window.matchMedia('(prefers-color-scheme: dark)');
      theme = media.matches ? 'dark' : 'light';
    }
    document.documentElement.classList.toggle("sl-theme-dark", theme === 'dark');
    this.theme.set(theme);
  }

  public static toggleSidebar() {
    this.openSidebar.set(!this.openSidebar.get());
  }

  private static onResize = async () => {
    const width = window.innerWidth;
    const screen = this.screen.get();
    if (screen !== 'small' && 
      width <= this.breakpoint.small
    ) {
      this.screen.set('small');
    } else if (screen !== 'medium' &&
      (width > this.breakpoint.small && width <= this.breakpoint.medium)
    ) {
      this.screen.set('medium');
    } else if (screen !== 'large' &&
      width > this.breakpoint.large
    ) {
      this.screen.set('large');
    }
  }
  
}