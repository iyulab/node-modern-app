import { DI } from '../../core';
import { AppSettings } from '../../settings';
import config from 'devextreme/core/config';

const appSettings = DI.resolve<AppSettings>(AppSettings);
if (appSettings) {
  config({
    licenseKey: appSettings.get<string>("dxKey")
  });
} else {
  console.log("appSettings is null");
}
