import { createBrowserRouter } from "react-router-dom";
import { RouteObject, IndexRouteObject, NonIndexRouteObject } from "react-router-dom";
import type { Router } from "@remix-run/router";

import { makeAutoObservable } from "mobx";

import { AppShell } from '@iyulab/modern-app/layouts/AppShell';
import { ErrorPage } from '@iyulab/modern-app/layouts/ErrorPage';

// index route => children이 undefined
interface IndexRouteExt extends IndexRouteObject {
  key: string;
  useParam?: undefined;
}

// children을 오버라이드 했기때문에 router 세팅시 추가된 필드를 제거(라우터 오류 방지 차원)
interface NonIndexRouteExt extends NonIndexRouteObject {
  key: string;
  useParam?: boolean;
  children?: RouteExt[];
}

export type RouteExt = IndexRouteExt | NonIndexRouteExt;

export interface CurrentLocation {
  key: string;
  request: Request;
  url: URL;
  fullPaths?: string[];
  paths?: string[];
  query?: object;
}

type callback = (current: CurrentLocation) => void;

export class LocatorStore {
  
  static readonly LOCATION_CHANGED_NAME = "location-changed";  
  
  public routeData: any = undefined;

  private helpPath: string = "/help";
  private basePath: string = "/";
  private keyPath: Map<string, string> = new Map<string, string>();
  private router?: Router = undefined;
  
  private currentlocation?: CurrentLocation = undefined;
  private eventHandler: Map<string, callback> = new Map<string, callback>();
  private _progress: number = 0;
  private loading: boolean = false;

  get helpUrl() {
    return this.helpPath;
  }

  get baseUrl() {
    return this.basePath;
  }

