import { describe, it, expect } from 'vitest';
import { readFileSync, globSync } from 'fs';
import { resolve, join } from 'path';

const root = resolve(__dirname, '..');

/**
 * 규약: **셸 크롬은 타이포 값을 직접 정하지 않는다 — 스케일의 단을 읽는다.**
 *
 * 이 패키지는 «모범»이어야 하므로 소비자가 소스를 열었을 때 배우는 것이 중요하다.
 * 실측(2026-08-04)에서 두 population 이 갈려 있었다:
 *
 *   콘텐츠 프리미티브  PageHeader·GroupBox·InfoField·EmptyState   23건 **전부 토큰**
 *   셸 크롬            Sidebar{Layout,Section,Link,Button,Group}  20건 **전부 리터럴**
 *
 * ⇒ 스케일이 «있는데 닿지 않는» 자리가 우리 패키지 안에 있었다(«축 존재 ≠ 도달»).
 * 크롬을 용도 배정(`DL-157-4`)으로 옮긴 뒤, 그것이 되돌아가지 않게 이 자를 댄다.
 *
 * ⚠**대상은 도출하고 규칙은 손으로 쓴다**(cycle-181 의 경계). 대상은 `src/**` 전수이고,
 * 면제는 아래 표에 **이유와 함께** 손으로 적는다 — 면제가 무엇인지는 리포에서 읽어낼 수
 * 있는 사실이 아니라 우리가 가진 지식이다.
 */

/** 타이포 축으로 세는 속성. `font-family` 는 여기 없다 — 그것은 다른 토큰의 축이다. */
const TYPO_PROPS = ['font-size', 'font-weight', 'line-height', 'letter-spacing', 'text-transform'];

/**
 * 면제 — **아이콘 크기는 타이포가 아니다.**
 * 아이콘 글리프는 `font-size` 로 크기가 정해지지만 그 값은 «글자 크기»가 아니라
 * «도형 크기»라 타이포 스케일의 단과 무관하다(components 도 같은 판정을 기록해 두었다 —
 * `u-icon-button` 20px · `u-copy-button` 18px 은 의도된 고정값이다).
 */
const ICON_SELECTORS = new Set([
  'u-icon',       // SidebarButton · SidebarLink — 항목 아이콘
  '.icon',        // SidebarGroup · EmptyState — 그룹/빈 상태 아이콘
  '.caret',       // SidebarGroup — 펼침 표시
  '.logo',        // SidebarLayout — 브랜드 마크
  '.toggler',     // SidebarLayout — 사이드바 토글 버튼
]);

type Decl = { rel: string; selector: string; prop: string; value: string; line: number };

/** `css` 태그드 템플릿에서 (선택자, 선언)을 뽑는다. 중첩이 없는 평평한 시트라 한 단계면 된다. */
function declarations(): Decl[] {
  const out: Decl[] = [];
  for (const raw of globSync('src/**/*.ts', { cwd: root })) {
    const rel = raw.replace(/\\/g, '/');
    const lines = readFileSync(join(root, rel), 'utf-8').split('\n');
    let selector = '';
    let inComment = false;
    lines.forEach((line, i) => {
      // 주석 안의 예시 선언을 세면 정당한 설명 문장에 발화한다.
      if (inComment) {
        if (line.includes('*/')) inComment = false;
        return;
      }
      if (line.trimStart().startsWith('/*')) {
        if (!line.includes('*/')) inComment = true;
        return;
      }
      const open = line.match(/^\s*([^{};]+?)\s*\{\s*$/);
      if (open) { selector = open[1].trim(); return; }
      const decl = line.match(/^\s*([a-z-]+)\s*:\s*(.+?)\s*;/);
      if (!decl) return;
      if (!TYPO_PROPS.includes(decl[1])) return;
      out.push({ rel, selector, prop: decl[1], value: decl[2], line: i + 1 });
    });
  }
  return out;
}

/** 스케일의 단을 읽는 참조인가. `var(--u-text-…)` 만 인정한다. */
const readsScale = (value: string) => /var\(\s*--u-text-[a-z]+-(size|weight|leading|tracking)\s*[,)]/.test(value);

describe('셸 크롬의 타이포 — 값이 아니라 단을 읽는다', () => {
  it('src 안에 타이포 선언이 실제로 존재한다 — 이 자가 0건을 검사하고 있지 않다', () => {
    // 「검사기 존재 ≠ 대상 포함」. 글롭이 조용히 비면 이 파일 전체가 무의미해진다.
    expect(declarations().length).toBeGreaterThan(20);
  });

  it('★타이포 선언은 스케일의 단을 읽는다 (아이콘 자리 제외)', () => {
    const offenders = declarations()
      .filter(d => !ICON_SELECTORS.has(d.selector))
      .filter(d => !readsScale(d.value))
      .map(d => `${d.rel}:${d.line} ${d.selector} { ${d.prop}: ${d.value} }`);
    expect(offenders).toEqual([]);
  });

  it('면제는 아이콘 자리뿐이고, 그 자리는 굵기·자간을 정하지 않는다', () => {
    // 아이콘 면제가 «타이포를 숨기는 뒷문»이 되지 않게 한다 — 도형에는 굵기가 없다.
    const abuse = declarations()
      .filter(d => ICON_SELECTORS.has(d.selector))
      .filter(d => d.prop === 'font-weight' || d.prop === 'letter-spacing')
      .map(d => `${d.rel}:${d.line} ${d.selector} { ${d.prop} }`);
    expect(abuse).toEqual([]);
  });

  it('NEGATIVE — 스케일이 아닌 var() 참조는 통과하지 않는다', () => {
    expect(readsScale('var(--u-text-title-size, 20px)')).toBe(true);
    expect(readsScale('var(--font-size-lg)')).toBe(false);
    expect(readsScale('var(--empty-state-icon-size, 32px)')).toBe(false);
    expect(readsScale('14px')).toBe(false);
  });
});
