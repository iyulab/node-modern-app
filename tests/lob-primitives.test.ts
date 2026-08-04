import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync } from 'fs';
import { resolve, join } from 'path';

import { isBlank } from '../src/components/InfoField.js';

const root = resolve(__dirname, '..');
const read = (rel: string) => readFileSync(join(root, rel), 'utf-8');

/**
 * LOB 프리미티브 목록 — **도출한다.**
 *
 * 🔴**손으로 쓴 배열이었고, 정확히 그 방식이 결함을 숨겼다**(2026-08-04): `u-action-bar` 를
 * 추가한 사이클에서 이 파일의 계약(색·크기 리터럴 0 · `part` 노출 · `u-` 접두어 · export)이
 * **그 컴포넌트를 한 번도 검사하지 않은 채** 74건 전부 통과했다.
 *
 * ⇒ 이 리포가 이미 두 번 내린 결론과 같다(`tokens:sync` 의 소비자 목록 · `gitignore-check` 의
 * 산출 디렉터리): ***대상 목록은 도출하고, 규칙 목록만 손으로 쓴다***(cycle-181 의 경계).
 *
 * ⚠**셸 부품(`Sidebar*`)은 제외한다** — 그것은 셸 «바깥»이고 이 계약의 대상이 아니다.
 * 규칙이므로 손으로 적는다.
 */
const SHELL_PARTS = /^Sidebar/;
const PRIMITIVES = readdirSync(join(root, 'src/components'))
  .filter(f => f.endsWith('.ts') && !f.endsWith('.styles.ts'))
  .map(f => f.replace(/\.ts$/, ''))
  .filter(n => !SHELL_PARTS.test(n))
  .sort();

/**
 * LOB 프리미티브의 계약.
 *
 * ★**왜 이 컴포넌트들이 여기 있나**: 셸 *안쪽*(페이지 본문)에 대한 제공물이 0개였고,
 *   소비앱이 화면마다 같은 골격을 손으로 다시 짰다. 손으로 짜면 제목 크기·여백·열 수가
 *   화면마다 조금씩 달라지는데, 개별로는 사소해 보여도 화면을 옮겨 다니는 사용자에게는
 *   *"제품이 하나로 만들어지지 않았다"* 로 읽힌다.
 */
describe('LOB 프리미티브 — 토큰 계약', () => {
  it('시트에 색·크기 리터럴을 쓰지 않는다 (폴백 안은 예외)', () => {
    // 폴백(`var(--x, 12px)`)의 리터럴은 **시트 부재 내성**이라 의도된 것이다.
    // 여기서 막는 것은 토큰을 경유하지 않는 **날것의 값**이다 — 그것이 있으면
    // 소비자가 밀도·테마를 바꿔도 그 자리만 따라오지 않는다.
    const offenders: string[] = [];
    for (const name of PRIMITIVES) {
      const src = read(`src/components/${name}.styles.ts`);
      const body = src
        .replace(/\/\*[\s\S]*?\*\//g, '') // 주석 제거
        // ⚠중단점은 디자인 토큰이 아니다 — 레이아웃이 바뀌는 지점이지 소비자가 조절할
        //   값이 아니다(토큰으로 열면 컴포넌트가 어느 폭에서 접히는지 예측 불가가 된다).
        //   ★`@container` 도 같은 이유로 같은 취급이다 — 2026-08-04 에 접힘 기준이
        //   «화면»에서 «자기 폭»으로 옮겨 가면서 이 규칙이 문법만 바뀌었다.
        .replace(/@(media|container)[^{]*/g, '')
        .replace(/var\([^()]*(?:\([^()]*\)[^()]*)*\)/g, ''); // var(...) 통째 제거(폴백 포함)
      for (const m of body.matchAll(/:\s*([^;]*(?:#[0-9a-fA-F]{3,8}|\brgba?\(|\b\d+px)[^;]*);/g)) {
        const v = m[1].trim();
        // 예외 — 헤어라인 테두리. 두께 축이 없고, `1px` 은 "선 하나"라는 뜻이지 치수가 아니다.
        // (토큰을 만들면 소비자가 2px 로 덮어 모든 경계가 굵어지는 쪽이 더 나쁘다.)
        if (/^1px solid/.test(v)) continue;
        offenders.push(`${name}: ${v}`);
      }
    }
    expect(offenders, '토큰을 경유하지 않는 값이다').toEqual([]);
  });

  it('모든 프리미티브가 `part` 를 노출한다 (오버라이드 경로)', () => {
    // part 가 없으면 소비자는 섀도 DOM 안에 손댈 방법이 없고, 결국 컴포넌트를 통째로
    // 복제한다 — 그 순간 이 계층은 쓰기 전보다 나쁜 상태를 만든다.
    const missing = PRIMITIVES.filter(n => !/part="/.test(read(`src/components/${n}.ts`)));
    expect(missing).toEqual([]);
  });

  it('index.ts 가 전부 export 한다 (등록 side-effect 포함)', () => {
    const index = read('src/index.ts');
    expect(PRIMITIVES.filter(n => !index.includes(n))).toEqual([]);
  });

  it('커스텀 엘리먼트 이름이 `u-` 접두어를 쓴다', () => {
    const bad: string[] = [];
    for (const n of PRIMITIVES) {
      const m = read(`src/components/${n}.ts`).match(/@customElement\('([^']+)'\)/);
      if (!m || !m[1].startsWith('u-')) bad.push(`${n}: ${m?.[1] ?? '없음'}`);
    }
    expect(bad).toEqual([]);
  });
});

/**
 * 🔴**"아직 없음"과 "0"은 다른 사실이다.**
 *
 * 한 소비앱에서 *"부수가 0인 주문"* 과 *"부수가 아직 안 정해진 주문"* 이 화면에서 똑같이
 * `—` 로 보였고, 그 둘은 업무적으로 전혀 다른 상태였다. 규칙을 사람이 기억하는 방식으로
 * 두면 반드시 어긋나므로 컴포넌트가 소유하고, 그 소유를 여기서 잰다.
 */
describe('InfoField — 빈 값 대 0', () => {
  it('빈 값으로 보는 것: null · undefined · 빈 문자열 · 공백만', () => {
    for (const v of [null, undefined, '', '   ']) expect(isBlank(v), String(v)).toBe(true);
  });

  it('🔴값으로 보는 것: 0 · false · "0" · 빈 배열', () => {
    // 0 과 false 가 여기서 true 로 넘어가면 "0건"이 "미정"으로 표시된다.
    for (const v of [0, false, '0', []]) expect(isBlank(v), JSON.stringify(v)).toBe(false);
  });
});

describe('EmptyState — 데이터 없음 대 결과 없음', () => {
  it('두 variant 의 기본 문구가 다르다', () => {
    // 같은 문구를 쓰면 사용자는 필터가 걸려 있는 줄 모르고 "데이터가 사라졌다"로 읽는다.
    const src = read('src/components/EmptyState.ts');
    const noData = src.match(/no-results'\s*\?\s*\{[^}]*\}\s*:\s*\{([^}]*)\}/)?.[1] ?? '';
    const noResults = src.match(/no-results'\s*\?\s*\{([^}]*)\}/)?.[1] ?? '';
    expect(noData.length).toBeGreaterThan(0);
    expect(noResults.length).toBeGreaterThan(0);
    expect(noData).not.toBe(noResults);
  });
});
