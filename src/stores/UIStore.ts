import { GroupMenu } from "../stores/MenuStore";
import {
  NotificationMenu,
  SubNavMenu,
  SubNavTooltip,
  ToastBar
} from "../layouts/components";
import {
  ContentDialog, 
  InputDialog, 
  InputDialogOptions, 
  MessageDialog,
  BlankDialog,
  RightDialog,
  IMessageDialogProps} from "../components/lit/dialogs";
import { IDialogContent } from '../components/lit/dialogs/IDialogContent';
import { 
  BusyIndicator 
} from "../components/lit/elements/BusyIndicator";
import {
  IMenuItem, 
  PopupMenu 
} from "../components/lit/elements/PopupMenu"
import { ResultTValue } from "../data";

export class UIStore {
  
  pageBusyIndicator: BusyIndicator = new BusyIndicator();
  messageBoxDialog: MessageDialog = new MessageDialog();

  notificationMenu: NotificationMenu = new NotificationMenu();
  subNavMenu: SubNavMenu = new SubNavMenu();
  subNavTooltip: SubNavTooltip = new SubNavTooltip();
  toastBar: ToastBar = new ToastBar();

  initUI() {
    if (this.pageBusyIndicator && this.pageBusyIndicator.parentElement) {
      return;
    }
    
    document.body.appendChild(this.pageBusyIndicator);
    document.body.appendChild(this.messageBoxDialog);
    this.pageBusyIndicator.hidden = true;
    this.messageBoxDialog.hidden = true;

    document.body.appendChild(this.notificationMenu);
    document.body.appendChild(this.subNavMenu);
    document.body.appendChild(this.subNavTooltip);
    document.body.appendChild(this.toastBar);
  }

  async toggleNotificationAsync(event: Event) {
    this.notificationMenu.toggleAsync(event);
  }

  async toggleSubNavAsync(event: Event, menu: GroupMenu) {
    this.subNavMenu.item = menu;
    this.subNavMenu.toggleAsync(event);
  }

  async hoverNavTooltipAsync(event: Event, display: string) {
    this.subNavTooltip.display = display;
    this.subNavTooltip.hoverAsync(event);
  }

  createElement(html: string): Element {
    const template = document.createElement('template');
    template.innerHTML = html.trim();
    return template.content.firstChild as Element;
  }
  
  async showContextMenu(menuItems: Array<IMenuItem>, e: MouseEvent) {
    
    const html = `<popup-menu hidden></popup-menu>`;
    const element = this.createElement(html)
    document.body.appendChild(element);

    try {
      const popupMenu = element as PopupMenu;
      popupMenu.menuItems = menuItems;
      popupMenu.location = {
        x: e.x,
        y: e.y
      };
      
      const r = await popupMenu.showAsync();
      return r;
    } catch (ex) {
      return {
        success: false,
        value: ex
      };
    } finally {
      document.body.removeChild(element);
    }
  }

