import type { LitElement } from "lit";
import type { ComponentType } from "react";

export interface HeaderLogo {
  src: string;
  size?: string;
}

export interface HeaderTitle {
  text: string;
  path?: string;
  fontSize?: string;
  fontWeight?: string;
  fontFamily?: string;
  color?: string;
}

export type TextBreadcrumb = Record<string, string>;
export type RegExpBreadcrumb = Record<RegExp, (match:string) => string>;
export type Breadcrumb = TextBreadcrumb | RegExpBreadcrumb;

export interface HeaderButton {
  help?: string;
  theme?: 'light' | 'dark' | 'system' | 'none';
  locale?: LocaleConfig;
  user?: UserConfig;
}

export interface LocaleConfig {
  
}

export interface UserConfig {

}

export interface HeaderConfig {
  
  logo?: string | HeaderLogo;
  
  title?: string | HeaderTitle;
  
  breadcrumbs?: Breadcrumb;
  
  buttons?: HeaderButton;

  others?: (ComponentType | LitElement)[];

}
