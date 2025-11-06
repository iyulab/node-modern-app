// Modern App 공통 컴포넌트들

import { ProgressBar } from './ProgressBar.js';
import { NavItem } from './NavItem.js';
import { Logo } from './Logo.js';

ProgressBar.define("app-progress-bar");
NavItem.define("app-nav-item");
Logo.define("app-logo");

declare global {
  interface HTMLElementTagNameMap {
    'app-progress-bar': ProgressBar;
    'app-nav-item': NavItem;
    'app-logo': Logo;
  }
}

export {
  ProgressBar,
  NavItem,
  Logo,
};
