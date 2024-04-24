import { observable, IObservableValue } from 'mobx';

import type { Route } from "./router/Model";
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

export type AppScreen = 'small' | 'medium' | 'large';

export type BreakPoint = {
  [L in AppScreen]: number;
}

export class App {
  private static breakpoint: BreakPoint = { small: 768, medium: 1024, large: 1440 };
  public static readonly screen: IObservableValue<AppScreen> = observable.box('large');
  public static router?: Router;
  
  public static async load(config: AppConfig) {
    this.dispose();
    
    this.breakpoint = config.breakPoint || this.breakpoint;
    this.onResize();
    window.addEventListener('resize', this.onResize);

    const layout = new ULayout();
    layout.basepath = config.basepath || '/';
    layout.header = config.header;
    layout.sidebar = config.sidebar;
    document.body.appendChild(layout);
    await layout.updateComplete;

    this.router = new Router({
      rootElement: layout,
      basepath: config.basepath || '/',
      routes: config.routes,
    });
    this.router.connect();
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