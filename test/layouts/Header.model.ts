import type { LitElement } from "lit";
import type { 
  BreadcrumbModel,
  HeaderTitleModel,
  LocaleModel,
  UserModel,
  HelpModel
} from "../components/header-parts";

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

export interface HeaderModel {

  backgroundColor?: string;
  
  title?: HeaderTitleModel;
  
  breadcrumbs?: BreadcrumbModel;
  
  help?: HelpModel;

  locale?: LocaleModel;

  user?: UserModel;

  extra?: typeof LitElement | string;

  option?: HeaderOption;

}
