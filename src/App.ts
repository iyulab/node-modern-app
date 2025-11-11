import { observable, IObservableValue, runInAction } from 'mobx';

import { Router } from '@iyulab/router';
import { notifier } from '@iyulab/components/dist/utilities/notifier.js';
import { AlertType } from '@iyulab/components/dist/components/alert/Alert.js';
import { theme } from '@iyulab/components/dist/utilities/theme.js';
import { localizer } from '@iyulab/components/dist/utilities/localizer.js';

import type { ScreenSize } from './types/AppTypes.js';
import type { AppConfig, LayoutConfig } from './types/AppConfigs.js';
import type { DialogOptions, NotificationOptions } from './types/AppOptions.js';

/**
 * 애플리케이션 전역 상태 및 설정 관리 클래스
 */
class App {
  private static _instance: App;

  // 설정 및 상태 변수
  private _config?: AppConfig;
  private _router?: Router;
  private _root?: HTMLElement;

  // private 생성자로 외부에서 인스턴스 생성 방지
  private constructor() {
    theme.import();
  }

  /** 싱글톤 인스턴스 반환 */
  public static get instance(): App {
    if (!App._instance) {
      App._instance = new App();
    }
    return App._instance;
  }

  /** 현재 화면 크기 상태 */
  public readonly screen: IObservableValue<ScreenSize> = observable.box('large');
  /** 로딩 진행 상태 (0 - 100) */
  public readonly progress: IObservableValue<number> = observable.box(0);

  /** 현재 앱 설정 반환 */
  public get config(): AppConfig | undefined {
    return this._config;
  }
  /** 라우터 인스턴스 반환 */
  public get router(): Router | undefined {
    return this._router;
  }
  /** 테마 유틸리티 반환 */
  public get theme() {
    return theme;
  }

  /** 앱 로드 및 초기화 */
  public async load(config: AppConfig): Promise<void> {
    // 이전 설정 정리
    this.unload();

    // 설정 저장
    this._config = config;

    // 화면 크기 초기화
    window.addEventListener('resize', this.handleWindowResize);
    this.handleWindowResize(new Event('resize'));

    // 다국어 초기화
    await localizer.init(config.locales);
  
    // 레이아웃 생성
    this._root = await this.createLayout(config.layout);

    // 라우터 초기화
    this._router = new Router({
      root: this._root,
      basepath: config.basepath,
      routes: config.routes,
    });

    console.log(`✅ App loaded successfully`);
  }

  /** 앱 언로드 */
  public unload(): void {
    // 이벤트 리스너 제거
    window.removeEventListener('resize', this.handleWindowResize);

    // 레이아웃 제거
    if (this._root) {
      this._root.remove();
      this._root = undefined;
    }

    // 라우터 정리
    if (this._router) {
      this._router.destroy();
      this._router = undefined;
    }

    // 설정 초기화
    if (this._config) {
      this._config = undefined;
    }
  }

  /** 레이아웃 생성 */
  private async createLayout(config: LayoutConfig): Promise<HTMLElement> {
    // 기존 레이아웃 제거
    let layout = document.body.querySelector('[data-layout]') as HTMLElement;
    if (layout) {
      document.body.removeChild(layout);
    }

    // Sidebar 레이아웃 생성
    if (config.type === 'sidebar') {
      const { SidebarLayout } = await import('./layouts/SidebarLayout.js');
      const SbLayout = new SidebarLayout();
      SbLayout.config = config;
      layout = SbLayout;
    } else {
      throw new Error(`Unsupported layout type: ${config.type}`);
    }

    // 레이아웃을 body에 추가
    layout.setAttribute('data-layout', 'true');
    document.body.appendChild(layout);

    // 레이아웃이 완전히 렌더링될 때까지 대기
    if ('updateComplete' in layout) {
      await (layout as any).updateComplete;
    }
    return layout;
  }

  /** 페이지 이동 */
  public navigate(path: string): void {
    this._router?.go(path);
  }

  /** 성공 메시지 */
  public async success(message: string, options?: NotificationOptions): Promise<void> {
    await this.notify('success', message, options);
  }

  /** 에러 메시지 */
  public async error(message: string, options?: NotificationOptions): Promise<void> {
    await this.notify('error', message, options);
  }

  /** 경고 메시지 */
  public async warning(message: string, options?: NotificationOptions): Promise<void> {
    await this.notify('warning', message, options);
  }

  /** 정보 메시지 */
  public async info(message: string, options?: NotificationOptions): Promise<void> {
    await this.notify('info', message, options);
  }

  /** 확인 대화상자 */
  public async confirm(message: string, _options?: DialogOptions): Promise<boolean> {
    // TODO: Dialog Component 사용하여 확인 대화상자 표시
    return window.confirm(message);
  }

  /** 알림 표시 */
  private async notify(type: AlertType, message: string, options?: NotificationOptions): Promise<void> {
    await notifier.toast({
      type: type,
      content: message,
      label: options?.title,
      duration: options?.duration || 3000,
      position : options?.position || 'top-right',
    });
  }

  /** 화면 크기 변경 핸들러 */
  private handleWindowResize = (_: Event): void => {
    const width = window.innerWidth;
    const [small, medium] = this._config?.breakpoints || [768, 1024];

    runInAction(() => {
      if (width < small) {
        this.screen.set('small');
      } else if (width < medium) {
        this.screen.set('medium');
      } else {
        this.screen.set('large');
      }
    });
  };
}

/** 
 * 전역 어플리케이션 설정 및 관리 인스턴스
 */
export const app = App.instance;