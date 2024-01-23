import { DI } from "../core";

// interface 이름(AppSettings) const 이름(AppSettings)은 같도록 의도되었습니다.
export interface AppSettings {
  getServiceURL(): string | null;
  getAccessToken(): string | null;

  get<T>(key: string): T;
  set<T>(key: string, value: T): void;
}

export const AppSettings = DI.createService<AppSettings>();

export const resolveAppSettings = () => DI.resolve<AppSettings>(AppSettings)!;

export abstract class AppSettingsBase implements AppSettings {
  private settings: Map<string, any> = new Map();

  getServiceURL(): string | null {
    return null;
  }
  
  getAccessToken(): string | null {
    return null;
  }

  get<T>(key: string): T {
    if (this.settings.has(key)) {
      return this.settings.get(key) as T;
    } else {
      // 값이 없는 경우 처리. 여기서는 예외를 발생시킴.
      throw new Error(`No value found for key: ${key}`);
    }
  }

  set<T>(key: string, value: T): void {
    this.settings.set(key, value);
  }
}


/* Usage 
// service-registration.ts
import { DI } from "@iyulab/modern-app";
import {AppSettings} from "@iyulab/modern-app/settings"; 
import { LocalAppSettings } from "./LocalAppSettings";

DI.register(AppSettings, new LocalAppSettings());

// LocalAppSettings.ts
import { AppSettingsBase } from "@iyulab/modern-app/settings";

export class LocalAppSettings extends AppSettingsBase {

  override getServiceURL(): string | null {
    if (import.meta.env.DEV === true) {
      return "https://localhost:7040";
    } else {
      return null;
    }
  }  
}
*/