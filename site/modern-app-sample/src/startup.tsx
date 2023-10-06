import { ReactNode } from "react";

import { StartupBase } from "@iyulab/modern-app/core/StartupBase";
import { IMenuItem } from "@iyulab/modern-app/stores/MenuStore";
import { RouteExt } from "@iyulab/modern-app/stores/LocatorStore";

import App from './App';
import {
    HomePage
} from './pages';

class Startup extends StartupBase {
  
  title?: string;
  
  logo?: string;
  
  helpPath?: string;
  
  basePath?: string;
  
  baseElement?: ReactNode = <App />;
  
  errorElement?: ReactNode;
  
  otherShells?: RouteExt[];

  callback?: (() => void) = () => {
    console.log("initilized!");
  };

  initMainMenuItems(): IMenuItem[] {
    return [
        {
            type: "menu",
            key: "home",
            display: "Home"
        },
    ];
  }
  
  initRoutes(): RouteExt[] {
    return [
        {
            key: "home",
            path: "/",
            element: <HomePage />,
        }
    ]
  }
  
}

export default new Startup();