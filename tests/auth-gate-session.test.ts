// @vitest-environment happy-dom
import { describe, it, expect, afterEach, vi } from 'vitest';
import { app } from '../src/App.js';
import type { AuthGateConfig } from '../src/types/AuthConfig.js';

/**
 * `me()` 의 답은 `status` 로 가른다 — 세션 조회 클라이언트가 돌려주는 판별 유니온을 그대로 받는다.
 * «미인증»을 객체로 돌려주는 클라이언트를 «값이 있으니 인증됨»으로 읽으면 로그인하지 않은 사용자에게 셸이 열린다.
 */
describe('AppConfig.auth — 세션 답(status)', () => {
  afterEach(() => {
    app.unload();
  });

  const routes = [{ path: '/home', render: () => document.createElement('section') }];

  function load(auth: AuthGateConfig) {
    const root = document.createElement('div');
    document.body.appendChild(root);
    return { root, done: app.load({ root, layout: { type: 'sidebar' }, initialLoad: false, auth, routes }) };
  }

  it('🔴anonymous 객체는 인증이 아니다 — 셸 대신 로그인 UI, app.user 는 비어 있다', async () => {
    const renderLogin = vi.fn();
    const { done } = load({ me: async () => ({ status: 'anonymous' }), renderLogin });
    await done;

    expect(renderLogin).toHaveBeenCalledTimes(1);
    expect(app.router).toBeUndefined();
    expect(app.user).toBeUndefined();
  });

  it('🔴unknown 은 로그인이 아니라 renderUnavailable — 답의 error 를 넘긴다', async () => {
    const renderLogin = vi.fn();
    const renderUnavailable = vi.fn();
    const error = { status: 503, message: 'Could not verify the session.' };
    const { root, done } = load({ me: () => ({ status: 'unknown', error }), renderLogin, renderUnavailable });
    await done;

    expect(renderLogin).not.toHaveBeenCalled();
    expect(renderUnavailable).toHaveBeenCalledTimes(1);
    expect(renderUnavailable.mock.calls[0][0].root).toBe(root);
    expect(renderUnavailable.mock.calls[0][0].error).toBe(error);
    expect(app.router).toBeUndefined();
  });

  it('unknown 인데 renderUnavailable 이 없으면 load 가 그 error 로 실패한다', async () => {
    const renderLogin = vi.fn();
    const error = new Error('offline');
    const { done } = load({ me: () => ({ status: 'unknown', error }), renderLogin });

    await expect(done).rejects.toBe(error);
    expect(renderLogin).not.toHaveBeenCalled();
  });

  it('authenticated 면 app.user 는 세션 답이 아니라 user 다', async () => {
    const user = { Id: 'u1', userName: 'kim' };
    const onAuthenticated = vi.fn();
    const { done } = load({ me: () => ({ status: 'authenticated', user }), renderLogin: () => {}, onAuthenticated });
    await done;

    expect(app.router).toBeDefined();
    expect(app.user).toBe(user);
    expect(onAuthenticated).toHaveBeenCalledWith(user);
  });

  it('🔴판별되지 않는 답(사용자 객체 · null)은 인증으로 추측하지 않는다 — TypeError, 셸도 로그인 UI 도 없다', async () => {
    for (const answer of [{ Id: 'u1' }, null, undefined, { status: 'signed-in' }]) {
      const renderLogin = vi.fn();
      const { done } = load({ me: () => answer as never, renderLogin });

      await expect(done).rejects.toBeInstanceOf(TypeError);
      expect(renderLogin).not.toHaveBeenCalled();
      expect(app.router).toBeUndefined();
      expect(app.user).toBeUndefined();
      app.unload();
    }
  });
});
