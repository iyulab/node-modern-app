import { makeAutoObservable } from "mobx";
import { RouteExt } from '@iyulab/modern-app/stores/LocatorStore';

export interface IMenuItem {
  type: "menu" | "seperator";
  key?: string;
  display?: string;
  iconSize?: number;
  iconData?: string;
  path?: string;
  children?: ISubMenu[];
  action?: () => void;
}

export interface ISubMenu {
  key: string;
  display: string;
  path?: string;
  action?: () => void;
}

export class MenuStore {
  
  mainMenuItems: IMenuItem[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  initMenu(items: IMenuItem[], routes?: RouteExt[]) {
    this.mainMenuItems = items.map(item => {
      return this.resolvePath(item, routes);
    });
  }

  resolvePath(item: IMenuItem, routes?: RouteExt[]): IMenuItem {
    if (item.type === "menu" && !item.path && routes) {
      if (item.children) {
        item.children = item.children.map(child => {
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