  async showUserMenuAsync(event: Event) {
    this.subNavMenu.item = {
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

  private applyProps(dlg: MessageDialog, props: IMessageDialogProps) {
    if (props.positiveText) {
      dlg.positiveText = props.positiveText;
    }
    if (props.negativeText) {
      dlg.negativeText = props.negativeText;
    }
    if (props.useNegative != null) {
      dlg.useNegative = props.useNegative;
    }    
  }

  async showMessageAsync(p: IMessageDialogProps) : Promise<boolean> {
    this.messageBoxDialog.initOk();
    this.applyProps(this.messageBoxDialog, p);
    return this.messageBoxDialog.showAsync(p.title, p.message);
  }

  async showMessageOkCancelAsync(p: IMessageDialogProps) {
    this.messageBoxDialog.initOkCancel();
    this.applyProps(this.messageBoxDialog, p);
    return this.messageBoxDialog.showAsync(p.title, p.message);    
  }

  async showConfirmDialog(p: IMessageDialogProps) {
    this.messageBoxDialog.initYesNo();
    this.applyProps(this.messageBoxDialog, p);
    return this.messageBoxDialog.showAsync(p.title, p.message);
  }
  
  async showInputDialogAsync(
    title: string, 
    message: string, 
    options?: InputDialogOptions) {
    
    const html = `<input-dialog hidden></input-dialog>`;
    const element = this.createElement(html)
    document.body.appendChild(element);
    
    try {
      const dlg = element as InputDialog;
      const r = await dlg.showAsync(title, message, options);
      return r;
    } catch (ex) {
      return new ResultTValue<string>({
        success: false,
        exception: ex
      });
    } finally {
      document.body.removeChild(element);
    }
  }
  
  async showContentDialogAsync(title: string, content: any, options?: {
    okCancel?: boolean,
    yesNo?: boolean,
    hiddenButtons?: boolean
    validationHandler?: () => string[]
  }) {
    // # use this to create a dialog
    // let context = {
    //   name: "",
    //   template: "",
    //   emails: []
    // }
    // let el = this.getCreateWorkpageDialog(context);
    // let result = await uiManager.showContentDialogAsync('New Workspace', el);

    const html = `<content-dialog hidden></content-dialog>`;
    const element = this.createElement(html)
    document.body.appendChild(element);

    try {
      const dlg = element as ContentDialog;
      dlg.content = content;
      if (options != null) {
        if (options.okCancel) {
          dlg.positiveText = "Ok";
          dlg.negativeText = "Cancel";
          dlg.useNegative = true;
        } else if (options.yesNo) {
          dlg.positiveText = "Yes";
          dlg.negativeText = "No";
          dlg.useNegative = true;
        }

        if (options.hiddenButtons) {
          dlg.hiddenButtons = options.hiddenButtons;
        }
        
        if (options.validationHandler) {
          dlg.validationHandler = options.validationHandler;
        }      
      }
      
      const r = await dlg.showAsync(title);
      return r;    
    } catch (ex) {
      return {
        success: false,
        value: ex
      };
    } finally {
      document.body.removeChild(element);
    }
  }

  // # Dialog를 표시합니다.
  // 예)
  // const ui = DI.get(UIStore);
  // // const content = new UserAutoForm();
  // // const content = ui.createElement("<user-auto-form></user-auto-form>");
  // const r = await ui.showDialogAsync(content);
  async showDialogAsync(content: any) {
    
    const html = `<blank-dialog hidden></blank-dialog>`;
    const element = this.createElement(html)
    document.body.appendChild(element);

    try {
      const dlg = element as BlankDialog;
      dlg.content = content;
      const r = await dlg.showAsync();
      return r;
    } catch (e) {
      return {
        success: false,
        value: null
      };
    } finally {
      document.body.removeChild(element);
    }
  }

  // # 우측패널 Dialog를 표시합니다.
  async showRightDialogAsync(content: IDialogContent) {

    const html = `<right-dialog hidden></right-dialog>`;
    const element = this.createElement(html);
    document.body.appendChild(element);
    
    try {
      const dlg = element as RightDialog;
      if (content.title) {
        dlg.title = content.title;
      }
      dlg.content = content;
      const r = await dlg.showAsync();
      return r;
    } catch (e) {
      return {
        success: false,
        value: null
      };
    } finally {
      document.body.removeChild(element);
    }
  }
  
  // # BusyIndicator를 표시한 상태에서 작업을 수행합니다. (완료 후 해제)
  // 예)
  // ui.invokeInBusy(async () => {
  //   await new Promise((resolve) => setTimeout(resolve, 2000));
  // });
  async invokeInBusy(func: () => Promise<any>, message?: string) {
    this.pageBusyIndicator.message = message;
    this.pageBusyIndicator.busy();
    try {
      await func();
    } catch (e) {
      console.error(e);
    } finally {
      this.pageBusyIndicator.unbusy();
    }
  }
}