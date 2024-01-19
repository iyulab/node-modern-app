import { DI } from '@iyulab/modern-app/core';
import { AppSettings } from '@iyulab/modern-app/settings';
import config from 'devextreme/core/config';

const appSettings = DI.resolve<AppSettings>(AppSettings);
if (appSettings) {
  config({
    licenseKey: appSettings.get<string>("dxKey")
  });
} else {
  console.log("appSettings is null");
}
