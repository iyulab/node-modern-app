import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync } from 'fs';
import { resolve, join } from 'path';
import { componentsBaseSources } from './inherited-source';

const root = resolve(__dirname, '..');
const read = (rel: string) => readFileSync(join(root, rel), 'utf-8');

/**
 * `src/react.ts` 의 `JSX.IntrinsicElements` 증강 ↔ 요소 클래스의 공개 속성.
 *
 * 증강은 손으로 쓴 선언이라 요소에 속성이 늘어도 따라오지 않는다 — `u-info-section` 의
 * `layout` 이 빠진 채 게시돼, 원시 태그를 JSX 로 쓰는 소비자가 `layout="strip"` 에서
 * `TS2322` 를 받았다. 소비자는 같은 키를 다른 타입으로 다시 선언할 수 없어 우회도 막힌다.
 *
 * ⇒ 대상(요소 · 속성)은 소스에서 도출하고, 규칙(어느 요소가 대상 밖인가)만 손으로 쓴다.
 * 속성 이름은 Lit 규칙대로 — `attribute: 'x'` 면 그 이름, `attribute: false` 면 속성 없음,
 * 아니면 프로퍼티 이름의 소문자(kebab 이 아니다).
 */

/** 셸 부품은 셸 설정으로 그려진다(속성으로 쓰는 표면이 아니다). */
const SHELL_PARTS = /^Sidebar/;
/** `createComponent` 래퍼가 따로 있는 요소 — 원시 태그 증강의 대상이 아니다. */
const WRAPPED = new Set(['u-wizard', 'u-sidebar-layout']);

/** `@property(…)` 선언의 속성 이름 — 옵션 안의 괄호(`converter: f<T>()`)를 넘어 짝을 맞춰 읽는다. */
function propertyAttributes(src: string): string[] {
  const attrs: string[] = [];
  for (let at = src.indexOf('@property('); at >= 0; at = src.indexOf('@property(', at + 1)) {
    let depth = 0;
    let end = at + '@property'.length;
    for (; end < src.length; end++) {
      if (src[end] === '(') depth++;
      else if (src[end] === ')' && --depth === 0) break;
    }
    const options = src.slice(at + '@property('.length, end);
    const name = /^\s*(?:override\s+|declare\s+)?(\w+)/.exec(src.slice(end + 1))?.[1];
    if (!name || /attribute:\s*false/.test(options)) continue;
    attrs.push(/attribute:\s*'([^']+)'/.exec(options)?.[1] ?? name.toLowerCase());
  }
  return attrs;
}

function elementAttributes(src: string): { tag: string; attrs: string[]; unverified?: true } | null {
  const tag = /@customElement\('([^']+)'\)/.exec(src)?.[1];
  if (!tag) return null;
  // components 의 클래스를 상속한 요소(`u-side-panel`)는 그 사슬의 속성이 공개 표면이다.
  // 형제 소스가 없는 단독 클론에서는 그 사슬을 읽을 수 없다 — 판정하지 않는다(빈 표면으로 읽으면 정당한 선언이 위반이 된다).
  const bases = componentsBaseSources(src, root);
  if (bases && bases.length === 0) return { tag, attrs: [], unverified: true };
  const attrs = [src, ...(bases ?? [])].flatMap(propertyAttributes);
  return { tag, attrs: [...new Set(attrs)].sort() };
}

function declaredKeys(reactSrc: string): Map<string, string[]> {
  const block = reactSrc.slice(reactSrc.indexOf('interface IntrinsicElements'));
  const out = new Map<string, string[]>();
  const entry = /'(u-[\w-]+)':\s*React\.DetailedHTMLProps<[^;]*?>(?:\s*&\s*\{([\s\S]*?)\n\s{6}\})?;/g;
  for (const m of block.matchAll(entry)) {
    const body = (m[2] ?? '').replace(/\/\*\*[\s\S]*?\*\//g, '');
    const keys = [...body.matchAll(/^\s*'?([\w-]+)'?\?:/gm)].map(k => k[1]);
    out.set(m[1], keys.sort());
  }
  return out;
}

const elements = readdirSync(join(root, 'src/components'))
  .filter(f => f.endsWith('.ts') && !f.endsWith('.styles.ts') && !SHELL_PARTS.test(f))
  .map(f => elementAttributes(read(`src/components/${f}`)))
  .filter((e): e is { tag: string; attrs: string[]; unverified?: true } => !!e && !WRAPPED.has(e.tag));

const declared = declaredKeys(read('src/react.ts'));

describe('React 원시 태그 증강 — 요소 공개 속성과 같다', () => {
  it('대상 요소를 찾는다', () => {
    expect(elements.length).toBeGreaterThan(5);
    expect(declared.size).toBeGreaterThan(5);
  });

  for (const { tag, attrs, unverified } of elements) {
    it.skipIf(unverified)(`${tag}`, () => {
      expect(declared.has(tag), `${tag} 가 IntrinsicElements 에 없다`).toBe(true);
      expect(declared.get(tag)).toEqual(attrs);
    });
  }
});
