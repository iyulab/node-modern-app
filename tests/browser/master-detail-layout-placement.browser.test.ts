import { describe, it, expect, afterEach } from 'vitest';
import '@iyulab/components/styles/tokens.css';
import '../../src/components/MasterDetailLayout.js';
import type { MasterDetailLayout } from '../../src/components/MasterDetailLayout.js';

/**
 * `detail-placement` — the side the detail pane stands on (`end` by default, `start` to dock it before the list).
 *
 * A screen with the app sidebar on the left wants its edit form beside the sidebar and the list's identifying
 * columns still in view. The values are logical (`start` / `end`), so a right-to-left page mirrors them — the same
 * way the pane has always stood at the inline end.
 *
 * | Contract | What is measured |
 * |---|---|
 * | default | the detail stays at the inline end, as before |
 * | `start` | the detail stands before the master, and the divider sits between them |
 * | RTL | `start` is the right edge, `end` the left |
 * | narrow | below the overlay breakpoint the detail covers the master whichever side it was set to |
 * | empty | with no detail the master takes the full width whichever side |
 */
afterEach(() => document.body.replaceChildren());

async function mount(attrs: string, opts: { width?: number; dir?: 'ltr' | 'rtl'; detail?: boolean } = {}) {
  const { width = 900, dir = 'ltr', detail = true } = opts;
  document.body.innerHTML = `
    <div dir="${dir}" style="width:${width}px; height:300px">
      <u-master-detail-layout ${attrs} master-size="300px">
        <div style="height:100px">list</div>
        ${detail ? '<div slot="detail" style="height:100px">record</div>' : ''}
      </u-master-detail-layout>
    </div>`;
  const el = document.querySelector('u-master-detail-layout') as MasterDetailLayout;
  await el.updateComplete;
  for (let i = 0; i < 3; i++) await new Promise((r) => requestAnimationFrame(() => r(null)));
  await new Promise((r) => setTimeout(r, 60));
  const part = (name: string) => el.shadowRoot!.querySelector(`[part="${name}"]`) as HTMLElement;
  return { el, master: part('master').getBoundingClientRect(), detail: part('detail').getBoundingClientRect(), divider: part('divider').getBoundingClientRect() };
}

describe('u-master-detail-layout detail-placement', () => {
  it('default: the detail is at the inline end', async () => {
    const { master, detail } = await mount('');
    expect(detail.left, `detail ${detail.left} · master ${master.left}`).toBeGreaterThan(master.left);
  });

  it('start: the detail stands before the master and the divider sits between them', async () => {
    const { master, detail, divider } = await mount('detail-placement="start"');
    expect(detail.right, `detail right ${detail.right} · master left ${master.left}`).toBeLessThanOrEqual(master.left + 1);
    expect(divider.left).toBeGreaterThanOrEqual(detail.right - 1);
    expect(divider.right).toBeLessThanOrEqual(master.left + 1);
  });

  it('RTL: start is the right edge', async () => {
    const { master, detail } = await mount('detail-placement="start"', { dir: 'rtl' });
    expect(detail.left, `detail ${detail.left} · master ${master.left}`).toBeGreaterThan(master.left);
  });

  it('narrow: below the overlay breakpoint the detail covers the master whichever side', async () => {
    const { master, detail } = await mount('detail-placement="start"', { width: 500 });
    expect(Math.abs(detail.left - master.left), `detail ${detail.left} · master ${master.left}`).toBeLessThanOrEqual(1);
    expect(detail.width).toBeGreaterThanOrEqual(master.width - 1);
  });

  it('NEGATIVE — with no detail the master takes the full width', async () => {
    const { master } = await mount('detail-placement="start"', { detail: false });
    expect(master.width).toBeGreaterThanOrEqual(899);
  });
});
