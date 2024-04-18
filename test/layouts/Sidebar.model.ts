import type { LitElement } from "lit";

export interface Menu {
  icon?: string;
  display?: string;
  children?: Menu[];
}

export interface SidebarConfig {
  header?: typeof LitElement;
  footer?: typeof LitElement;
  main?: Menu[];
  mainMenu?: Menu[];
  subMenu?: Menu[];
}
