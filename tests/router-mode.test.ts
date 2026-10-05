// @vitest-environment happy-dom
import { describe, it, expect, afterEach } from 'vitest';
import { app } from '../src/App.js';

/**
 * `AppConfig.routerMode` 는 `@iyulab/router` 의 `mode` 로 그대로 간다 — 셸이 라우터를 대신 만들므로, 전달하지 않으면
 * `app.load()` 를 쓰는 앱은 hash 모드를 켤 길이 없다.
 */
describe('AppConfig.routerMode', () => {
  afterEach(() => app.unload());

  const load = (routerMode?: 'history' | 'hash') => {
    const root = document.createElement('div');
    document.body.appendChild(root);
    return app.load({ root, layout: { type: 'sidebar' }, initialLoad: false, routerMode, routes: [] });
  };

  it('🔴hash 를 주면 라우터가 hash 모드다', async () => {
    await load('hash');
    expect(app.router?.mode).toBe('hash');
  });

  it('NEGATIVE 생략하면 history 다', async () => {
    await load();
    expect(app.router?.mode).toBe('history');
  });
});
