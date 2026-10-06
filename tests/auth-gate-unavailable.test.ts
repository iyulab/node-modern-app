// @vitest-environment happy-dom
import { describe, it, expect, afterEach, vi } from 'vitest';
import { app } from '../src/App.js';

/**
 * 세션을 «모름»(서버 다운·오프라인) — `me()` 가 던질 때. 미인증이 아니므로 로그인 UI 를 그리지 않고,
 * `renderUnavailable` 이 있으면 그것을, 없으면 `load` 가 그 오류로 실패한다.
 */
describe('AppConfig.auth — 세션 모름', () => {
  afterEach(() => {
    app.unload();
  });

  function freshRoot() {
    const root = document.createElement('div');
    document.body.appendChild(root);
    return root;
  }

  const routes = [{ path: '/home', render: () => document.createElement('section') }];

  it('🔴me 가 던지면 renderLogin 이 아니라 renderUnavailable 이 오류와 함께 불린다', async () => {
    const root = freshRoot();
    const renderLogin = vi.fn();
    const renderUnavailable = vi.fn();
    const failure = new Error('503');

    await app.load({
      root,
      layout: { type: 'sidebar' },
      initialLoad: false,
      auth: { me: async () => { throw failure; }, renderLogin, renderUnavailable },
      routes,
    });

    expect(renderLogin).not.toHaveBeenCalled();
    expect(renderUnavailable).toHaveBeenCalledTimes(1);
    expect(renderUnavailable.mock.calls[0][0].root).toBe(root);
    expect(renderUnavailable.mock.calls[0][0].error).toBe(failure);
    expect(app.router).toBeUndefined();
  });

  it('retry() 로 다시 확인해 셸이 서고 안내 UI 가 정리된다', async () => {
    const root = freshRoot();
    let up = false;
    const teardown = vi.fn();
    let retry: (() => void) | undefined;

    await app.load({
      root,
      layout: { type: 'sidebar' },
      initialLoad: false,
      auth: {
        me: () => { if (!up) throw new Error('offline'); return { Id: 'u1' }; },
        renderLogin: () => {},
        renderUnavailable: (ctx) => { retry = ctx.retry; return teardown; },
      },
      routes,
    });
    expect(app.router).toBeUndefined();

    up = true;
    retry!();
    await vi.waitFor(() => expect(app.router).toBeDefined(), { timeout: 2000 });
    expect(teardown).toHaveBeenCalled();
    expect(app.user).toEqual({ Id: 'u1' });
  });

  it('NEGATIVE renderUnavailable 이 없으면 load 가 그 오류로 실패하고 로그인 UI 는 그리지 않는다', async () => {
    const root = freshRoot();
    const renderLogin = vi.fn();
    const failure = new Error('offline');

    await expect(app.load({
      root,
      layout: { type: 'sidebar' },
      initialLoad: false,
      auth: { me: () => { throw failure; }, renderLogin },
      routes,
    })).rejects.toBe(failure);
    expect(renderLogin).not.toHaveBeenCalled();
  });
});
