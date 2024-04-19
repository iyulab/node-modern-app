import type { LitElement } from "lit";
import type { 
  SingleMenuModel, 
  GroupMenuModel, 
  MenuDividerModel 
} from "../components/sidebar-parts";

export type NavMenuModel = ( SingleMenuModel | GroupMenuModel ) & {
  type?: undefined;
}

export type MenuItem = NavMenuModel | MenuDividerModel;

export interface SidebarOption {
  noSidebar?: boolean;
}

export interface SidebarModel {

  backgroundColor?: string;

  header?: typeof LitElement | string;

  footer?: typeof LitElement | string;

  menuItem?: MenuItem[];

  option?: SidebarOption;

}
