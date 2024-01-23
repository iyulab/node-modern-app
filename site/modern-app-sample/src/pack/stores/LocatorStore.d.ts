import { RouteObject, IndexRouteObject, NonIndexRouteObject } from "react-router-dom";
import type { Router } from "@remix-run/router";
interface IndexRouteExt extends IndexRouteObject {
    key: string;
    useParam?: undefined;
}
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
export declare class LocatorStore {
    static readonly LOCATION_CHANGED_NAME = "location-changed";
    routeData: any;
    private helpPath;
    private basePath;
    private keyPath;
    private router?;
    private currentlocation?;
    private eventHandler;
    private _progress;
    private loading;
    get helpUrl(): string;
    get baseUrl(): string;
    get current(): CurrentLocation | undefined;
    set progress(value: number);
    get progress(): number;
    get isLoading(): boolean;
    constructor();
    initLocator(routes: RouteExt[], helpPath?: string, basePath?: string, baseElement?: React.ReactNode, errorElement?: React.ReactNode, otherShells?: RouteObject[]): [Map<string, string>, Router];
    go(path: string, data?: any): void;
    goBack(): void;
    goForward(): void;
    reload(): void;
    addChangedEvent(key: string, callback: callback): void;
    removeChangedEvent(key: string): void;
    private onLocationChanged;
    private setRoute;
    private setRouter;
    getBreadcrumbPaths(): string[];
    getDisplay(index: number): string;
}
export {};
//# sourceMappingURL=LocatorStore.d.ts.map