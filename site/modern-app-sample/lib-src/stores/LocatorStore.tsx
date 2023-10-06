import { createBrowserRouter } from "react-router-dom";
import { RouteObject } from "react-router-dom";
import type { Router } from "@remix-run/router";

import { makeAutoObservable } from "mobx";

import { AppShell } from '@iyulab/modern-app/layouts/AppShell';
import { ErrorPage } from '@iyulab/modern-app/layouts/ErrorPage';

export type RouteExt = RouteObject & {
  key: string;
  useParam?: boolean;
  // display?: string;
}

export type CurrentLocation = {
  key: string;
  request: Request;
  fullPaths?: string[];
  paths?: string[];
  query?: object;
}

type callback = (current: CurrentLocation) => void;

export class LocatorStore {

  static readonly LOCATION_CHANGED_NAME = "location-changed";  
  
  private helpPath: string = "/help";
  private basePath: string = "/";
  private routes: Map<string, RouteObject> = new Map<string, RouteObject>();
  private router?: Router = undefined;
  
  currentlocation?: CurrentLocation = undefined;
  private eventHandler: Map<string, callback> = new Map<string, callback>();
  private _progress: number = 0;
  private loading: boolean = false;

  get helpUrl() {
    return this.helpPath;
  }

  get baseUrl() {
    return this.basePath;
  }

  get url() {
    if(this.currentlocation) {
      return new URL(this.currentlocation?.request.url);
    } else {
      return new URL(window.location.href);
    }
  }

  get path() {
    return this.url.pathname;
  }

  get query() {
    return Object.fromEntries(this.url.searchParams.entries());
  }

  set progress(value: number) {
    if(value > 100) value = 100;
    if(value < 20) value = 20;

    if(value === 100) {
      this.loading = false;
    } else {
      this.loading = true;
    }

    this._progress = value / 100;
  }

  get progress() {
    return this._progress;
  }

  get isLoading() {
    return this.loading;
  }

  private onLocationChanged(current: CurrentLocation): void {
    window.dispatchEvent(new CustomEvent(LocatorStore.LOCATION_CHANGED_NAME, {
      detail: current,
    }));
  }

  // 설정한 key값과 일치하는 로케이션 체인지 이벤트가 발생하면 callback을 실행한다.
  addChangedEvent(key:string, callback: callback): void {
    this.eventHandler.set(key, callback);
  }

  // 설정한 key값과 일치하는 로케이션 체인지 이벤트를 제거한다.
  removeChangedEvent(key:string): void {
    this.eventHandler.delete(key);
  }

  constructor() {
    makeAutoObservable(this);
  }

  initLocator(
      routes: RouteExt[],
      helpPath?: string,
      basePath?: string,
      baseElement?: React.ReactNode,
      errorElement?: React.ReactNode,
      otherShells?: RouteExt[],
    ) : Router {
    
    // 1. base/help Path 설정
    this.basePath = basePath ?? this.basePath;
    if(!this.basePath.startsWith("/")) {
      this.basePath = `/${this.basePath}`;
    }
    this.helpPath = helpPath ?? this.helpPath;
    if(!this.helpPath.startsWith("/")) {
      this.helpPath = `/${this.helpPath}`;
    }

    // 2. routes 설정
    routes.map((x:RouteExt) => {
      const { key, useParam, ...route } = x;

      if(!route.path) throw new Error("path is required");
      if(!key) throw new Error("key is required");

      // 2.1 path validation
      if(route.path === '/' || route.index === true) {
        route.path = '';
        route.index = true;
      }

      if (route.path.startsWith("/") && route.path.length > 1) {
        route.path = route.path.substring(1, route.path.length);
      }

      if (route.path.endsWith("/") && route.path.length > 1) {
        route.path = route.path.substring(0, route.path.length - 1);
      }

      if (useParam) {
        route.path = `${route.path}/:id?`;
      }

      // 2.2 url get 요청시 이벤트 핸들러 설정
      route.loader = ({ request, params }) => {
        // 2.2.0 페이지 로딩 시작
        if(request.url !== this.currentlocation?.request.url) {
          this.progress = 20;
        }

        const url = new URL(request.url);
        const fullPaths = url.pathname.replace(this.basePath, "").split("/").filter(x => x.length > 0);
        const paths = params.id?.split("/").filter(x => x.length > 0);
        const query = Object.fromEntries(url.searchParams.entries());

        this.currentlocation = {
          key: key,
          request: request,
          fullPaths: fullPaths,
          paths: paths,
          query: query,
        }

        // 2.2.1 윈도우 이벤트 발생
        this.onLocationChanged(this.currentlocation);

        // 2.2.2 이벤트 핸들러 실행
        if(this.eventHandler.has(key)) {
          const callback = this.eventHandler.get(key);
          if(callback) callback(this.currentlocation);
        }

        return new Response(null, { status: 200 });
      }

      // 2.3 key 중복 체크
      if(this.routes.has(key)) {
        console.error(`route key '${key}' is duplicated. route will be overwritten.`);
      }

      this.routes.set(key, route);
    });

    // 3. router 설정
    const baseRoutes: RouteObject[] = [
      {
        path: this.basePath,
        element: baseElement ?? <AppShell />,
        errorElement: this.basePath === '/' ? errorElement ?? <ErrorPage /> : undefined,
        children: Array.from(this.routes.values() ?? []),
      }
    ]

    if(otherShells) {
      baseRoutes.push(...otherShells);
    }

    if(this.basePath !== "/") {
      baseRoutes.push({
        path: '',
        element: (<><pre>  WRONG URL! Base Path: [{this.basePath}]  </pre></>),
        errorElement: errorElement ?? <ErrorPage />,
      });
    }

    // 4. router 생성
    this.router = createBrowserRouter([
      ...baseRoutes
    ]);

    // 5. router 반환
    return this.router;
  }

  go(path: string) {
    this.router?.navigate(path);
  }

  goBack() {
    this.router?.navigate(-1);
  }

  goForward() {
    this.router?.navigate(1);
  }

  reload() {
    this.router?.navigate(0);
  }

}
