// @vitest-environment happy-dom
import { describe, it, expect, afterEach } from 'vitest';
import { app } from '../src/App.js';

describe('AppConfig.enter — 전역 라우트 가드', () => {
  afterEach(() => {
    app.unload();
  });

  it('전역 enter가 false를 반환하면 라우트 진입이 차단된다(403)', async () => {
    const root = document.createElement('div');
    document.body.appendChild(root);

    await app.load({
      root,
      layout: { type: 'sidebar' },
      initialLoad: false,
      enter: (ctx) => ctx.pathname !== '/admin',
      routes: [
        { path: '/home', render: () => document.createElement('section') },
        { path: '/admin', render: () => document.createElement('section') },
      ],
    });

    await app.router!.go('/home');
    expect(app.router?.context?.pathname).toBe('/home');

    await app.router!.go('/admin');
    // 가드가 차단하면 context는 이전 성공 라우트(/home)에 머문다
    expect(app.router?.context?.pathname).toBe('/home');
  });

  it('전역 enter가 redirect 경로를 반환하면 해당 경로로 이동한다', async () => {
    const root = document.createElement('div');
    document.body.appendChild(root);

    await app.load({
      root,
      layout: { type: 'sidebar' },
      initialLoad: false,
      enter: (ctx) => (ctx.pathname === '/admin' ? '/login' : true),
      routes: [
        { path: '/login', render: () => document.createElement('section') },
        { path: '/admin', render: () => document.createElement('section') },
      ],
    });

    await app.router!.go('/admin');
    expect(app.router?.context?.pathname).toBe('/login');
  });
});
