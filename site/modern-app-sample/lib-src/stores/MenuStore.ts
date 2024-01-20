import { makeAutoObservable } from "mobx";

interface Seperator {
  type: "separator";
  line?: boolean;
  height?: number;
}

interface SingleMenu {
  type: "single";
  key: string;
  display: string;
  path?: string;
  iconViewBox?: string;
  iconData?: string;
}

export interface GroupMenu {
  type: "group";
  display: string;
  iconViewBox?: string;
  iconData?: string;
  subMenu: SubMenu[];
}

export interface SubMenu {
  key: string;
  display: string;
  path?: string;
  force?: boolean; // true: window.location.href, false: locator.go
}

interface ActionMenu {
  type: "action";
  action: () => void;
  display: string;
  iconViewBox?: string;
  iconData?: string;
}

export type MenuItem = Seperator | SingleMenu | GroupMenu | ActionMenu;

export class MenuStore {
  
  private menuItems: MenuItem[] = [];

  get menus() {
    return this.menuItems;
  }

  constructor() {
    makeAutoObservable(this);
  }

  initMenu(items: MenuItem[], keyPath: Map<string, string>) {
    // 1. menu path 설정
    this.menuItems = this.resolvePath(items, keyPath);
  }

  // key값으로 path를 찾아서 menu에 할당
  resolvePath(item: MenuItem[], keyPath: Map<string, string>): MenuItem[] {
    return item.map((i: MenuItem) => {
      if(i.type === "single") {
        const path = keyPath.get(i.key);
        if(path && !i.path) i.path = path;
        return i;
      } else if(i.type === "group") {
        i.subMenu = i.subMenu.map((s: SubMenu) => {
          const path = keyPath.get(s.key);
          if(path && !s.path) s.path = path;
          return s;
        });
        return i;
      } else {
        return i;
      }
    });
  }

}
