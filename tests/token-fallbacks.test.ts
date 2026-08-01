import { describe, it, expect } from 'vitest';
import { readFileSync, globSync } from 'fs';
import { resolve, join } from 'path';
// @ts-expect-error — 생성기는 .mjs 로, 타입 선언이 없다
import { resolveTokens, planFallbacks, parseFallbacks, resolveSheet, EXCLUDED } from '../scripts/token-fallbacks.mjs';

const root = resolve(__dirname, '..');

/**
 * 규약: **셸은 토큰 시트 없이도 렌더된다.**
 *
 * 이 패키지는 자기 토큰 시트를 갖지 않는다 — 사이드바·레이아웃이 `@iyulab/components` 의
 * 시트 토큰(`--u-txt-color` 등)을 그대로 읽는다. 소비자가 그 시트를 로드하지 않으면
 * `var(--u-X)` 가 무효가 되고 **해당 선언이 통째로 버려진다**: 메뉴 텍스트가 안 보이고
 * 사이드바 배경이 투명해진다. 앱 셸이 그렇게 되면 화면 전체가 못 쓰게 된다.
 *
 * ⚠**시트는 의존 패키지에서 해석한다.** components 가 폴백을 갖게 됐다고 해서 이 패키지가
 * 안전해지지는 않는다 — 여기 선언은 여기 것이고, 이 참조들은 components 의 컴포넌트를
 * 거치지 않는다.
 */
describe('셸 토큰 폴백 — 시트 부재 내성', () => {
  const sheetLiterals = () => resolveTokens(readFileSync(resolveSheet(root), 'utf-8'));

  it('의존 패키지의 토큰 시트를 해석할 수 있다', () => {
    // 이 단언이 없으면 시트를 못 찾았을 때 아래 테스트들이 **빈 맵과 대조해 조용히 통과**한다.
    const literals = sheetLiterals();
    expect(literals.size).toBeGreaterThan(50);
    expect(literals.get('--u-txt-color')).toMatch(/^#[0-9A-Fa-f]{6}$/);
  });

  it('배선된 폴백 리터럴이 시트 값과 일치한다', () => {
    const literals = sheetLiterals();
    const mismatched: string[] = [];
    for (const rel of globSync('src/**/*.ts', { cwd: root }))
      for (const { name, literal } of parseFallbacks(
        readFileSync(join(root, rel), 'utf-8'),
      ) as Iterable<{ name: string; literal: string }>) {
        const expected = literals.get(name);
        if (expected !== undefined && expected !== literal)
          mismatched.push(`${rel}: var(${name}, ${literal}) — 시트는 ${expected}`);
      }
    // 스테일은 눈으로 잡을 수 없다 — 시트가 있는 개발 환경에서는 폴백이 아예 평가되지 않고,
    // 어긋난 값은 **시트를 로드하지 않은 소비자에게만** 나타난다.
    expect(mismatched).toEqual([]);
  });

  it('폴백 없는 참조가 남아 있지 않다 (제외 목록 외)', () => {
    const { edits, skipped } = planFallbacks(root, {}) as {
      edits: { rel: string; hits: { name: string }[] }[];
      skipped: { unresolved: Map<string, number> };
    };
    expect(edits.flatMap(e => e.hits.map(h => `${e.rel}: ${h.name}`))).toEqual([]);
    // 해석 실패 = 유령 토큰(참조되지만 시트에 없음). 업스트림이 토큰을 지우면 여기서 걸린다 —
    // 이 패키지에서만 볼 수 있는 신호다.
    expect([...skipped.unresolved.keys()]).toEqual([]);
  });

  it('제외는 의도된 것만이다', () => {
    expect([...EXCLUDED.keys()]).toEqual(['font']);
  });
});
