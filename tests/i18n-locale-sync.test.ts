// @vitest-environment happy-dom
import { describe, it, expect, afterEach } from 'vitest';
import { app } from '../src/App.js';
import i18next from 'i18next';
import { Locale } from '@iyulab/components/dist/utilities/Locale.js';

/**
 * `i18n` 을 설정한 앱에서 i18next 가 언어의 정본이다 — 그 언어가 components `Locale`(셸·컴포넌트 chrome)과 `<html lang>` 으로 간다.
 * 종전에는 `i18next.changeLanguage('ko')` 가 앱 문장만 바꾸고 chrome 은 옛 언어였고, 첫 로드에서도 둘이 갈릴 수 있었다.
 */
const load = (lng: string) => app.load({
  root: document.body.appendChild(document.createElement('div')),
  layout: { type: 'sidebar' },
  initialLoad: false,
  auth: { me: () => null, renderLogin: () => {} },
  i18n: { lng, resources: { en: { translation: {} }, ko: { translation: {} } } },
  routes: [],
});

describe('i18next → components Locale · <html lang>', () => {
  afterEach(() => { app.unload(); Locale.set('en'); document.documentElement.removeAttribute('lang'); });

  it('첫 로드에서 i18next 언어를 따른다', async () => {
    Locale.set('en');
    document.documentElement.lang = 'en';
    await load('ko');
    expect(Locale.get()).toBe('ko');
    expect(document.documentElement.lang).toBe('ko');
  });

  it('changeLanguage 를 따라간다', async () => {
    await load('en');
    expect(Locale.get()).toBe('en');
    await i18next.changeLanguage('ko');
    expect(Locale.get()).toBe('ko');
    expect(document.documentElement.lang).toBe('ko');
  });

  it('NEGATIVE — unload 뒤에는 따라가지 않는다(이중 구독도 없다)', async () => {
    await load('en');
    app.unload();
    await i18next.changeLanguage('ko');
    expect(Locale.get()).toBe('en');
  });

  it('NEGATIVE — i18n 을 설정하지 않은 앱은 Locale 을 건드리지 않는다', async () => {
    Locale.set('ko');
    await app.load({ root: document.body.appendChild(document.createElement('div')), layout: { type: 'sidebar' }, initialLoad: false, auth: { me: () => null, renderLogin: () => {} }, routes: [] });
    expect(Locale.get()).toBe('ko');
  });
});
