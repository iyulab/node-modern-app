import { makeAutoObservable } from "mobx";

export enum Breakpoint {
  Tablet = 768,
  Small = 1100,
  Medium = 1300,
  Large = 1500,
}

export enum Themes {
  dark,
  light
}

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

export type MenuItem = Seperator | SingleMenu | GroupMenu;

export interface BreadcrumbItem {
  key: string;
  display: string;
  path?: string;
}

export class LayoutStore {

  private _title?: string = "Modern App";
  private _logo?: any = undefined;
  private _theme: Themes = Themes.light;
  private _isMediumScreen: boolean = window.innerWidth < Breakpoint.Medium;
  private _menuItems: MenuItem[] = [];
  private _breadcrumbItems: BreadcrumbItem[] = [];

  get title() {
    return this._title;
  }

  get logo() {
    return this._logo;
  }

  get theme() {
    return this._theme;
  }

  get isMediumScreen() {
    return this._isMediumScreen;
  }

  get menus() {
    return this._menuItems;
  }

  get breadcrumbs() {
    return this._breadcrumbItems;
  }

  constructor() {
    makeAutoObservable(this);
    window.addEventListener("resize", this.onWindowResized.bind(this));
    this._theme = localStorage.theme === 'dark' ? Themes.dark : Themes.light;
    this.updateTheme(this.theme);
  }

  initLayout(keyPath: Map<string, string>, menuItems: MenuItem[],
    breadcrumbItems: BreadcrumbItem[], title?: string, logo?: any) {
    this._title = title ?? this.title;
    this._logo = logo;
    this._menuItems = this.resolveMenuPath(menuItems, keyPath);
    this._breadcrumbItems = this.resolveBreadcrumbPath(breadcrumbItems, keyPath);
  }

  public toggleTheme() {
    const otherTheme = this.theme === Themes.dark ? Themes.light : Themes.dark;
    this.updateTheme(otherTheme);
  }

  // key값으로 path를 찾아서 menu에 할당
  private resolveMenuPath(item: MenuItem[], keyPath: Map<string, string>): MenuItem[] {
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

  // key값으로 path를 찾아서 breadcrumb에 할당
  private resolveBreadcrumbPath(item: BreadcrumbItem[], keyPath: Map<string, string>): BreadcrumbItem[] {
    if(item.length === 0) {
      const items: BreadcrumbItem[] = [];
      keyPath.forEach((value, key) => {
        const display = this.findMenuDisplay(key);
        items.push({ key, display: display || value, path: value });
      });
      return items;
    } else {
      return item.map((i: BreadcrumbItem) => {
        const path = keyPath.get(i.key);
        if(path && !i.path) i.path = path;
        return i;
      });
    }
  }

  private findMenuDisplay(key: string) {
    const item = this.menus.find((i) => {
      if(i.type === "single") return i.key === key;
      if(i.type === "group") return i.subMenu.find((s) => s.key === key);
      return false;
    }) as SingleMenu | GroupMenu | undefined;
    if(!item) return undefined;
    return item.display;
  }
  
  private updateTheme(theme: Themes) {
    this._theme = theme;
    document.documentElement.classList.toggle('sl-theme-dark', theme === Themes.dark);

    localStorage.theme = theme === Themes.dark ? 'dark' : 'light';
    
    if (theme == Themes.dark) {
      document.documentElement.classList.add('dark')
      document.documentElement.setAttribute('data-dark-theme', "true");
      document.documentElement.setAttribute('data-prefers-color-scheme', "dark");
    } else {
      document.documentElement.classList.remove('dark')
      document.documentElement.removeAttribute('data-dark-theme');
      document.documentElement.setAttribute('data-prefers-color-scheme', "light");
    }

    const root = document.querySelector("#root");
    if (root) {
      if (theme == Themes.dark) {
        root.classList.add('dark')
      } else {
        root.classList.remove('dark')
      }
    }
  }
  
  private onWindowResized() {
    const medium = window.innerWidth < Breakpoint.Medium;
    if (!this.isMediumScreen && medium) {
      this._isMediumScreen = true;
    } else if (this.isMediumScreen && !medium) {
      this._isMediumScreen = false;
    }
  }
}