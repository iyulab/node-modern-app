import { observable, IObservableValue } from 'mobx';

import type { Route } from "./router/Model";
import type { HeaderModel } from "./layouts/Header";
import type { SidebarModel } from "./layouts/Sidebar";

import "./settings/UComponentsSetup";
import { ULocalizer, ULocalizerConfig, t } from '@iyulab/u-components/localization';
import { en, ko } from "./locales";
import { Router } from "./router/Router";
import { ULayout } from "./layouts/Layout";
import { UNotfound } from './layouts/Notfound';
import { ULoader } from './layouts/Loader';

export type AppScreen = 'small' | 'medium' | 'large';

export type BreakPoint = {
  [L in AppScreen]: number;
}

export interface AppConfig {
  basepath?: string;
  routes: Route[];
  locale?: ULocalizerConfig;
  breakPoint?: BreakPoint;
  header?: HeaderModel;
  sidebar?: SidebarModel;
}

export class App {
  private static config: AppConfig;
  private static breakpoint: BreakPoint = { small: 768, medium: 1024, large: 1440 };
  public static readonly screen: IObservableValue<AppScreen> = observable.box('large');
  public static router?: Router;
  
  /**
   * 어플리케이션 로드
   */
  public static async load(config: AppConfig) {
    const loader = new ULoader();
    loader.start();

    // 설정 저장 및 이전 설정 해제
    this.config = config;
    this.unload();
    loader.step(0.1, t('app::setConfig'));

    // 언어 설정
    await ULocalizer.init(config.locale);
    ULocalizer.addResources({ en, ko });
    loader.step(0.3, t('app::setLanguage'));
    
    // 브라우저 사이즈 설정
    this.breakpoint = config.breakPoint || this.breakpoint;
    this.onResize();
    window.addEventListener('resize', this.onResize);
    loader.step(0.5, t('app::setScreenSize'));

    // 레이아웃 설정
    const layout = new ULayout();
    layout.basepath = config.basepath || '/';
    layout.header = config.header;
    layout.sidebar = config.sidebar;
    document.body.appendChild(layout);
    await layout.updateComplete;
    loader.step(0.7, t('app::setLayout'));

    // 라우터 설정
    this.router = new Router({
      rootElement: layout,
      notfound: UNotfound,
      basepath: config.basepath || '/',
      routes: config.routes,
    });
    this.router.connect();
    loader.step(0.9, t('app::setRouter'));

    loader.end();
  }

  /**
   * 어플리케이션 해제
   */
  public static unload() {
    // 브라우저 이벤트 해제
    window.removeEventListener('resize', this.onResize);

    // 레이아웃 해제
    const layout = document.body.querySelector('u-layout');
    if(layout) document.body.removeChild(layout);

    // 라우터 해제
    this.router?.disconnect();
    this.router = undefined;
  }

  /**
   * 어플리케이션 설정 변경 및 재로딩
   */
  public static reload(config: AppConfig) {
    this.unload();
    this.load({
      ...this.config,
      ...config
    });
  }

  /**
   * 경로 이동
   */
  public static go(pathname: string) {
    this.router?.go(pathname);
  }

  // 브라우저 사이즈 변경 이벤트 핸들러
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