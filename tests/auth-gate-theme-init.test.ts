// @vitest-environment happy-dom
import { describe, it, expect, afterEach } from 'vitest';
import { app } from '../src/App.js';
import { Theme } from '@iyulab/components/dist/utilities/Theme.js';

describe('AppConfig.auth — 미인증 상태(renderLogin 경로)에서도 테마가 적용된다', () => {
  afterEach(() => {
    app.unload();
  });

  it('me()→null 이어도 Theme.init 이 실행돼 토큰 스타일시트가 문서에 주입된다', async () => {
    const root = document.createElement('div');
    document.body.appendChild(root);

    await app.load({
      root,
      layout: { type: 'sidebar' },
      initialLoad: false,
      auth: { me: () => null, renderLogin: () => {} },
      routes: [{ path: '/home', render: () => document.createElement('section') }],
    });

    expect(Theme.isInitialized).toBe(true);
    expect(document.head.querySelector('style[data-name="light"]')).not.toBeNull();
  });
});
