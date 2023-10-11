import { makeAutoObservable } from "mobx";
import { RouteExt } from "./LocatorStore";

export interface IMenuItem {
  type: "single" | "group" | "blank";
  key?: string;
  path?: string;
  display?: string;
  iconSize?: number;
  iconData?: string;
  subMenu?: ISubMenu[];
  action?: () => void;
}

export interface ISubMenu {
  key: string;
  path?: string;
  display: string;
  action?: () => void;
}

export class MenuStore {
  
  menuItems: IMenuItem[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  initMenu(items: IMenuItem[], routes?: RouteExt[]) {
    this.menuItems = items.map(item => {
      return this.resolvePath(item, routes);
    });
  }

  resolvePath(item: IMenuItem, routes?: RouteExt[]): IMenuItem {
    if (item.type === "single" && !item.path && routes) {
      if (item.subMenu) {
        item.subMenu = item.subMenu.map(child => {
          if(!child.path) {
            const route = routes.find(r => r.key === child.key);
            if (route && route.path) {
              child.path = route.path.startsWith("/") ? route.path.slice(1) : `${route.path}`;
            }
            return child;
          } else {
            return child;
          }
        });
      }

      const route = routes.find(r => r.key === item.key);
      if (route && route.path) {
        item.path = route.path.startsWith("/") ? route.path.slice(1) : `${route.path}`;
      }
      return item;
    } else {
      return item;
    }
  }

}
