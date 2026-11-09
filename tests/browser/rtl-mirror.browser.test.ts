import { describe, it, expect, afterEach } from 'vitest';
import '../../src/components/ActionBar.js';
import '../../src/components/PageHeader.js';
import '../../src/components/TimelineItem.js';
import '../../src/components/MasterDetailLayout.js';

/**
 * 「`dir="rtl"` 에서 배치가 **거울**인가」 — 한 호스트를 LTR 과 RTL 로 두 번 그려, 안쪽 모든 상자(섀도 트리 · 슬롯된 자식)와
 * 글자(범위 상자)가 호스트 가운데를 축으로 **좌우 대칭**인지 잰다: RTL 의 [왼쪽, 오른쪽] 이 LTR 의 [W − 오른쪽, W − 왼쪽].
 *
 * `u-` 컴포넌트의 접두/접미 슬롯만 아는 오라클(components `rtl-mirror`)과 달리 **마크업만 주면 되는 일반 오라클**이라 방향에 민감한
 * 컴포넌트를 한 줄로 더한다. 호스트 폭을 고정하므로 두 방향의 W 가 같다.
 *
 * ⚠**대상 목록은 손으로 쓴다** — 어떤 컴포넌트가 «방향에 민감한 상자» 인지는 이 패키지의 지식이다. 물리 방향이 **의미**인 것은
 * 대상이 아니다. 셸(`u-sidebar-layout`)과 가상 배치는 이 시험의 시야 밖이다(계획: RTL 논리 속성 전환 — 아직 아님).
 */

const FIXTURES: Array<[string, string]> = [
  ['u-action-bar', '<u-action-bar id="h"><span slot="danger">Delete</span><span slot="summary">Summary text</span><span>Save</span></u-action-bar>'],
  ['u-action-bar 요약 없음', '<u-action-bar id="h"><span slot="danger">Delete</span><span>Save</span></u-action-bar>'],
  ['u-page-header', '<u-page-header id="h" title="Page title" subtitle="A subtitle" back="/x"><span slot="status">Status</span><span slot="actions">Actions</span></u-page-header>'],
  ['u-timeline-item', '<u-timeline-item id="h"><span slot="heading">Heading</span><span slot="time">12:30</span>Body text of the item</u-timeline-item>'],
  ['u-master-detail-layout', '<u-master-detail-layout id="h"><div>Master side content</div><div slot="detail">Detail side content</div></u-master-detail-layout>'],
];

interface Box { key: string; l: number; r: number }

async function settle(): Promise<void> {
  const all = Array.from(document.body.querySelectorAll('*')) as (HTMLElement & { updateComplete?: Promise<unknown> })[];
  for (const el of all) if (el.updateComplete) await el.updateComplete;
  await new Promise((r) => setTimeout(r, 150));
}

/** 호스트 안의 모든 상자와 글자 범위를 호스트 왼쪽 기준 [l, r] 로 모은다. */
function snapshot(host: HTMLElement): { width: number; boxes: Box[] } {
  const H = host.getBoundingClientRect();
  const boxes: Box[] = [];
  let n = 0;
  const visit = (root: Element | ShadowRoot, prefix: string) => {
    for (const el of Array.from(root.querySelectorAll('*'))) {
      // A glyph's own paths are not symmetric on purpose (only a directional icon would be flipped); the icon's box is measured.
      if (el.closest('svg') && el.localName !== 'svg') continue;
      const id = `${prefix}${n++}:${el.localName}`;
      const rect = el.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) boxes.push({ key: id, l: rect.left - H.left, r: rect.right - H.left });
      const hasText = Array.from(el.childNodes).some((c) => c.nodeType === Node.TEXT_NODE && c.textContent!.trim());
      if (hasText) {
        const range = document.createRange();
        range.selectNodeContents(el);
        const tr = range.getBoundingClientRect();
        if (tr.width > 0) boxes.push({ key: `${id}#text`, l: tr.left - H.left, r: tr.right - H.left });
      }
      if (el.shadowRoot) visit(el.shadowRoot, `${id}/`);
    }
  };
  if (host.shadowRoot) visit(host.shadowRoot, 's:');
  visit(host, 'l:');
  return { width: H.width, boxes };
}

async function render(dir: 'ltr' | 'rtl', markup: string): Promise<HTMLElement> {
  document.documentElement.dir = dir;
  document.body.innerHTML = `<div style="width: 600px">${markup}</div>`;
  await settle();
  return document.getElementById('h') as HTMLElement;
}

afterEach(() => { document.documentElement.dir = 'ltr'; document.body.innerHTML = ''; });

describe('RTL — 일반 거울 오라클', () => {
  it.each(FIXTURES)('%s 는 RTL 에서 좌우가 대칭이다', async (_tag, markup) => {
    const ltr = snapshot(await render('ltr', markup));
    const rtl = snapshot(await render('rtl', markup));
    expect(rtl.boxes.map((b) => b.key), '두 방향의 상자 구성이 같다').toEqual(ltr.boxes.map((b) => b.key));
    expect(Math.abs(rtl.width - ltr.width)).toBeLessThanOrEqual(1);
    const bad: string[] = [];
    ltr.boxes.forEach((a, i) => {
      const b = rtl.boxes[i];
      const dl = Math.abs(b.l - (ltr.width - a.r));
      const dr = Math.abs(b.r - (ltr.width - a.l));
      if (dl > 1.5 || dr > 1.5) bad.push(`${a.key}: LTR [${a.l.toFixed(0)}, ${a.r.toFixed(0)}] → RTL [${b.l.toFixed(0)}, ${b.r.toFixed(0)}] (기대 [${(ltr.width - a.r).toFixed(0)}, ${(ltr.width - a.l).toFixed(0)}])`);
    });
    expect(bad, `거울이 아닌 상자 ${bad.length}개`).toEqual([]);
  });
});
