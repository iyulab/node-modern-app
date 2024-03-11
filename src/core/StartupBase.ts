import React from "react";
import { Router } from "@remix-run/router";
import ReactDOM from "react-dom/client";
import { RouterProvider, RouteObject } from "react-router-dom";

import { DI } from "./DI";
import {
  MenuItem,
  BreadcrumbItem,
  LocatorStore,
  LayoutStore,
  UIStore,
  RouteExt,
} from "../stores";

import { useLayout } from "../hooks";
import { topBarOptions } from "../layouts/TopBarOptions";

export abstract class StartupBase {
  abstract title?: string;
  abstract logo?: string;
  abstract helpPath?: string;
  abstract basePath?: string;
  abstract baseElement?: React.ComponentType;
  abstract errorElement?: React.ComponentType;
  abstract otherShells?: RouteObject[];

  abstract initRoutes(): RouteExt[];
  abstract initMainMenuItems(): MenuItem[];
  protected initSubMenuItems(): MenuItem[] {
    return [];
  }

  protected initBreadcrumbItems(): BreadcrumbItem[] {
    return [];
  }

  layout = useLayout();
  topBarOptions = topBarOptions;

  init(): Router {
    // 서비스 등록
    const locator = DI.addSingleton(LocatorStore);
    const layout = DI.addSingleton(LayoutStore);
    const ui = DI.addSingleton(UIStore);

    // locator 초기화
    const routes = this.initRoutes();
    const [keyPath, router] = locator.initLocator(
      routes,
      this.helpPath,
      this.basePath,
      this.baseElement,
      this.errorElement,
      this.otherShells
    );

    // layout 초기화
    const mainMenuItems = this.initMainMenuItems();
    const subMenuItems = this.initSubMenuItems();
    const breadcrumbItems = this.initBreadcrumbItems();
    layout.initLayout(
      keyPath,
      mainMenuItems,
      subMenuItems,
      breadcrumbItems,
      this.title,
      this.logo
    );

    // ui 초기화
    ui.initUI();

    return router;
  }

  run() {
    const router = this.init();

    let root = document.getElementById("root");
    if (!root) {
      root = document.createElement("div");
      root.id = "root";
      document.body.appendChild(root);
    }

    ReactDOM.hydrateRoot(
      root,
      React.createElement(RouterProvider, { router: router })
    );
  }
}
