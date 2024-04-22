import { observable, IObservableValue } from 'mobx';

import type { Route } from "./router/Route";
import type { HeaderModel } from "./layouts/Header.model";
import type { SidebarModel } from "./layouts/Sidebar.model";

import "./settings/UComponentsSetup";
import { Router } from "./router/Router";
import { ULayout } from "./layouts/Layout";

export interface AppConfig {
  basepath?: string;
  routes: Route[];
  breakPoint?: BreakPoint;
  header?: HeaderModel;
  sidebar?: SidebarModel;
}

export type AppTheme = 'light' | 'dark' | 'system';

export type AppScreen = 'small' | 'medium' | 'large';

export type BreakPoint = {
  [L in AppScreen]: number;
}

export class App {
  private static breakpoint: BreakPoint = { small: 768, medium: 1024, large: 1440 };

  public static readonly theme: IObservableValue<AppTheme> = observable.box('system');
  public static readonly screen: IObservableValue<AppScreen> = observable.box('large');
  public static router?: Router;
  
  public static async load(config: AppConfig) {
    this.dispose();
    
    window.addEventListener('resize', this.onResize);

    const theme = localStorage.getItem('theme') as AppTheme;
    this.changeTheme(theme || 'system');
    this.breakpoint = config.breakPoint || this.breakpoint;

    const layout = new ULayout();
    layout.basepath = config.basepath || '/';
    layout.header = config.header;
    layout.sidebar = config.sidebar;
    document.body.appendChild(layout);
    await layout.updateComplete;

    this.router = new Router({
      root: layout,
      basepath: config.basepath || '/',
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
    this.theme.set(theme);
    localStorage.setItem('theme', theme);

    // 운영체제 테마 설정
    if (theme === 'system') {
      const media = window.matchMedia('(prefers-color-scheme: dark)');
      theme = media.matches ? 'dark' : 'light';
      media.removeEventListener('change', this.onChangeColorScheme);
      media.addEventListener('change', this.onChangeColorScheme);
    }
    document.documentElement.classList.toggle("sl-theme-dark", theme === 'dark');
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

  private static onChangeColorScheme = (e: MediaQueryListEvent) => {
    const theme = e.matches ? 'dark' : 'light';
    this.changeTheme(theme);
  }
  
}