// @vitest-environment happy-dom
import { describe, it, expect, afterEach, vi } from 'vitest';
import { app } from '../src/App.js';

describe('AppConfig.auth — 부팅 인증 게이트', () => {
  afterEach(() => {
    app.unload();
  });

  function freshRoot() {
    const root = document.createElement('div');
    document.body.appendChild(root);
    return root;
  }

  it('미인증(me→null)이면 셸 대신 renderLogin 이 호출되고 라우터는 만들어지지 않는다', async () => {
    const root = freshRoot();
    const renderLogin = vi.fn();

    await app.load({
      root,
      layout: { type: 'sidebar' },
      initialLoad: false,
      auth: { me: () => null, renderLogin },
      routes: [{ path: '/home', render: () => document.createElement('section') }],
    });

    expect(renderLogin).toHaveBeenCalledTimes(1);
    expect(renderLogin.mock.calls[0][0].root).toBe(root);
    expect(app.router).toBeUndefined();
    expect(app.user).toBeUndefined();
  });

  it('인증(me→user)이면 셸이 로드되고 app.user 가 채워지며 onAuthenticated 가 호출된다', async () => {
    const root = freshRoot();
    const onAuthenticated = vi.fn();
    const user = { Id: 'u1', Permissions: ['orders.read'] };

    await app.load({
      root,
      layout: { type: 'sidebar' },
      initialLoad: false,
      auth: { me: async () => user, renderLogin: () => {}, onAuthenticated },
      routes: [{ path: '/home', render: () => document.createElement('section') }],
    });

    expect(app.router).toBeDefined();
    expect(app.user).toBe(user);
    expect(onAuthenticated).toHaveBeenCalledWith(user);
  });

  it('로그인 성공(onSuccess) 시 앱이 재로드되어 셸이 나타나고 로그인 UI 가 정리된다', async () => {
    const root = freshRoot();
    let authed = false;
    const teardown = vi.fn();
    let capturedOnSuccess: (() => void) | undefined;

    await app.load({
      root,
      layout: { type: 'sidebar' },
      initialLoad: false,
      auth: {
        me: () => (authed ? { Id: 'u1' } : null),
        renderLogin: ({ onSuccess }) => {
          capturedOnSuccess = onSuccess;
          return teardown;
        },
      },
      routes: [{ path: '/home', render: () => document.createElement('section') }],
    });

    // 처음엔 미인증 → 셸 없음
    expect(app.router).toBeUndefined();

    // 로그인 성공 시뮬레이션 — onSuccess 는 load()를 fire-and-forget 재실행하므로 셸 빌드 완료를 폴링한다.
    authed = true;
    capturedOnSuccess!();
    await vi.waitFor(() => expect(app.router).toBeDefined(), { timeout: 2000 });

    expect(teardown).toHaveBeenCalled(); // 로그인 UI 정리됨
    expect(app.user).toEqual({ Id: 'u1' });
  });

  it('auth 미지정 시 기존 동작 그대로(게이트 없이 셸 로드)', async () => {
    const root = freshRoot();
    await app.load({
      root,
      layout: { type: 'sidebar' },
      initialLoad: false,
      routes: [{ path: '/home', render: () => document.createElement('section') }],
    });
    expect(app.router).toBeDefined();
    expect(app.user).toBeUndefined();
  });
});
