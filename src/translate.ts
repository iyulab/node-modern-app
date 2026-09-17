import { AsyncDirective, directive } from 'lit/async-directive.js';
import i18next, { type TOptions } from 'i18next';

/**
 * `app.load({ i18n })` 가 초기화하는 i18next 에 붙는 반응형 번역 디렉티브.
 *
 * ★**왜 이 패키지가 갖는가**: i18next 를 초기화하고(`app.load`) 노출하는(`app.i18n`) 것이 이미 이
 *   패키지이고, 셸 설정의 `label` 은 `string | DirectiveResult` 로 **디렉티브를 받도록** 설계돼 있다.
 *   그런데 그 디렉티브가 없어서 소비자는 서드파티를 따로 들여와야 했다 — 이미 소유한 개념의
 *   프리미티브를 내놓지 않은 자리다.
 *
 * ★**구독은 Lit 의 연결 수명 주기로 관리한다** — `disconnected()` 에서 풀고 `reconnected()` 에서 다시
 *   붙으며 그 사이의 변경을 따라잡는다. 주기적으로 끊긴 파트를 훑는 레지스트리가 필요 없다.
 *
 * 갱신 계기는 셋이다: 언어 변경 · 나중에 도착한 리소스(백엔드가 네임스페이스를 늦게 싣는 경우) ·
 * 초기화 완료(셸 설정은 초기화 **전에** 만들어진다 — 그때는 빈 문자열을 그린다. 키를 그리면
 * 번역 전 키가 화면에 잠깐 비친다).
 *
 * @example
 * ```ts
 * import { translate } from '@iyulab/modern-app';
 * html`<h1>${translate('common::title')}</h1>`;
 * app.load({ layout: { type: 'sidebar', main: [{ type: 'link', label: translate('nav::home'), href: '/' }] } });
 * ```
 */
class TranslateDirective extends AsyncDirective {
  private keys: string | string[] = '';
  private options?: TOptions;
  private subscribed = false;

  render(keys: string | string[], options?: TOptions): string {
    this.keys = keys;
    this.options = options;
    if (this.isConnected) this.subscribe();
    return this.translate();
  }

  protected override disconnected(): void {
    this.unsubscribe();
  }

  protected override reconnected(): void {
    this.subscribe();
    this.refresh();
  }

  private translate(): string {
    if (!i18next.isInitialized) return '';
    const value = i18next.t(this.keys, this.options);
    // `returnObjects` 결과는 텍스트로 그릴 수 없다.
    return typeof value === 'string' ? value : '';
  }

  private readonly refresh = (): void => {
    this.setValue(this.translate());
  };

  private subscribe(): void {
    if (this.subscribed) return;
    this.subscribed = true;
    i18next.on('languageChanged', this.refresh);
    i18next.on('initialized', this.refresh);
    i18next.store?.on('added', this.refresh);
  }

  private unsubscribe(): void {
    if (!this.subscribed) return;
    this.subscribed = false;
    i18next.off('languageChanged', this.refresh);
    i18next.off('initialized', this.refresh);
    i18next.store?.off('added', this.refresh);
  }
}

/** 현재 언어의 번역을 그리고, 언어·리소스가 바뀌면 그 자리를 다시 그린다. */
export const translate = directive(TranslateDirective);

