import { App } from './App';

export * from './components';
export * from './layouts';
export type * from './types/AppConfigs.js';
export type * from './types/AppOptions.js';
export type * from './types/AppTypes.js';

/** 전역 앱 인스턴스 */
export const app = App.instance;