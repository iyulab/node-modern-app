import { DI } from "./DI";
import { LayoutStore, LocatorStore, UIStore } from "../stores";
import type { UModalContent } from "@iyulab/u-components/components/modal";
import type { UInputType } from "@iyulab/u-components/components/input";
import type { InputDialogOptions, MessageDialogOptions } from "../components/modals";

export class UModernApp {
  private static locator = DI.get(LocatorStore);
  private static ui = DI.get(UIStore);
  private static layout = DI.get(LayoutStore);

  public static get current() {
    return UModernApp.locator.current;
  }

  public static go(path: string) {
    UModernApp.locator.go(path);
  }

  public static goBack() {
    UModernApp.locator.goBack();
  }

  public static goForward() {
    UModernApp.locator.goForward();
  }

  public static async showDialogAsync(content?: UModalContent) {
    return await UModernApp.ui.showDialogAsync(content);
  }

  public static async showDrawerAsync(content?: UModalContent) {
    return await UModernApp.ui.showDrawerAsync(content);
  }

  public static async showMessageDialogAsync(message:string, options: MessageDialogOptions) {
    return await UModernApp.ui.showMessageDialogAsync(message, options);
  }

  public static async showInputDialogAsync(type: UInputType, options: InputDialogOptions) {
    return await UModernApp.ui.showInputDialogAsync(type, options);
  }

  public static toggleTheme() {
    UModernApp.layout.toggleTheme();
  }
}