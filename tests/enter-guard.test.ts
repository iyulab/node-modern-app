// @vitest-environment happy-dom
import { describe, it, expect, afterEach } from 'vitest';
import { app } from '../src/App.js';
import { AccessDeniedError, NotFoundError, RouteError } from '../src/index.js';

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
  it('🔴fallback 이 «권한 거부»와 «없는 경로»를 이 패키지의 export 로 가른다(#948)', async () => {
    // 종전에는 오류 클래스가 `@iyulab/router` 에서만 나와, 소비앱이 그 의존을 직접 선언하거나 자기 권한표로 다시 판정했다.
    const root = document.createElement('div');
    document.body.appendChild(root);
    const seen: RouteError[] = [];

    await app.load({
      root,
      layout: { type: 'sidebar' },
      initialLoad: false,
      enter: (ctx) => ctx.pathname !== '/admin',
      routes: [{ path: '/admin', render: () => document.createElement('section') }],
      fallback: {
        render: (ctx) => {
          seen.push(ctx.error);
          const el = document.createElement('u-empty-state');
          el.setAttribute('variant', ctx.error instanceof AccessDeniedError ? 'no-access' : 'error');
          return el;
        },
      },
    });

    await app.router!.go('/admin');
    await app.router!.go('/nowhere');
    expect(seen).toHaveLength(2);
    expect(seen[0]).toBeInstanceOf(AccessDeniedError);
    expect(seen[0].code).toBe(403);
    expect(seen[1]).toBeInstanceOf(NotFoundError);
    expect(seen[1]).not.toBeInstanceOf(AccessDeniedError);
  });
});
