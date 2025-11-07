// Modern App 공통 컴포넌트들

import { ProgressBar } from './ProgressBar.js';
import { NavItem } from './NavItem.js';
import { SidebarLogo } from './SidebarLogo.js';

ProgressBar.define("u-progress-bar");
NavItem.define("u-nav-item");
SidebarLogo.define("sb-logo");

declare global {
  interface HTMLElementTagNameMap {
    'u-progress-bar': ProgressBar;
    'u-nav-item': NavItem;
    'sb-logo': SidebarLogo;
  }
}

export {
  ProgressBar,
  NavItem,
  SidebarLogo,
};