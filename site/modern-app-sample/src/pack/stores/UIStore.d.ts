import { GroupMenu } from "@iyulab/modern-app/stores/MenuStore";
import { NotificationMenu, SubNavMenu, SubNavTooltip, ToastBar } from "@iyulab/modern-app/layouts/components";
import { InputDialogOptions, MessageDialog, IDialogContent } from "@iyulab/modern-app/components/lit/dialogs";
import { BusyIndicator } from "@iyulab/modern-app/components/lit/elements/BusyIndicator";
import { IMenuItem } from "@iyulab/modern-app/components/lit/elements/PopupMenu";
export declare class UIStore {
    pageBusyIndicator: BusyIndicator;
    messageBoxDialog: MessageDialog;
    notificationMenu: NotificationMenu;
    subNavMenu: SubNavMenu;
    subNavTooltip: SubNavTooltip;
    toastBar: ToastBar;
    initUI(): void;
    toggleNotificationAsync(event: Event): Promise<void>;
    toggleSubNavAsync(event: Event, menu: GroupMenu): Promise<void>;
    hoverNavTooltipAsync(event: Event, display: string): Promise<void>;
    createElement(html: string): Element;
    showContextMenu(menuItems: Array<IMenuItem>, e: MouseEvent): Promise<{
        success: boolean;
        value: any;
    }>;
    showUserMenuAsync(event: Event): Promise<void>;
    showMessageAsync(title: string, message: string): Promise<boolean>;
    showMessageOkCancelAsync(title: string, message: string): Promise<boolean>;
    showConfirmDialog(title: string, message: string): Promise<boolean>;
    showInputDialogAsync(title: string, message: string, options?: InputDialogOptions): Promise<{
        success: boolean;
        value: unknown;
    }>;
    showContentDialogAsync(title: string, content: any, options?: {
        okCancel?: boolean;
        yesNo?: boolean;
        hiddenButtons?: boolean;
        validationHandler?: () => string[];
    }): Promise<{
        success: boolean;
        value: any;
    }>;
    showDialogAsync(content: any): Promise<{
        success: boolean;
        value: any;
    }>;
    showRightDialogAsync(content: IDialogContent): Promise<import("../data").IResultValue>;
}
//# sourceMappingURL=UIStore.d.ts.map