import type { LitElement } from "lit";
import type { AppTheme } from "../App";
import type { 
  Breadcrumb,
  LocaleConfig,
  UserConfig
} from "../components/header-parts";

export interface HeaderTitle {
  logo?: string;
  logoWidth?: string;
  logoHeight?: string;
  text?: string;
  textColor?: string;
  path?: string;
}


export interface HeaderOption {
  noHeader?: boolean;
  noTitle?: boolean;
  noBreadcrumbs?: boolean;
  noHelp?: boolean;
  noLocale?: boolean;
  noTheme?: boolean;
  noUser?: boolean;
  noMenuToggle?: boolean;
}

export interface HeaderConfig {
  
  title?: HeaderTitle;
  
  breadcrumbs?: Breadcrumb;
  
  help?: string;

  locale?: LocaleConfig;

  theme?: AppTheme;

  user?: UserConfig;

  extra?: typeof LitElement | string;

  option?: HeaderOption;

}
