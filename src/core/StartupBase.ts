import React from "react";
import { Router } from "@remix-run/router";
import ReactDOM from "react-dom/client";
import { RouterProvider, RouteObject } from "react-router-dom";

import { DI } from "./DI";
import {
  MenuItem,
  MenuStore,
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
  abstract baseElement?: React.ReactNode;
  abstract errorElement?: React.ReactNode;
  abstract otherShells?: RouteObject[];

  abstract initMainMenuItems(): MenuItem[];
  abstract initRoutes(): RouteExt[];

  layout = useLayout();
  topBarOptions = topBarOptions;

  init(): Router {
    // 서비스 등록
    const menu = DI.addSingleton(MenuStore);
    const locator = DI.addSingleton(LocatorStore);
    const layout = DI.addSingleton(LayoutStore);
    const ui = DI.addSingleton(UIStore);

    // ui 초기화
    ui.initUI();

    // layout 초기화
    layout.initLayout(this.title, this.logo);

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

    // menu 초기화
    const menuItems = this.initMainMenuItems();
    menu.initMenu(menuItems, keyPath);

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