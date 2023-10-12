import { ReactNode } from "react";
import { RouteObject } from "react-router-dom";

import { StartupBase } from "@iyulab/modern-app/core/StartupBase";
import { MenuItem } from "@iyulab/modern-app/stores/MenuStore";
import { RouteExt } from "@iyulab/modern-app/stores/LocatorStore";

import App from "./App";
import { HomePage } from "./pages";

class Startup extends StartupBase {
  
  // layout 상단 타이틀
  title?: string = "IYULAB APP SAMPLE";

  // layout 상단 로고
  logo?: string;

  // 도움말 페이지 경로
  helpPath?: string;

  // 기본 경로
  basePath?: string;

  // 기본 레이아웃 엘리먼트 (default: <AppShell />)
  baseElement?: ReactNode = (<App />);

  // 에러 페이지 (default: <ErrorPage />)
  errorElement?: ReactNode;

  // 기본 레이아웃 이외의 독립적인 레이아웃 엘리먼트
  otherShells?: RouteObject[];

  // 네비게이션 메뉴(key값 중복 불가, route key와 동일하게 설정)
  initMainMenuItems(): MenuItem[] {
    return [
      {
        type: "single",
        key: "home",
        display: "Home",
      },
      {
        type: "blank"
      },
      {
        type: "group",
        display: "Group Menu",
        subMenu: [
          {
            key: "group-menu",
            display: "Group Menu",
          },
          {
            key: "group-menu-1",
            display: "Group Menu 1",
          }
        ]
      }
    ];
  }

  // 라우트 설정(key값 중복 불가, menu key와 동일하게 설정)
  initRoutes(): RouteExt[] {
    return [
      {
        key: "home",
        path: "/",
        element: <HomePage />,
      },
      {
        key: "group-menu",
        path: "/group",
        element: <HomePage />,
        children: [
          {
            key: "group-menu-1",
            path: "1",
            useParam: true,
          },
        ],
      },
    ];
  }

}

export default new Startup();
