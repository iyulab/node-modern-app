import { makeAutoObservable } from "mobx";

interface BlackMenu {
  type: "blank";
}

interface SingleMenu {
  type: "single";
  key: string;
  display: string;
  path?: string;
  iconSize?: number;
  iconData?: string;
}

interface GroupMenu {
  type: "group";
  display: string;
  iconSize?: number;
  iconData?: string;
  subMenu: SubMenu[];
}

interface SubMenu {
  key: string;
  display: string;
  path?: string;
}

interface ActionMenu {
  type: "action";
  action: () => void;
  display: string;
  iconSize?: number;
  iconData?: string;
}

export type MenuItem = BlackMenu | SingleMenu | GroupMenu | ActionMenu;

export class MenuStore {
  
  menuItems: MenuItem[] = [];

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
