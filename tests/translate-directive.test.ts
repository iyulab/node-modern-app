// @vitest-environment happy-dom
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { html, render } from 'lit';
import i18next from 'i18next';
import { translate } from '../src/index.js';

/**
 * `translate()` — `app.load({ i18n })` 가 초기화하는 i18next 에 붙는 반응형 번역 디렉티브.
 *
 * 종전에는 이 패키지의 문서가 소비자에게 서드파티(`lit-i18n`)를 설치하라고 안내했다 — 사이드바
 * `label` 이 `string | DirectiveResult` 로 **디렉티브를 전제로** 설계돼 있는데, i18next 를 소유한
 * 이 패키지가 그 디렉티브를 내놓지 않았기 때문이다.
 *
 * 고정하는 것: ⑴현재 언어의 문자열 ⑵언어 변경에 따라 갱신 ⑶나중에 도착한 리소스(백엔드 로드)에
 * 따라 갱신 ⑷초기화 전에는 빈 문자열, 초기화되면 채워진다 ⑸속성 자리에서도 동작 ⑹분리된 템플릿은
 * 구독을 풀고, 다시 붙으면 그 사이의 변경을 반영한다 ⑺보간 옵션.
 */
const RESOURCES = {
  en: { common: { hello: 'Hello', greet: 'Hi {{name}}' } },
  ko: { common: { hello: '안녕', greet: '{{name}}님 안녕' } },
};

const listeners = () => (i18next as unknown as { observers: Record<string, Map<unknown, number>> })
  .observers?.languageChanged?.size ?? 0;

describe('translate() directive', () => {
  let host: HTMLDivElement;

  beforeEach(async () => {
    await i18next.init({
      lng: 'en',
      resources: RESOURCES,
      ns: ['common'],
      defaultNS: 'common',
      nsSeparator: '::',
      initAsync: false,
    });
    host = document.createElement('div');
    document.body.appendChild(host);
  });

  afterEach(() => {
    render(html``, host);
    host.remove();
  });

  it('renders the current language', () => {
    render(html`<p>${translate('common::hello')}</p>`, host);
    expect(host.textContent).toBe('Hello');
  });

  it('🔴updates when the language changes', async () => {
    render(html`<p>${translate('common::hello')}</p>`, host);
    await i18next.changeLanguage('ko');
    expect(host.textContent).toBe('안녕');
    await i18next.changeLanguage('en');
    expect(host.textContent).toBe('Hello');
  });

  it('updates when resources arrive later (a backend loading a namespace)', () => {
    render(html`<p>${translate('late::word')}</p>`, host);
    i18next.addResourceBundle('en', 'late', { word: 'Arrived' });
    expect(host.textContent).toBe('Arrived');
  });

  it('works in an attribute position', async () => {
    render(html`<span title=${translate('common::hello')}></span>`, host);
    expect(host.querySelector('span')!.title).toBe('Hello');
    await i18next.changeLanguage('ko');
    expect(host.querySelector('span')!.title).toBe('안녕');
    await i18next.changeLanguage('en');
  });

  it('passes interpolation options through', () => {
    render(html`<p>${translate('common::greet', { name: 'Kim' })}</p>`, host);
    expect(host.textContent).toBe('Hi Kim');
  });

  it('🔴releases its subscription when the template is disconnected, and catches up on reconnect', async () => {
    const before = listeners();
    const part = render(html`<p>${translate('common::hello')}</p>`, host);
    expect(listeners()).toBe(before + 1);
    part.setConnected(false);
    expect(listeners()).toBe(before);
    await i18next.changeLanguage('ko');
    expect(host.textContent).toBe('Hello'); // not updated while disconnected
    part.setConnected(true);
    expect(host.textContent).toBe('안녕');
    expect(listeners()).toBe(before + 1);
    await i18next.changeLanguage('en');
  });

  it('subscribes once per directive, not once per render', () => {
    const before = listeners();
    for (let i = 0; i < 5; i += 1) render(html`<p>${translate('common::hello')}</p>`, host);
    expect(listeners()).toBe(before + 1);
  });
});
