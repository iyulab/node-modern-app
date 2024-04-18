import { Router } from "./router/core/Router";
import { Route } from "./router/models/Route";
import { ULayout } from "./layouts/Layout";
import { observable, IObservableValue } from 'mobx';
import { HeaderConfig } from "./layouts/Header.model";
import { SidebarConfig } from "./layouts/Sidebar.model";

export interface AppConfig {
  routes: Route[];
  basepath?: string;
  breakPoint?: BreakPoint;
  header?: HeaderConfig;
  sidebar?: SidebarConfig;
}

export type AppTheme = 'light' | 'dark';

export type AppSize = 'small' | 'medium' | 'large';

export type BreakPoint = {
  [L in AppSize]: number;
}

export class App {
  private static breakpoint: BreakPoint = { small: 768, medium: 1024, large: 1440 };

  public static theme: IObservableValue<AppTheme> = observable.box('light');
  public static size: IObservableValue<AppSize> = observable.box('medium');
  public static router?: Router;
  
  public static async load(config: AppConfig) {
    this.dispose();
    
    const layout = new ULayout();
    document.body.appendChild(layout);

    this.router = new Router({
      root: layout,
      basepath: config.basepath,
      routes: config.routes,
    });

    window.addEventListener('resize', this.onResize);
  }

  public static dispose() {
    const layout = document.querySelector('u-layout');
    if(layout) document.body.removeChild(layout);

    this.router = undefined;

    window.removeEventListener('resize', this.onResize);
  }

  public static toggleTheme() {
    
  }

  private static onResize = async () => {
    const width = window.innerWidth;
    const size = this.size.get();
    if (size !== 'small' && 
      width <= this.breakpoint.small
    ) {
      this.size.set('small');
    } else if (size !== 'medium' &&
      (width > this.breakpoint.small && width <= this.breakpoint.medium)
    ) {
      this.size.set('medium');
    } else if (size !== 'large' &&
      width > this.breakpoint.large
    ) {
      this.size.set('large');
    }
  }
  
}