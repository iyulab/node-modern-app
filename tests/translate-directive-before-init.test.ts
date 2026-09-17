// @vitest-environment happy-dom
import { describe, it, expect } from 'vitest';
import { html, render } from 'lit';
import i18next from 'i18next';
import { translate } from '../src/index.js';

/**
 * 셸 설정(사이드바 `label`)은 `app.load()` 가 i18next 를 초기화하기 **전에** 만들어진다 — 디렉티브가
 * 그보다 먼저 그려질 수 있어야 한다. 이 파일은 싱글턴이 아직 초기화되지 않은 상태에서 시작한다
 * (vitest 가 파일마다 모듈을 격리한다).
 */
describe('translate() before i18next is initialized', () => {
  it('renders an empty string (not the key), then fills in once i18next initializes', async () => {
    expect(i18next.isInitialized).toBeFalsy();
    const host = document.createElement('div');
    document.body.appendChild(host);
    render(html`<p>${translate('common::hello')}</p>`, host);
    expect(host.textContent).toBe('');

    await i18next.init({
      lng: 'en',
      resources: { en: { common: { hello: 'Hello' } } },
      ns: ['common'],
      nsSeparator: '::',
    });
    expect(host.textContent).toBe('Hello');
    host.remove();
  });
});
