// @vitest-environment happy-dom
import { describe, it, expect, afterEach } from 'vitest';
import { app } from '../src/App.js';
import i18next from 'i18next';

describe('AppConfig.auth — 미인증 상태(renderLogin 경로)에서도 i18next가 초기화된다', () => {
  afterEach(() => {
    app.unload();
  });

  it('me()→null 이어도 i18next.init 이 실행돼 로그인 화면에서 t() 가 번역을 반환한다', async () => {
    const root = document.createElement('div');
    document.body.appendChild(root);

    await app.load({
      root,
      layout: { type: 'sidebar' },
      initialLoad: false,
      auth: { me: () => null, renderLogin: () => {} },
      i18n: {
        lng: 'en',
        resources: { en: { translation: { greeting: 'Hello' } } },
      },
      routes: [{ path: '/home', render: () => document.createElement('section') }],
    });

    expect(i18next.isInitialized).toBe(true);
    expect(i18next.t('greeting')).toBe('Hello');
  });
});
