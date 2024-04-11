// React
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

// Services
import { DI } from "./DI";
import { LayoutStore, LocatorStore, UIStore } from "../stores";

// Types
import type { UModalContent } from "@iyulab/u-components/components/modal";
import type { TextInputFormat } from "@iyulab/u-components/components/input/UTextInput.model";
import type { InputDialogOptions, MessageDialogOptions } from "../components/modals";

export class UModernApp {
  private static locator = DI.get(LocatorStore);
  private static ui = DI.get(UIStore);
  private static layout = DI.get(LayoutStore);

  public static get current() {
    return UModernApp.locator.current;
  }

  public static load(target: HTMLElement, model: object, mode: "dev" | "prod" = "dev") {
    console.log(`UModernApp load on ${mode} mode`);
    console.log(`Layout model: ${JSON.stringify(model, null, 2)}`);
    const router = UModernApp.locator.createRouter(model);

    const app = mode === 'dev'
        ? React.createElement(React.StrictMode, {}, React.createElement(RouterProvider, { router }))
        : React.createElement(RouterProvider, { router });

    ReactDOM.hydrateRoot(target, app);
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

  public static async showMessageDialogAsync(message:string, options?: MessageDialogOptions) {
    return await UModernApp.ui.showMessageDialogAsync(message, options);
  }

  public static async showInputDialogAsync(format: TextInputFormat, options?: InputDialogOptions) {
    return await UModernApp.ui.showInputDialogAsync(format, options);
  }

  public static async info(message:string) {
    await UModernApp.ui.info(message);
  }

  public static async system(message:string) {
    await UModernApp.ui.system(message);
  }

  public static async success(message:string) {
    await UModernApp.ui.success(message);
  }

  public static async warn(message:string) {
    await UModernApp.ui.warn(message);
  }

  public static async error(message:string) {
    await UModernApp.ui.error(message);
  }

  public static toggleTheme() {
    UModernApp.layout.toggleTheme();
  }
}