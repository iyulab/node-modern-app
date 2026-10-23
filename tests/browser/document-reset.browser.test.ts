import { describe, it, expect, afterEach } from 'vitest';
import '../../src/components/ActionBar.js';
import '../../src/components/EmptyState.js';
import '../../src/components/GroupBox.js';
import '../../src/components/InfoField.js';
import '../../src/components/InfoSection.js';
import '../../src/components/PageHeader.js';
import '../../src/components/SidebarSection.js';

/**
 * 문서의 전역 리셋(Tailwind preflight 의 `*, ::before, ::after { margin: 0; padding: 0; border: 0 solid }` 류) 아래에서도
 * 요소의 안쪽 여백 · 테두리 · 바깥 간격이 그대로인가.
 *
 * 캡슐화 문맥이 다르면 바깥 문맥의 normal 선언이 이긴다 — 층 · 특이도와 무관하다. 그래서 `:host` 나 `::slotted()` 에
 * 둔 상자 속성은 그 리셋에 늘 지고, 리셋이 없는 데모 · 시험에서는 드러나지 않는다. 계약: 상자는 섀도 안 요소가 그린다.
 *
 * 재는 것은 배치다 — 리셋을 걸기 전과 건 뒤에 호스트 · 첫 글자 · 뒤 형제의 상자가 같아야 한다.
 */

const RESET = '*, ::before, ::after { margin: 0; padding: 0; border: 0 solid; box-sizing: border-box; }';

const FIXTURES: Record<string, string> = {
  'u-info-section strip': `<u-info-section layout="strip"><u-info-field label="Orders" value="962"></u-info-field><u-info-field label="Billed" value="13200"></u-info-field></u-info-section>`,
  'u-info-field tile': `<u-info-field appearance="tile" label="Orders" value="962"></u-info-field>`,
  'u-group-box': `<u-group-box title="Card"><span>Body</span></u-group-box>`,
  'u-empty-state': `<u-empty-state title="Nothing yet"></u-empty-state>`,
  'u-action-bar': `<u-action-bar><span>Save</span></u-action-bar>`,
  'u-action-bar sticky': `<u-action-bar sticky><span>Save</span></u-action-bar>`,
  'u-page-header': `<u-page-header title="Orders"></u-page-header>`,
  'u-sidebar-section': `<u-sidebar-section main-title="Work"><a href="#">Link</a></u-sidebar-section>`,
};

const settle = async () => {
  const els = [...document.querySelectorAll('*')].filter(e => e.tagName.includes('-')) as Array<HTMLElement & { updateComplete?: Promise<unknown> }>;
  await Promise.all(els.map(e => e.updateComplete));
  await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));
};

/** 호스트 · 그 안 첫 글자 · 뒤 형제의 상자(무대 기준). 고정물(라이트 DOM 내용)은 UA 상자가 없는 요소만 쓴다 — 리셋이 그것을 바꾸는 것은 소비자 몫이다. 글자는 섀도 · 슬롯을 가리지 않고 평평한 순서로 첫 번째 것. */
function boxes(stage: HTMLElement): number[] {
  const host = stage.firstElementChild as HTMLElement;
  const after = stage.lastElementChild as HTMLElement;
  const firstText = (root: Node): Text | null => {
    const kids: Node[] = root instanceof Element && root.shadowRoot ? [...root.shadowRoot.childNodes] : [...root.childNodes];
    for (const k of kids) {
      if (k instanceof HTMLSlotElement) {
        for (const a of k.assignedNodes({ flatten: true })) {
          if (a instanceof Text && a.data.trim()) return a;
          const t = firstText(a); if (t) return t;
        }
        continue;
      }
      if (k instanceof Text && k.data.trim()) return k;
      if (k instanceof Element && getComputedStyle(k).display === 'none') continue;
      const t = firstText(k); if (t) return t;
    }
    return null;
  };
  const text = firstText(host)!;
  const range = document.createRange();
  range.selectNodeContents(text);
  // 무대 기준 — 리셋은 `body` 의 UA 여백도 지우므로 페이지 좌표는 함께 움직인다.
  const o = stage.getBoundingClientRect();
  const r = (b: DOMRect) => [b.left - o.left, b.top - o.top, b.width, b.height].map(v => Math.round(v * 10) / 10);
  return [...r(host.getBoundingClientRect()), ...r(range.getBoundingClientRect()), ...r(after.getBoundingClientRect())];
}

afterEach(() => {
  document.body.innerHTML = '';
  document.querySelectorAll('style[data-reset]').forEach(s => s.remove());
});

describe('a document-wide reset does not strip the box an element draws', () => {
  for (const [name, markup] of Object.entries(FIXTURES)) {
    it(name, async () => {
      const stage = document.createElement('div');
      stage.style.width = '720px';
      stage.innerHTML = `${markup}<div>after</div>`;
      document.body.appendChild(stage);
      await settle();
      const before = boxes(stage);

      const style = document.createElement('style');
      style.dataset.reset = '';
      style.textContent = RESET;
      document.head.appendChild(style);
      await settle();
      expect(boxes(stage)).toEqual(before);
    });
  }
});
