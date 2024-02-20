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

export class LayoutStore {

  private _title?: string = "Modern App";
  private _logo?: any = undefined;
  private _theme: Themes = Themes.light;
  private _isMediumScreen: boolean = window.innerWidth < Breakpoint.Medium;

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

  constructor() {
    makeAutoObservable(this);
    window.addEventListener("resize",this.onWindowResized.bind(this));
    this._theme = localStorage.theme === 'dark' ? Themes.dark : Themes.light;
    this.updateTheme(this.theme);
  }

  initLayout(title?: string, logo?: any) {
    this._title = title ?? this.title;
    this._logo = logo;
  }

  toggleTheme() {
    const otherTheme = this.theme === Themes.dark ? Themes.light : Themes.dark;
    this.updateTheme(otherTheme);
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