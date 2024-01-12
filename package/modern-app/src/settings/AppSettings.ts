import { DI } from "../core";

// interface 이름(AppSettings) const 이름(AppSettings)은 같도록 의도되었습니다.
export interface AppSettings {
  getServiceURL(): string | null;
  getAccessToken(): string | null;
}

export const AppSettings = DI.createService<AppSettings>();

/* Usage 
// service-registration.ts
import { DI } from "@iyulab/modern-app";
import {AppSettings} from "@iyulab/modern-app/settings"; 
import { DefaultAppSettings } from "./DefaultAppSettings";

DI.register(AppSettings, new DefaultAppSettings());
*/