import { describe, it, expect, beforeEach } from 'vitest';
import { readFileSync, globSync } from 'fs';
import { resolve, join, basename } from 'path';
import {
  registerLocale,
  setDefaultLocale,
  getLocaleStrings,
  getDefaultLocale,
} from '../src/internals/locale.js';

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
  beforeEach(() => setDefaultLocale(undefined));

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

  /** 주석·JSDoc 제거 후 따옴표 문자열만 남긴다. */
  const stringLiterals = (src: string): string[] => {
    const noComments = src
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/^\s*\/\/.*$/gm, '');
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
