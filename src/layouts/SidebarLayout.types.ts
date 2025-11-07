/**
 * Sidebar 설정 인터페이스 
 */ 
export interface SidebarLayoutConfig {
  type: 'sidebar';

  /** 로고 설정 */
  logo: SidebarLogoConfig;
  /** 네비게이션 아이템들 */
  navItems?: SidebarNavConfig[];
  /** 하단 버튼들 */
  buttons?: SidebarButtonConfig[];
}

/** Logo Item 타입 */
export interface SidebarLogoConfig {
  /** 로고 아이콘 svg 파일의 이름 */
  icon: string;
  /** 로고 텍스트 */
  label?: string;
}

/** Navigation Item 타입 */
export interface SidebarNavConfig {
  /** 아이콘 이름 */
  icon: string;
  /** 네비게이션 아이템 레이블 */
  label?: string;
  /** 라우트 경로 */
  path?: string;
  /** 하위 네비게이션 아이템들 */
  children?: SidebarNavConfig[];
  /** 구분선 표시 여부 */
  divider?: boolean;
}

/** Button Config 타입 */
export interface SidebarButtonConfig {
  /** 아이콘 이름 */
  icon: string;
  /** 버튼 레이블 */
  label?: string;
  /** 클릭 액션 */
  onClick?: (event: MouseEvent) => void;
}