  get current() {
    return this.currentlocation;
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

  constructor() {
    makeAutoObservable(this);
  }

  initLocator(
      routes: RouteExt[],
      helpPath?: string,
      basePath?: string,
      baseElement?: React.ReactNode,
      errorElement?: React.ReactNode,
      otherShells?: RouteObject[],
    ) : [Map<string,string>, Router] {

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
    const baseRoutes = this.setRoute(routes);

    // 3. router 생성
    const router = this.setRouter(baseRoutes, baseElement, errorElement, otherShells);
    this.router = router;

    return [this.keyPath, this.router];
  }

  go(path: string, data?: any) {
    this.routeData = data;
    if(path.startsWith("/")) {
      this.router?.navigate(path);
    } else {
      this.router?.navigate(`${this.basePath}/${path}`);
    }
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

  // 설정한 key값과 일치하는 로케이션 체인지 이벤트가 발생하면 callback을 실행한다.
  addChangedEvent(key:string, callback: callback): void {
    this.eventHandler.set(key, callback);
  }

  // 설정한 key값과 일치하는 로케이션 체인지 이벤트를 제거한다.
  removeChangedEvent(key:string): void {
    this.eventHandler.delete(key);
  }

  private onLocationChanged(current: CurrentLocation): void {
    window.dispatchEvent(new CustomEvent(LocatorStore.LOCATION_CHANGED_NAME, {
      detail: current,
    }));
  }

  private setRoute(routes: RouteExt[], parentPath?: string) : RouteObject[] {

    return routes.map((r:RouteExt) => {
      
      // 중요!! 커스텀 프로퍼티 제거
      const { key, useParam, children, ...route } = r;

      if(!key) throw new Error("key is required");
      if(parentPath?.endsWith("/:id?")) throw new Error("You cannot use 'useParam' with 'children' in a Route.");

      // 1 path validation
      if(route.path) {
        if(route.path === '' || route.path === '/') {
          // index 설정
          route.path = '';
          route.index = true;
          this.keyPath.set(key, parentPath ? `${parentPath}` : "/");

          if(useParam) throw new Error("You cannot use 'useParam' in 'index route'");
        } else {
          // 상대경로 설정, 앞뒤 '/' 제거
          if (route.path.startsWith("/")) {
            route.path = route.path.substring(1, route.path.length);
          }
          if (route.path.endsWith("/")) {
            route.path = route.path.substring(0, route.path.length - 1);
          }
          // useParam 설정(index는 사용불가)
          if (useParam) {
            route.path = `${route.path}/:id?`;
          }
          this.keyPath.set(key, parentPath ? `${parentPath}/${route.path}` : route.path);
        }
      } else if(route.index) { 
        // index 설정
        route.path = '';
        this.keyPath.set(key, parentPath ? `${parentPath}` : this.basePath);

        if(useParam) throw new Error("You cannot use 'useParam' in 'index route'");
      } else {
        throw new Error("path or index is required");
      }

      const loaderCopy = route.loader;
      // 2 url 요청시 미들웨어 설정
      route.loader = async ({ request, params }) => {
        let newPage = false;
        // 2.1 페이지 로딩 시작 (동일한 페이지 요청시 로딩안함)
        if(request.url !== this.currentlocation?.request.url && !params.id) {
          this.progress = 20;
          newPage = true;
        }

        // 2.2 현재 로케이션 설정
        const url = new URL(request.url);
        const fullPaths = decodeURIComponent(url.pathname).replace(this.basePath, "").split("/").filter(x => x.length > 0);
        const paths = params.id?.split("/").filter(x => x.length > 0);
        const query = Object.fromEntries(url.searchParams.entries());
        
        this.currentlocation = {
          key: key,
          request: request,
          url: url,
          fullPaths: fullPaths,
          paths: paths,
          query: query,
        }

        // 2.3 윈도우 이벤트 발생
        this.onLocationChanged(this.currentlocation);

        // 2.4 등록된 이벤트 핸들러 실행
        if(this.eventHandler.has(key)) {
          const callback = this.eventHandler.get(key);
          if(callback) callback(this.currentlocation);
        }
        if(newPage) this.progress = 40;

        if(loaderCopy) {
          const result = await loaderCopy({ request, params });
          if(newPage) this.progress = 100;
          return result;
        } else {
          if(newPage) this.progress = 100;
          return new Response(null, { status: 200 });
        }
      }

      // 3 children 있을경우 재귀호출(완전 분해후 재조립)
      // children을 가지는 경우, element와 Component는 사용하지 않고, children의 index로 대체
      // (부모 element안에 자식 element가 들어가야하는 구조 때문)
      // children을 가지는 경우 Param 사용불가, children이 param로 취급되기 때문
      if(children) {
        if(route.element || route.Component) {
          throw new Error(`You cannot use 'element' or 'Component' with 'children' in a Route. 
          Please using 'index' in children instead.`);
        }
        if(useParam) {
          throw new Error("You cannot use 'useParam' with 'children' in a Route.");
        }

        (route as RouteObject).children = this.setRoute(children, this.keyPath.get(key));
      }

      // 4 설정된 route 반환
      return route as RouteObject;
    });
  }

  private setRouter(
    routes: RouteObject[], 
    base?: React.ReactNode, 
    error?: React.ReactNode, 
    other?: RouteObject[]
  ) : Router {
    
    // 1 기본 레이아웃 routes 설정
    const baseRoutes: RouteObject[] = [
      {
        path: this.basePath,
        element: base ?? <AppShell />,
        errorElement: this.basePath === '/' ? error ?? <ErrorPage /> : undefined,
        children: routes
      }
    ]
    
    // 2 다른 레이아웃 엘리먼트 설정
    if(other) {
      baseRoutes.push(...other);
    }

    // 3 base path가 '/'가 아닌 경우, 잘못된 url을 처리
    if(this.basePath !== "/") {
      baseRoutes.push({
        path: '',
        element: (<><pre>  WRONG URL! Base Path: [{this.basePath}]  </pre></>),
        errorElement: error ?? <ErrorPage />,
      });
    }

    // 4 router 생성
    return createBrowserRouter([
      ...baseRoutes
    ]);

  }

  // 현재 로케이션의 특정 인덱스의 표시(Display)경로를 가져옵니다.
  getDisplay(index: number): string {
    const path = this.currentlocation?.fullPaths?.at(index);
    if (path == null) return '';

    if (path.match(/^[a-zA-Z]/)) {
      // 첫 문자를 대문자로 변경
      const display = path.charAt(0).toUpperCase() + path.slice(1);
      return display;
    } else {
      return path;
    }
  }
}