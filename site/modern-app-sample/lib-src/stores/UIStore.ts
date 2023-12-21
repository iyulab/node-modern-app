import { GroupMenu } from "@iyulab/modern-app/stores/MenuStore";
import {
  NotificationMenu,
  SubNavMenu,
  SubNavTooltip,
  ToastBar
} from "@iyulab/modern-app/layouts/components";
import {
  ContentDialog, 
  InputDialog, 
  InputDialogOptions, 
  MessageDialog,
  BlankDialog 
} from "@iyulab/modern-app/components/lit/dialogs";
import { 
  BusyIndicator 
} from "@iyulab/modern-app/components/lit/BusyIndicator";
import {
  IMenuItem, 
  PopupMenu 
} from "@iyulab/modern-app/components/lit/PopupMenu";

export class UIStore {
  
  pageBusyIndicator: BusyIndicator = new BusyIndicator();
  messageBoxDialog: MessageDialog = new MessageDialog();

  notificationMenu: NotificationMenu = new NotificationMenu();
  subNavMenu: SubNavMenu = new SubNavMenu();
  subNavTooltip: SubNavTooltip = new SubNavTooltip();
  toastBar: ToastBar = new ToastBar();

  private busyStack: number = 0;

  initUI() {
    document.body.appendChild(this.pageBusyIndicator);
    document.body.appendChild(this.messageBoxDialog);
    this.pageBusyIndicator.hidden = true;
    this.messageBoxDialog.hidden = true;

    document.body.appendChild(this.notificationMenu);
    document.body.appendChild(this.subNavMenu);
    document.body.appendChild(this.subNavTooltip);
    document.body.appendChild(this.toastBar);
  }

  async toggleNotificationAsync(event: any) {
    this.notificationMenu.toggleAsync(event);
  }

  async showUserMenuAsync(event: any) {
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
  
  async toggleSubNavAsync(event: any, menu: GroupMenu) {
    this.subNavMenu.item = menu;
    this.subNavMenu.toggleAsync(event);
  }

  async hoverNavTooltipAsync(event: any, display: string) {
    this.subNavTooltip.display = display;
    this.subNavTooltip.hoverAsync(event);
  }

  async showMessageAsync(title: string, message: string) : Promise<boolean> {
    this.messageBoxDialog.initOk();
    return this.messageBoxDialog.showAsync(title, message);
  }

  async showMessageOkCancelAsync(title: string, message: string) {
    this.messageBoxDialog.initOkCancel();
    return this.messageBoxDialog.showAsync(title, message);    
  }

  async showConfirmDialog(title: string, message: string) {
    this.messageBoxDialog.initYesNo();
    return this.messageBoxDialog.showAsync(title, message);
  }
  
  createInertElement(html: string): Element {
    const template = document.createElement('template');
    template.innerHTML = html.trim();
    return template.content.firstChild as Element;
  }
  
  async showInputDialogAsync(
    title: string, 
    message: string, 
    options?: InputDialogOptions) {
    
    const html = `<input-dialog hidden></input-dialog>`;
    const element = this.createInertElement(html)
    document.body.appendChild(element);
    
    try {
      const dlg = element as InputDialog;
      const r = await dlg.showAsync(title, message, options);
      return r;
    } catch (ex: any) {
      return {
        success: false,
        value: ex
      };
    } finally {
      document.body.removeChild(element);
    }
  }

  async showDialogAsync(content: any) {
    
    const html = `<blank-dialog hidden></blank-dialog>`;
    const element = this.createInertElement(html)
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
    const element = this.createInertElement(html)
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

  async showContextMenu(menuItems: Array<IMenuItem>, e: MouseEvent) {
    
    const html = `<popup-menu hidden></popup-menu>`;
    const element = this.createInertElement(html)
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
  
  //#region busy indicator

  busy() {
    // busy 스택에 추가
    this.busyStack++;
    this.updateBusyIndicator();
  }

  unbusy() {
    // busy 스택에서 제거, 0보다 작아지면 0으로 맞춤
    this.busyStack--;
    if (this.busyStack < 0) {
      this.busyStack = 0;
    }
    this.updateBusyIndicator();
  }

  updateBusyIndicator() {
    this.pageBusyIndicator.hidden = this.busyStack > 0 ? false : true;
  }
  
  async invokeInBusy<T>(action: () => Promise<T>): Promise<T|undefined> {
    this.busy();

    try {
      return await action();
    } catch (e) {
      console.error(e);
      return undefined;
    } finally {
      this.unbusy();
    }
  }
  
  //#endregion

}