import type { LitElement } from "lit";

export interface SingleMenu {
  icon?: string;
  display?: string;
  path?: string;
}

export interface GroupMenu {
  icon: string;
  display: string;
  subMenu: SubMenu[];
}

export interface SubMenu {
  display: string;
  path: string;
}

export interface LineDivider {
  type: 'line';
  thickness?: string;
  color?: string;
  height?: string;
}

export interface BlankDivider {
  type: 'blank';
  height?: string;
}

export interface TextDivider {
  type: 'text';
  display: string;
  color?: string;
  height?: string;
  size?: string;
}

export type MenuItem = SingleMenu | GroupMenu | LineDivider | BlankDivider | TextDivider;

export interface SidebarConfig {
  header?: typeof LitElement | string;
  footer?: typeof LitElement | string;
  menuItem?: MenuItem[];
}
