import { describe, it, expect, afterEach } from 'vitest';
import { userEvent } from 'vitest/browser';
import '../../src/components/Wizard.js';

/**
 * `u-wizard` 의 가로 단계 머리는 `dir="rtl"` 에서 시작이 오른쪽이다 — 왼쪽 화살표가 «다음 단계»(네이티브 라디오 · APG 와 같다).
 * 실제 `userEvent.keyboard` 로 누르고 어느 단계에 포커스가 가는지 읽는다.
 */

type Wizard = HTMLElement & { steps: { id: string; label: string }[]; updateComplete: Promise<unknown> };

afterEach(() => { document.documentElement.dir = 'ltr'; document.body.replaceChildren(); });

async function mount(dir: 'ltr' | 'rtl'): Promise<Wizard> {
  document.documentElement.dir = dir;
  const w = document.createElement('u-wizard') as Wizard;
  w.style.width = '600px';
  w.setAttribute('orientation', 'horizontal');
  w.steps = [{ id: 'a', label: 'One' }, { id: 'b', label: 'Two' }, { id: 'c', label: 'Three' }];
  for (const t of ['one', 'two', 'three']) { const d = document.createElement('div'); d.textContent = t; w.append(d); }
  document.body.append(w);
  await w.updateComplete;
  await new Promise((r) => setTimeout(r, 80));
  return w;
}
const steps = (w: Wizard) => [...w.shadowRoot!.querySelectorAll<HTMLElement>('[part="step"]')];

describe('RTL — u-wizard 가로 단계 키', () => {
  it.each([['ltr', 'ArrowRight', 1], ['ltr', 'ArrowLeft', 2], ['rtl', 'ArrowLeft', 1], ['rtl', 'ArrowRight', 2]] as const)(
    '%s: 첫 단계에서 %s 를 누르면 단계 %s 로 간다(왼쪽/오른쪽 끝에서 한 바퀴 돌지 않으면 마지막)',
    async (dir, key, expected) => {
      const w = await mount(dir);
      const list = steps(w);
      list[0].focus();
      await userEvent.keyboard(`{${key}}`);
      await new Promise((r) => setTimeout(r, 60));
      const active = w.shadowRoot!.activeElement as HTMLElement | null;
      // 첫 단계에서 «이전» 은 갈 곳이 없다(순환하지 않으면 제자리 · 순환하면 마지막).
      const idx = list.indexOf(active as HTMLElement);
      if (expected === 2) expect([0, 2], `${dir} ${key}: 제자리 또는 마지막`).toContain(idx);
      else expect(idx, `${dir} ${key}`).toBe(expected);
    });

  it('RTL 에서 단계 머리는 오른쪽부터 놓인다(키가 화면을 따라가는 근거)', async () => {
    const w = await mount('rtl');
    const [s0, s1] = steps(w).map((s) => s.getBoundingClientRect());
    expect(s1.left, '단계 1 은 단계 0 의 왼쪽').toBeLessThan(s0.left);
  });
});
