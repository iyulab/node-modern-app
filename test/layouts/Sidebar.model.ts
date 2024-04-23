import type { LitElement } from "lit";
import type { 
  SingleMenuModel, 
  GroupMenuModel, 
  MenuDividerModel 
} from "../components/sidebar-parts";

export type MenuItem = ( SingleMenuModel | GroupMenuModel | MenuDividerModel ) & {
  position?: 'top' | 'bottom';
}

export interface SidebarOption {
  noSidebar?: boolean;
}

export interface SidebarModel {

  header?: typeof LitElement | string;

  footer?: typeof LitElement | string;

  menu?: MenuItem[];

  option?: SidebarOption;

  backgroundColor?: string;

}
