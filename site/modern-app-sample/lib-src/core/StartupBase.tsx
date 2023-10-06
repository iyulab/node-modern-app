import React from 'react';
import { Router } from '@remix-run/router';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import { DI } from './DI';
import {
  AppInfoStore,
  IMenuItem,
  MenuStore,
  LocatorStore,
  RouteExt,
  LayoutStore,
  UIStore
} from '@iyulab/modern-app/stores';

export abstract class StartupBase {
  abstract title?: string;
  abstract logo?: string;
  abstract helpPath?: string;
  abstract basePath?: string;
  abstract baseElement?: React.ReactNode;
  abstract errorElement?: React.ReactNode;
  abstract otherShells?: RouteExt[];

  abstract initMainMenuItems(): IMenuItem[];
  abstract initRoutes(): RouteExt[];

  abstract callback?: () => void;

  init() : Router {

    // 서비스 등록
    const appInfo = DI.addSingleton(AppInfoStore);
    const menu = DI.addSingleton(MenuStore);
    const locator = DI.addSingleton(LocatorStore);
    const layout = DI.addSingleton(LayoutStore);
    const ui = DI.addSingleton(UIStore);

    // ui 초기화
    ui.initUI();

    // appInfo 초기화
    appInfo.initAppInfo(this.title, this.logo);

    // layout 초기화
    layout.initLayout(this.title, this.logo);

    // locator 초기화
    const routes = this.initRoutes();
    const router = locator.initLocator(
      routes, this.helpPath, this.basePath,
      this.baseElement, this.errorElement, this.otherShells
    );

    // menu 초기화
    const menuItems = this.initMainMenuItems();
    menu.initMenu(menuItems, routes);

    // callback
    if(this.callback) this.callback();

    return router;
  }
  
  run() {
    const router = this.init();
    
    let root = document.getElementById('root');
    if(!root) {
      root = document.createElement('div');
      root.id = 'root';
      document.body.appendChild(root);
    }

    ReactDOM.hydrateRoot(
      root,
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    );
  }

}