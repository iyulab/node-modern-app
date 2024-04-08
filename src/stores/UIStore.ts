import type { GroupMenu } from "../stores/LayoutStore";
import {
  type UModalResult,
  UDialog,
  UDrawer,
  UModalContent,
} from "@iyulab/u-components/components/modal";
import type { AlertType } from "@iyulab/u-components/components/alert";
import type { UInputType } from "@iyulab/u-components/components/form";
import {
  NotificationMenu,
  SubNavMenu,
  SubNavTooltip,
  ToastBar,
  BusyIndicator,
} from "../components/parts";
import {
  type MessageDialogOptions,
  type InputDialogOptions,
  MessageModalContent,
  InputModalContent,
} from "../components/modals";
import { UAlertController } from "../../../u-components/src/components/alert/UAlertController";

export class UIStore {
  private dialog: UDialog = new UDialog();
  private drawer: UDrawer = new UDrawer();

  private notificationMenu: NotificationMenu = new NotificationMenu();
  public subNavMenu: SubNavMenu = new SubNavMenu();
  private subNavTooltip: SubNavTooltip = new SubNavTooltip();
  private toastBar: ToastBar = new ToastBar();
  private pageBusyIndicator: BusyIndicator = new BusyIndicator();

  constructor() {
    this.initUI();
  }

  public initUI() {
    if(!document.body.querySelector('u-dialog')) {
      document.body.appendChild(this.dialog);
    }
    if(!document.body.querySelector('u-drawer')) {
      document.body.appendChild(this.drawer);
    }
    if(!document.body.querySelector('notification-menu')) {
      document.body.appendChild(this.notificationMenu);
    }
    if(!document.body.querySelector('sub-nav-menu')) {
      document.body.appendChild(this.subNavMenu);
    }
    if(!document.body.querySelector('sub-nav-tooltip')) {
      document.body.appendChild(this.subNavTooltip);
    }
    if(!document.body.querySelector('toast-bar')) {
      document.body.appendChild(this.toastBar);
    }
    if(!document.body.querySelector('busy-indicator')) {
      document.body.appendChild(this.pageBusyIndicator);
      this.pageBusyIndicator.open = false;
    }
  }

  public async toggleNotificationAsync(event: Event) {
    this.notificationMenu.toggleAsync(event);
  }

  public async toggleSubNavAsync(event: Event, menu: GroupMenu) {
    this.subNavMenu.item = menu;
    this.subNavMenu.toggleAsync(event);
  }

  public async hoverNavTooltipAsync(event: Event, display: string) {
    this.subNavTooltip.display = display;
    this.subNavTooltip.hoverAsync(event);
  }

  public async showUserMenuAsync(event: Event) {
    this.subNavMenu.item ??= {
      type: "group",
      display: "User",
      subMenu: [
        {
          key: "Profile",
          display: "Profile",
          path: "/app/profile"
        },
        {
          key: "SignOut",
          display: "Sign Out",
          path: "/accounts/logout",
          force: true
        }
      ]
    };
    this.subNavMenu.toggleAsync(event);
  }

  /**
   * #### 정보 메시지를 표시합니다.
   * @param message 표시할 메시지
   * @param duration 표시할 시간 (밀리초)
  */
  public async info(message: string, duration: number = 3000) {
    await this.toastAlertAsync("primary", message, duration);
  }

  /**
   * #### 성공 메시지를 표시합니다.
   * @param message 표시할 메시지
   * @param duration 표시할 시간 (밀리초)
  */
  public async success(message: string, duration: number = 3000) {
    await this.toastAlertAsync("success", message, duration);
  }

  /**
   * #### 경고 메시지를 표시합니다.
   * @param message 표시할 메시지
   * @param duration 표시할 시간 (밀리초)
  */
  public async warn(message: string, duration: number = 3000) {
    await this.toastAlertAsync("warning", message, duration);
  }

