import React from "react";
import { Router } from "@remix-run/router";
import { RouteObject } from "react-router-dom";
import { MenuItem, LayoutStore, RouteExt } from "@iyulab/modern-app/stores";
export declare abstract class StartupBase {
    abstract title?: string;
    abstract logo?: string;
    abstract helpPath?: string;
    abstract basePath?: string;
    abstract baseElement?: React.ReactNode;
    abstract errorElement?: React.ReactNode;
    abstract otherShells?: RouteObject[];
    abstract initMainMenuItems(): MenuItem[];
    abstract initRoutes(): RouteExt[];
    layout: LayoutStore;
    topBarOptions: import("../layouts/TopBarOptions").TopBarOptions;
    init(): Router;
    run(): void;
}
//# sourceMappingURL=StartupBase.d.ts.map