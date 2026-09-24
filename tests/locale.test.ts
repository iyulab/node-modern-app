import { describe, it, expect, beforeEach } from 'vitest';
import { readFileSync, globSync } from 'fs';
import { resolve, join, basename } from 'path';
import {
  registerLocale,
  setDefaultLocale,
  getLocaleStrings,
  getDefaultLocale,
  modernAppLocale,
} from '../src/internals/locale.js';
import { Locale } from '@iyulab/components/dist/utilities/Locale.js';

const root = resolve(__dirname, '..');

/**
 * ★**이 패키지는 3층 구분에서 「범용」이다** — `components`(중립 프리미티브)와
 * `enterprise`(이유랩 하우스 스타일) 사이. 범용 층이 한국어를 기본값으로 가지면
 * **비한국어 소비자를 배제**하며, 그것은 이 리포가 `components` 에 대해 기각한 것과
 * 같은 형태다(*"기본값이 다른 소비자를 배제한다"*).
 *
 * ⚠**언어는 미감보다 강하게 배제한다** — 어색한 기본값은 어색할 뿐이지만
 * 읽을 수 없는 기본값은 쓸 수 없다.
 */
describe('로케일 레지스트리', () => {
  beforeEach(() => {
    setDefaultLocale(undefined);
    Locale.set('en');
  });

  it('기본값은 영어다', () => {
    const t = getLocaleStrings();
    expect(t.back).toBe('Back');
    expect(t.noResultsTitle).toBe('No matching results');
  });

  it('등록한 로케일이 이긴다', () => {
    registerLocale('ko', { back: '뒤로' });
    expect(getLocaleStrings('ko').back).toBe('뒤로');
  });

  it('부분 등록은 영어와 병합된다 — 한 문자열만 번역할 수 있다', () => {
    registerLocale('fr', { back: 'Retour' });
    const t = getLocaleStrings('fr');
    expect(t.back).toBe('Retour');
    expect(t.noResultsTitle).toBe('No matching results');
  });

  it('★기본 언어로 떨어진다 — 소비자는 `ko` 를 등록하고 브라우저는 `ko-KR` 을 준다', () => {
    registerLocale('ko', { back: '뒤로' });
    expect(getLocaleStrings('ko-KR').back).toBe('뒤로');
  });

  it('등록하지 않은 언어는 영어다', () => {
    expect(getLocaleStrings('de').back).toBe('Back');
  });

  it('`setDefaultLocale` 이 명시하지 않은 컴포넌트에 적용된다', () => {
    registerLocale('ko', { back: '뒤로' });
    setDefaultLocale('ko');
    expect(getLocaleStrings().back).toBe('뒤로');
  });

  it('영어 기본값은 불변이다 — 반환값을 고쳐도 원본이 안 바뀐다', () => {
    const a = getDefaultLocale();
    a.back = 'MUTATED';
    expect(getDefaultLocale().back).toBe('Back');
  });
});

/**
 * 🔴**언어는 한 곳에서 정한다 — `components` 의 `Locale`.** 종전에는 이 패키지만 자기 상태를
 * 따로 두어, `Locale.set('ko')` 만 한 앱의 셸 버튼 이름이 한국어 화면 한가운데서 영어로 섰다
 * (docket #416 — 에러·경고 없이). 형제 `flex-table` 은 이미 `Locale.namespace` 를 따른다.
 */
