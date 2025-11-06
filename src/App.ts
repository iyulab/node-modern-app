import { observable, IObservableValue } from 'mobx';

import { Router } from '@iyulab/router';
import { notifier } from '@iyulab/components/dist/utilities/notifier.js';
import { AlertType } from '@iyulab/components/dist/components/alert/Alert.js';
import { importTheme, setTheme } from '@iyulab/components/dist/utilities/theme.js';
import type { UTheme } from '@iyulab/components/dist/utilities/theme.js';

import type { ScreenSize } from './types/AppTypes.js';
import type { AppConfig } from './types/AppConfigs.js';
import type { DialogOptions, NotificationOptions } from './types/AppOptions.js';

/**
 * App 클래스, 싱글톤으로 앱 전체를 관리합니다.
 */
export class App {
  private static _instance: App;

  // 설정
  private _config?: AppConfig;
  private _router?: Router;
  private _layoutElement?: HTMLElement;

  // 반응형 상태
  public readonly screen: IObservableValue<ScreenSize> = observable.box('large');
  public readonly theme: IObservableValue<UTheme> = observable.box('light');
  public readonly isLoading: IObservableValue<boolean> = observable.box(false);

  // 브레이크포인트 기본값 [small, medium]
  private breakpoints: [number, number] = [768, 1280];

  private constructor() {
    // private 생성자로 외부에서 인스턴스 생성 방지
    importTheme();
  }

  /**
   * 싱글톤 인스턴스 반환
   */
  public static get instance(): App {
    if (!App._instance) {
      App._instance = new App();
    }
    return App._instance;
  }

  /**
   * 앱 설정 getter
   */
  public get config(): AppConfig | undefined {
    return this._config;
  }

  /**
   * 앱 로드 및 초기화
   */
  public async load(config: AppConfig): Promise<void> {
    this.isLoading.set(true);

    try {
      // 이전 설정 정리
      this.unload();

      // 설정 저장
      this._config = config;

      // 브레이크포인트 설정
      if (config.breakpoints) {
        this.breakpoints = config.breakpoints;
      }

      // 테마 설정
      this.setTheme("system");

      // 화면 크기 감지 초기화
      this.handleResize();
      window.addEventListener('resize', this.handleResize);

      // 레이아웃 생성 (sidebar만 지원)
      await this.createLayout();

      // 라우터 초기화
      if (this._layoutElement) {
        this._router = new Router({
          root: this._layoutElement,
          basepath: config.basepath || '/',
          routes: config.routes,
        });
      }

      console.log('✅ App loaded successfully');
    } catch (error) {
      console.error('❌ Failed to load app:', error);
      throw error;
    } finally {
      this.isLoading.set(false);
    }
  }

  /**
   * 앱 언로드
   */
  public unload(): void {
    // 이벤트 리스너 제거
    window.removeEventListener('resize', this.handleResize);

    // 레이아웃 제거
    if (this._layoutElement && this._layoutElement.parentNode) {
      this._layoutElement.parentNode.removeChild(this._layoutElement);
    }

    // 라우터 정리
    this._router = undefined;
    this._layoutElement = undefined;
    this._config = undefined;
  }

  /**
   * 레이아웃 생성 (Sidebar 레이아웃만 지원)
   */
  private async createLayout(): Promise<void> {
    // 기존 레이아웃 제거
    const existingLayout = document.body.querySelector('[data-app-layout]');
    if (existingLayout) {
      document.body.removeChild(existingLayout);
    }

    // Sidebar 레이아웃 생성
    const { SidebarLayout } = await import('./layouts/SidebarLayout.js');
    const layout = new SidebarLayout();

    // 레이아웃 설정 적용
    if (this._config?.layout) {
      (layout as any).config = this._config.layout;
    }

    layout.setAttribute('data-app-layout', 'true');
    document.body.appendChild(layout);
    this._layoutElement = layout;

    // 레이아웃이 완전히 렌더링될 때까지 대기
    if ('updateComplete' in layout) {
      await (layout as any).updateComplete;
    }
  }

  /** 화면 크기 변경 핸들러 */
  private handleResize = (): void => {
    const width = window.innerWidth;
    const [small, medium] = this.breakpoints;

    if (width < small) {
      this.screen.set('small');
    } else if (width < medium) {
      this.screen.set('medium');
    } else {
      this.screen.set('large');
    }
  };

  /** 테마 설정 */
  public setTheme(mode: UTheme): void {
    this.theme.set(mode);
    setTheme(mode);
  }

  /** 페이지 이동 */
  public navigate(path: string): void {
    this._router?.go(path);
  }

  /** 뒤로 가기 */
  public back(): void {
    window.history.back();
  }

  /** 앞으로 가기 */
  public forward(): void {
    window.history.forward();
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

  /** 확인 대화상자 */
  public async confirm(message: string, _options?: DialogOptions): Promise<boolean> {
    // TODO: Dialog Component 사용하여 확인 대화상자 표시
    return window.confirm(message);
  }
}