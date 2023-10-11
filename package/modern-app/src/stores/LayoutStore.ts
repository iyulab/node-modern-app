import { makeAutoObservable } from "mobx";
import { DOM } from "@microsoft/fast-element";
import { baseLayerLuminance, StandardLuminance } from "@microsoft/fast-components";

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

  title?: string = "IYULAB APP";
  logo?: string = undefined;
  theme: Themes = Themes.light;
  isMediumScreen: boolean = false;

  constructor() {
    makeAutoObservable(this);
    window.addEventListener("resize",this.onWindowResized.bind(this));
    this.isMediumScreen = window.innerWidth < Breakpoint.Medium;
    this.theme = localStorage.theme === 'dark' ? Themes.dark : Themes.light;
    this.updateTheme(this.theme);
  }

  initLayout(title?: string, logo?: string) {
    this.title = title ?? this.title;
    this.logo = logo;
  }

  toggleTheme(targetElement?: any) {
    const otherTheme = this.theme === Themes.dark ? Themes.light : Themes.dark;
    this.updateTheme(otherTheme, targetElement);
  }
  
  private updateTheme(theme: Themes, targetElement?: any) {
    this.theme = theme;
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
    
    const target = targetElement ?? window.document.body;
    if (target) {
      DOM.queueUpdate(() => {
        baseLayerLuminance.setValueFor(target, theme == Themes.dark ? StandardLuminance.DarkMode : StandardLuminance.LightMode);
      });
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
      this.isMediumScreen = true;
    } else if (this.isMediumScreen && !medium) {
      this.isMediumScreen = false;
    }
  }
}