describe('Locale.namespace 이관 (#416)', () => {
  beforeEach(() => {
    setDefaultLocale(undefined);
    Locale.set('en');
  });

  it('🔴`setDefaultLocale` 을 부르지 않으면 `Locale.get()` 을 따른다', () => {
    modernAppLocale.register('ko', { toggleSidebar: '사이드바 접기/펼치기' });
    Locale.set('ko');
    expect(getLocaleStrings().toggleSidebar).toBe('사이드바 접기/펼치기');
  });

  it('`registerLocale` 로 등록한 표도 `Locale.set()` 하나로 선다 — 기존 소비자 호환', () => {
    registerLocale('ja', { back: '戻る' });
    Locale.set('ja-JP');
    expect(getLocaleStrings().back).toBe('戻る');
  });

  it('요소의 `locale` 이 활성 로케일을 이긴다', () => {
    modernAppLocale.register('ko', { back: '뒤로' });
    Locale.set('en');
    expect(getLocaleStrings('ko').back).toBe('뒤로');
  });

  it('`setDefaultLocale` 을 부르면 여전히 이긴다 — `undefined` 로 `Locale` 에 되돌린다', () => {
    modernAppLocale.register('ko', { back: '뒤로' });
    modernAppLocale.register('fr', { back: 'Retour' });
    Locale.set('fr');
    setDefaultLocale('ko');
    expect(getLocaleStrings().back).toBe('뒤로');
    setDefaultLocale(undefined);
    expect(getLocaleStrings().back).toBe('Retour');
  });

  it('`components` 사슬을 그대로 탄다 — 지역 없는 태그가 지역형 표로', () => {
    modernAppLocale.register('zh-CN', { back: '返回' });
    Locale.set('zh');
    expect(getLocaleStrings().back).toBe('返回');
  });

  it('마법사 알림은 네임스페이스에서 {index}/{total}/{label} 템플릿이다', () => {
    modernAppLocale.register('ko', { wizardStepAnnouncement: '{total}단계 중 {index}단계: {label}' });
    Locale.set('ko');
    expect(getLocaleStrings().wizardStepAnnouncement(2, 3, '확인')).toBe('3단계 중 2단계: 확인');
  });

  it('`registerLocale` 의 함수형 알림도 계속 동작한다 — 사슬을 거쳐서', () => {
    registerLocale('de', { wizardStepAnnouncement: (i, n, l) => `Schritt ${i}/${n}: ${l}` });
    Locale.set('de-AT');
    expect(getLocaleStrings().wizardStepAnnouncement(1, 4, 'Start')).toBe('Schritt 1/4: Start');
  });

  it('영어 알림은 종전과 같다', () => {
    expect(getLocaleStrings().wizardStepAnnouncement(1, 2, 'Info')).toBe('Step 1 of 2: Info');
  });

  it('빈 기본 설명은 빈 채로 — 키 이름이 새어 나오지 않는다', () => {
    expect(getLocaleStrings().noDataDescription).toBe('');
  });
});

/**
 * 🔴**이 단언이 없어서 한국어 기본값이 들어왔다.**
 *
 * `EmptyState`(2 variant × 제목+설명)와 `PageHeader.backLabel` 이 한국어를 기본값으로
 * 갖고 게시 직전까지 갔다. 아무 장치도 그것을 보지 못했다 — 로케일 표준은 **채택됐지만
 * 강제된 적이 없었다.** ⇒ *불변식을 문장으로 적는 것은 그것을 지키는 장치가 아니다.*
 *
 * ⚠**대상을 좁히는 것이 이 단언의 설계 전부다.** 이 리포의 내부 문서 언어는 한국어라
 * 주석·JSDoc 은 정당하다. 여기서는 **문자열 리터럴만** 본다.
 */
describe('범용 층에 한국어 기본값이 없다', () => {
  const HANGUL = /[가-힣]/;

  /**
   * 주석·JSDoc 과 **내장 `ko` 표**(`register('ko', { … })` 호출 범위)를 걷은 뒤 따옴표 문자열만 남긴다.
   * ⚠면제는 `ko` 태그 한정이다 — `register('en', …)` 안의 한글은 여전히 위반이다(`i18n:scan` 과 같은 규칙).
   */
  const stringLiterals = (src: string): string[] => {
    const noComments = src
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/^\s*\/\/.*$/gm, '')
      // 표 안 문자열에 `{total}` 같은 자리표시자 중괄호가 있어, 닫힘은 «줄 시작의 `})`» 로 잡는다.
      .replace(/\.register\(\s*'ko'\s*,\s*\{[\s\S]*?\r?\n\}\s*\)/g, '');
    return [...noComments.matchAll(/(['"])((?:[^\\\n])*?)\1/g)].map(m => m[2]);
  };

  it('🔴`src/**` 의 문자열 리터럴에 한글이 없다', () => {
    const offenders: string[] = [];
    for (const rel of globSync('src/**/*.ts', { cwd: root })) {
      // 레지스트리 자신의 사용 예시(JSDoc)는 주석이라 위에서 걷힌다.
      const file = join(root, rel);
      for (const s of stringLiterals(readFileSync(file, 'utf-8')))
        if (HANGUL.test(s)) offenders.push(`${basename(rel)}: ${s.slice(0, 40)}`);
    }
    expect(offenders, '범용 층의 기본값은 영어여야 한다 — 한국어는 registerLocale 로').toEqual([]);
  });
});
