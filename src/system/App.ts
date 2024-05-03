import { observable, IObservableValue } from 'mobx';

import type { Route } from "../router/Model";
import type { HeaderModel } from "../layouts/Header";
import type { SidebarModel } from "../layouts/Sidebar";
import type { ULocalizerConfig } from '@iyulab/u-components/localization';
import type { ToastPosition, AlertType } from '@iyulab/u-components/components/alert';
import type { DrawerPosition, UModalContent, UMessageDialogModel, UInputDialogConfig } from '@iyulab/u-components/components/modal';

import "../settings/UComponentsSetup";
import { ULocalizer, t } from '@iyulab/u-components/localization';
import { UAlertController } from '@iyulab/u-components/components/alert';
import { UModalController } from '@iyulab/u-components/components/modal';

import { en, ko } from "../locales";
import { Router } from "../router/Router";
import { ULayout } from "../layouts/Layout";
import { UNotfound } from '../layouts/Notfound';
import { ULoader } from '../layouts/Loader';

export interface AlertOption {
  title?: string;
  duration?: number;
  position?: ToastPosition;
}

export type AppScreen = 'small' | 'medium' | 'large';

export interface AppConfig {
  basepath?: string;
  routes: Route[];
  locale?: ULocalizerConfig;
  breakPoint?: number[];
  header?: HeaderModel;
  sidebar?: SidebarModel;
}

export class App {
  private static config: AppConfig;
  private static breakpoint: number[] = [768, 1440];
  public static readonly screen: IObservableValue<AppScreen> = observable.box('large');
  public static router?: Router;
  
  /**
   * 어플리케이션 로드
   */
  public static async load(config: AppConfig) {
    const loader = new ULoader();
    await loader.start();

    // 설정 저장 및 이전 설정 해제
    this.config = config;
    this.unload();
    await loader.step(0.1, "App Loading");

    // 언어 설정
    await ULocalizer.init(config.locale);
    ULocalizer.addResources({ en, ko });
    await loader.step(0.3, t('setLanguage', { ns: 'app', defaultValue: 'Set Language' }));
    
    // 브라우저 사이즈 설정
    this.breakpoint = config.breakPoint || this.breakpoint;
    this.onResize();
    window.addEventListener('resize', this.onResize);
    await loader.step(0.5, t('setScreenSize', { ns: 'app', defaultValue: 'Set Screen Size' }));

    // 레이아웃 설정
    const layout = new ULayout();
    layout.basepath = config.basepath || '/';
    layout.header = config.header;
    layout.sidebar = config.sidebar;
    document.body.appendChild(layout);
    await layout.updateComplete;
    await loader.step(0.7, t('setLayout', { ns: 'app', defaultValue: 'Set Layout' }));

    // 라우터 설정
    this.router = new Router({
      rootElement: layout,
      notfound: UNotfound,
      basepath: config.basepath || '/',
      routes: config.routes,
    });
    this.router.connect();
    await loader.step(0.9, t('setRouter', { ns: 'app', defaultValue: 'Set Router' }));

    await loader.end();
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
   * 경로 이동
   */
  public static go(pathname: string) {
    this.router?.go(pathname);
  }

  /**
   * 에러 메시지
   */
  public static async error(message: string, options?: AlertOption) {
    await this.toast('danger', message, options);
  }

  /**
   * 경고 메시지
   */
  public static async warn(message: string, options?: AlertOption) {
    await this.toast('warning', message, options);
  }

  /**
   * 성공 메시지
   */
  public static async success(message: string, options?: AlertOption) {
    await this.toast('success', message, options);
  }

  /**
   * 시스템 메시지
   */
  public static async system(message: string, options?: AlertOption) {
    await this.toast('neutral', message, options);
  }

  /**
   * 정보 메시지
   */
  public static async info(message: string, options?: AlertOption) {
    await this.toast('primary', message, options);
  }

  /**
   * 입력 대화상자 표시
   */
  public static async input(option?: UInputDialogConfig) {
    return await UModalController.showInputDialogAsync(option);
  }

  /**
   * 메시지 대화상자 표시
   */
  public static async message(message: string, option?: UMessageDialogModel) {
    return await UModalController.showMessageDialogAsync(message, option);
  }

  /**
   * 대화상자 표시
   * @param content UModalContent를 상속받은 컴포넌트
   */
  public static async dialog<T>(content: UModalContent) {
    return await UModalController.showDialogAsync<T>(content);
  }

  /**
   * 드로어 표시
   * @param content UModalContent를 상속받은 컴포넌트
   * @param position 드로어 위치 (기본값: 'end')
   */
  public static async drawer<T>(content: UModalContent, position?: DrawerPosition) {
    return await UModalController.showDrawerAsync<T>(content, position);
  }

  // 토스트 메시지
  private static async toast(type: AlertType, message: string, options?: AlertOption) {
    await UAlertController.toastAsync({
      type: type,
      content: message,
      label: options?.title,
      duration: options?.duration,
      position: options?.position || 'top-right',
    });
  }

  // 브라우저 사이즈 변경 이벤트 핸들러
  private static onResize = async () => {
    const width = window.innerWidth;
    const screen = this.screen.get();
    if (screen !== 'small' && 
      width <= (this.breakpoint[0] || 768)
    ) {
      this.screen.set('small');
    } else if (screen !== 'medium' &&
      (width > (this.breakpoint[0] || 768) && width <= (this.breakpoint[1] || 1440))
    ) {
      this.screen.set('medium');
    } else if (screen !== 'large' &&
      width > (this.breakpoint[1] || 1440)
    ) {
      this.screen.set('large');
    }
  }
  
}