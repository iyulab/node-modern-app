import { describe, it, expect } from 'vitest';
import { readFileSync, globSync } from 'fs';
import { resolve, join } from 'path';

const root = resolve(__dirname, '..');
const read = (rel: string) => readFileSync(join(root, rel), 'utf-8');
// 경로는 슬래시로 정규화한다 — Windows 의 `\` 가 그대로 단언에 들어가면 OS 마다 다른
// 문자열을 비교하게 된다.
const sources = () =>
  globSync('src/**/*.ts', { cwd: root }).map(rel => [rel.replace(/\\/g, '/'), read(rel)] as const);

/**
 * 규약: **셸 표면 색은 소비자가 조정할 수 있어야 하고, 아무것도 안 하면 브랜드를 따라온다.**
 *
 * 셸은 사용자가 가장 먼저·가장 오래 보는 표면이라 브랜드가 어긋나면 바로 눈에 띈다.
 * 그런데 셸이 팔레트(`--u-blue-600`)를 직접 읽으면 소비자에게 열린 길이 둘 다 나쁘다 —
 * ⑴ 팔레트를 덮으면 *진짜 파랑*이 필요한 배지·차트까지 오염되고(팔레트는 **이름이 곧 값의
 * 약속**이다), ⑵ 섀도 DOM 내부 CSS 를 뚫으면 업스트림 구조 변경에 조용히 깨진다.
 *
 * ★이 파일이 지키는 것은 "훅이 있는가"가 아니라 **훅이 문서와 어긋나지 않는가**이다.
 * 계약 토큰은 코드와 문서 두 곳에 사는데, 한쪽만 고쳐도 CSS 는 아무 신호를 내지 않는다
 * (미정의 토큰은 폴백으로 조용히 넘어간다). 어긋남은 소비자가 문서대로 썼는데 아무 일도
 * 일어나지 않을 때 비로소 드러난다 — 우리가 절대 못 보는 곳에서만 틀린다.
 */
describe('셸 표면 토큰 계약', () => {
  /** `var(--app-X, <default>)` 참조를 모은다 — 괄호 균형을 세어 중첩 var() 를 보존한다. */
  const contractRefs = (): { name: string; fallback: string; rel: string }[] => {
    const out: { name: string; fallback: string; rel: string }[] = [];
    for (const [rel, src] of sources()) {
      const re = /var\(\s*(--app-[a-z0-9-]+)\s*(,)?/g;
      let m: RegExpExecArray | null;
      while ((m = re.exec(src))) {
        if (!m[2]) {
          out.push({ name: m[1], fallback: '', rel });
          continue;
        }
        let depth = 1;
        let i = re.lastIndex;
        for (; i < src.length && depth > 0; i++) {
          if (src[i] === '(') depth++;
          else if (src[i] === ')') depth--;
        }
        out.push({ name: m[1], fallback: src.slice(re.lastIndex, i - 1).trim(), rel });
      }
    }
    return out;
  };

  const documented = () => {
    const rows = read('docs/theme.md').matchAll(/^\| `(--app-[a-z0-9-]+)` \| `([^`]+)` \|/gm);
    return new Map([...rows].map(r => [r[1], r[2]]));
  };

  it('모든 계약 토큰이 기본값을 갖는다 — 미지정 소비자에게 동작 변화가 없다', () => {
    // 기본값 없는 `var(--app-X)` 는 미지정 시 **선언이 통째로 버려진다**. 순수 가산이어야
    // 할 변경이 그 순간 파괴적 변경이 된다.
    const bare = contractRefs().filter(r => !r.fallback);
    expect(bare.map(r => `${r.rel}: ${r.name}`)).toEqual([]);
  });

  it('기본값은 역할 토큰에서 파생된다 — 팔레트를 경유하지 않는다', () => {
    // 기본값이 팔레트를 가리키면 `--u-primary-color` 만 정의한 소비자를 따라오지 않는다.
    // 치수 토큰(width)은 색이 아니므로 리터럴이 정답이다.
    const offenders = contractRefs().filter(
      r => !/width/.test(r.name) && !/var\(--u-(primary|txt|bg|panel|border|danger|success|warning|info)/.test(r.fallback),
    );
    expect(offenders.map(r => `${r.rel}: var(${r.name}, ${r.fallback})`)).toEqual([]);
  });

  it('코드가 쓰는 토큰과 문서가 약속한 토큰이 정확히 일치한다', () => {
    const used = new Set(contractRefs().map(r => r.name));
    const docs = documented();
    expect(docs.size).toBeGreaterThan(5); // 표 파싱이 깨지면 아래 대조가 무의미해진다
    expect([...used].sort().filter(n => !docs.has(n))).toEqual([]); // 문서에 없는 훅
    expect([...docs.keys()].sort().filter(n => !used.has(n))).toEqual([]); // 코드에 없는 약속
  });

  it('활성 배경 hover 는 별도 토큰이 아니라 파생이다', () => {
    // 둘을 따로 두면 한쪽만 덮은 소비자가 **어긋난 쌍**을 얻는다 — 이 계약이 막으려는
    // 결함 그 자체다. 파생식이 사라지면(=별도 토큰이 생기면) 여기서 걸린다.
    const src = read('src/components/SidebarLink.styles.ts');
    expect(src).toMatch(/color-mix\(in srgb, var\(--link-active-bg\) 85%, black\)/);
    expect(contractRefs().some(r => /active-bg-hover/.test(r.name))).toBe(false);
  });

  it('셸이 팔레트를 직접 읽지 않는다 (측정된 예외 외)', () => {
    // 예외는 SidebarSection 의 보조 텍스트 2단이다. 역할 층의 보조 텍스트 단
    // (`--u-txt-color-weak`)은 흰 배경에서 2.68:1 로 WCAG AA(4.5:1)에 미달하고,
    // 현행 팔레트 값은 6.19:1 · 4.61:1 로 통과한다 — 옮기면 접근성이 후퇴한다.
    // ⇒ 역할 층에 AA 를 넘는 보조 텍스트 단이 생기면 그때 옮긴다.
    const hits = sources().flatMap(([rel, src]) =>
      [...src.matchAll(/var\((--u-(?:blue|red|green|yellow|neutral)-\d+)/g)].map(m => `${rel}: ${m[1]}`),
    );
    expect(hits.sort()).toEqual([
      'src/components/SidebarSection.styles.ts: --u-neutral-600',
      'src/components/SidebarSection.styles.ts: --u-neutral-700',
    ]);
  });
});
