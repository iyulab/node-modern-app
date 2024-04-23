import type { LitElement } from "lit";
import type { AppTheme } from "../App";
import type { 
  BreadcrumbModel,
  HeaderTitleModel,
  LocaleModel,
  UserModel,
  HelpModel
} from "../components/header-parts";

export interface HeaderOption {
  noHeader?: boolean;
  noMenuToggle?: boolean;
  noTitle?: boolean;
  noBreadcrumbs?: boolean;
  noHelp?: boolean;
  noLocale?: boolean;
  noTheme?: boolean;
  noUser?: boolean;
}

export interface HeaderAction {
  help?: HelpModel;
  locale?: LocaleModel;
  theme?: AppTheme;
  user?: UserModel;
}

export interface HeaderModel {

  title?: HeaderTitleModel;
  
  breadcrumbs?: BreadcrumbModel;

  center?: typeof LitElement | string;

  action?: HeaderAction;

  option?: HeaderOption;

  backgroundColor?: string;

}
