import { observable, IObservableValue } from 'mobx';

import type { Route } from "./router/Model";
import type { HeaderModel } from "./layouts/Header";
import type { SidebarModel } from "./layouts/Sidebar";

import "./settings/UComponentsSetup";
import { Router } from "./router/Router";
import { ULayout } from "./layouts/Layout";
import { UNotfound } from './layouts/Notfound';

export type AppScreen = 'small' | 'medium' | 'large';

export type BreakPoint = {
  [L in AppScreen]: number;
}

export interface AppConfig {
  basepath?: string;
  routes: Route[];
  breakPoint?: BreakPoint;
  header?: HeaderModel;
  sidebar?: SidebarModel;
}

export class App {
  private static breakpoint: BreakPoint = { small: 768, medium: 1024, large: 1440 };
  public static readonly screen: IObservableValue<AppScreen> = observable.box('large');
  public static router?: Router;
  
  public static async load(config: AppConfig) {
    this.dispose();
    
    // 브라우저 사이즈 설정
    this.breakpoint = config.breakPoint || this.breakpoint;
    this.onResize();
    window.addEventListener('resize', this.onResize);

    // 레이아웃 설정
    const layout = new ULayout();
    layout.basepath = config.basepath || '/';
    layout.header = config.header;
    layout.sidebar = config.sidebar;
    document.body.appendChild(layout);
    await layout.updateComplete;

    // 라우터 설정
    this.router = new Router({
      rootElement: layout,
      notfound: UNotfound,
      basepath: config.basepath || '/',
      routes: config.routes,
    });
    this.router.connect();
  }

  public static dispose() {
    // 브라우저 이벤트 해제
    window.removeEventListener('resize', this.onResize);

    // 레이아웃 해제
    const layout = document.body.querySelector('u-layout');
    if(layout) document.body.removeChild(layout);

    // 라우터 해제
    this.router?.disconnect();
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