  /**
   * #### 에러 메시지를 표시합니다.
   * @param message 표시할 메시지
   * @param duration 표시할 시간 (밀리초)
  */
  public async error(message: string, duration: number = 3000) {
    await this.toastAlertAsync("danger", message, duration);
  }

  /**
   * #### 시스템 메시지를 표시합니다.
   * @param message 표시할 메시지
   * @param duration 표시할 시간 (밀리초)
  */
  public async system(message: string, duration: number = 3000) {
    await this.toastAlertAsync("neutral", message, duration);
  }

  /**
   * #### 메시지 대화상자를 표시합니다.
   * @param message 표시할 메시지
   * @param options 대화상자 옵션
   * @returns 사용자의 선택 결과 (확인: true, 취소: false)
   * @example
   * const ui = DI.get(UIStore);
   * const result = await ui.showMessageDialogAsync("메시지를 표시합니다.");
   */
  public async showMessageDialogAsync(message:string, options?: MessageDialogOptions): Promise<boolean> {
    const content = new MessageModalContent(options);
    content.message = message;
    this.dialog.label = options?.title || "메시지";
    this.dialog.noHeader = options?.noHeader || false;
    const result = await this.dialog.showAsync(content);
    return result.success;
  }
  
  /**
   * #### 입력 대화 상자를 표시합니다.
   * @param type 입력 타입
   * @param options 대화상자 옵션
   * @returns 입력 결과
   * @example
   * const ui = DI.get(UIStore);
   * const result = await ui.showInputDialogAsync("text", { message: "이름을 입력 하세요" });
   */
  public async showInputDialogAsync(type: UInputType, options?: InputDialogOptions): Promise<UModalResult> {
    const content = new InputModalContent(options);
    content.type = type;
    this.dialog.label = options?.title || "입력 대화 상자";
    this.dialog.noHeader = options?.noHeader || false;
    return await this.dialog.showAsync(content);
  }

  /**
   * #### 일반 Dialog를 표시합니다.
   * @param content UModalContent를 상속받은 클래스 웹 컴포넌트
   * @example
   * const ui = DI.get(UIStore);
   * // DialogContent는 UModalContent를 상속받은 클래스입니다.
   * const content = new DialogContent(); 
   * const result = await ui.showDialogAsync(content);
   */
  public async showDialogAsync(content?: UModalContent): Promise<UModalResult> {
    return await this.dialog.showAsync(content);
  }

  /**
   * #### 일반 Drawer를 표시합니다.
   * @param content UModalContent를 상속받은 클래스 웹 컴포넌트
   * @example
   * const ui = DI.get(UIStore);
   * // DrawerContent UModalContent를 상속받은 클래스입니다.
   * const content = new DrawerContent(); 
   * const result = await ui.showDrawerAsync(content);
   */
  public async showDrawerAsync(content?: UModalContent): Promise<UModalResult> {
    return await this.drawer.showAsync(content);
  }
  
  /** 
   * #### BusyIndicator를 표시한 상태에서 작업을 수행합니다. (완료 후 해제)
   * @param action loading 상태에서 수행할 작업
   * @param message loading 메시지
   * @example
   * ui.invokeInBusy(async () => { 
   *   await new Promise((resolve) => setTimeout(resolve, 2000));
   * });
   */
  public async invokeInBusy(action: () => Promise<any>, message?: string): Promise<any> {
    try {
      this.pageBusyIndicator.message = message;
      this.pageBusyIndicator.busy();
      return await action();
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    } finally {
      this.pageBusyIndicator.unbusy();
    }
  }

  /**
   * element를 생성합니다.
   * @param html 생성할 html 문자열
   * @returns 생성된 element
  */
  public createElement(html: string): Element {
    const template = document.createElement('template');
    template.innerHTML = html.trim();
    return template.content.firstChild as Element;
  }

  private async toastAlertAsync(type: AlertType, message: string, duration: number = 3000) {
    UAlertController.toastAsync({
      type: type,
      content: message,
      duration: duration
    });
  }
}