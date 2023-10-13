import { ReactNode } from "react";
import { RouteObject } from "react-router-dom";

import { StartupBase } from "@iyulab/modern-app/core/StartupBase";
import { MenuItem } from "@iyulab/modern-app/stores/MenuStore";
import { RouteExt } from "@iyulab/modern-app/stores/LocatorStore";

import App from "./App";
import { HomePage, LitPage, ReactPage, MixPage, SettingPage, UserPage } from "./pages";
import { setting } from "@iyulab/modern-app/layouts/IconVector";

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
        display: "Single Menu",
      },
      {
        type: "separator",
        height: 5,
      },
      {
        type: "group",
        display: "Group Menu",
        subMenu: [
          {
            key: "mix",
            display: "Mix Component",
          },
          {
            key: "lit",
            display: "Lit Element",
          },
          {
            key: "react",
            display: "React Component",
          }
        ]
      },
      {
        type: "separator",
        line: true,
      },
      {
        type: "group",
        display: "Setting",
        iconData: setting,
        subMenu: [
          {
            key: "settingIndex",
            display: "General",
          },
          {
            key: "user",
            display: "User",
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
        element: <HomePage />,
        index: true,
      },
      {
        key: "component",
        path: "/component",
        children: [
          {
            key: "mix",
            index: true,
            element: <MixPage />,
          },
          {
            key: "lit",
            path: "lit",
            element: <LitPage />,
            useParam: true,
          },
          {
            key: "react",
            path: "react",
            element: <ReactPage />,
            useParam: true,
          },
        ],
      },
      {
        key: "setting",
        path: "/setting",
        children: [
          {
            key: "settingIndex",
            index: true,
            element: <SettingPage />
          },
          {
            key: "user",
            path: "user",
            element: <UserPage />,
          },
        ]
      }
    ];
  }

}

export default new Startup();
