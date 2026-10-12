import { describe, it, expect, afterEach } from 'vitest';
import '../../src/components/GroupBox.js';
import '../../src/components/PageHeader.js';
import '../../src/components/ActionBar.js';

/**
 * 좁은 폭 규칙을 가진 세 프리미티브(`u-group-box` · `u-page-header` · `u-action-bar`)는 **크기 containment 를 두지 않는다**.
 *
 * `container-type: inline-size` 를 호스트에 두었을 때도, 섀도 안 상자로 옮겼을 때도, 형제 `fieldset disabled` 전환이나
 * 위쪽 블록 삽입과 같은 React 커밋 뒤 카드가 높이 2px(테두리뿐)로 접힌 채 남는 Chromium 실측 보고가 있었다 — 강제
 * 재배치로만 돌아왔고 containment 를 걷으면 생기지 않았다(이 시험 환경에서는 재현되지 않는다). 그래서 «재료가 없다» 를
 * 재고, 같은 접힘 지점이 고유 크기 배치(flex-basis 임계)로 그대로 서는지를 잰다.
 */
afterEach(() => document.body.replaceChildren());

const settle = () => new Promise((r) => requestAnimationFrame(() => r(null)));

async function mountGroupBox(width: number, actions: string): Promise<HTMLElement> {
  const box = document.body.appendChild(document.createElement('div'));
  box.style.width = `${width}px`;
  const gb = document.createElement('u-group-box');
  gb.setAttribute('title', 'Status');
  gb.innerHTML = `<span slot="actions">${actions}</span><div class="grid"><span>a</span><span>b</span></div>`;
  box.appendChild(gb);
  await (gb as unknown as { updateComplete: Promise<unknown> }).updateComplete;
  await settle();
  return gb;
}

/** 요소와 그 섀도 트리 안의 모든 요소 — containment 가 숨을 수 있는 자리 전부. */
function everyElement(host: HTMLElement): Element[] {
  return [host, ...host.shadowRoot!.querySelectorAll('*')];
}

describe('크기 containment 없음', () => {
  it('세 프리미티브의 호스트와 섀도 안 어디에도 container-type 이 없다', async () => {
    document.body.innerHTML = `
      <u-group-box title="A"><button slot="actions">Act</button>body</u-group-box>
      <u-page-header title="B"><button slot="actions">New</button></u-page-header>
      <u-action-bar><button slot="danger">Delete</button><button>Save</button></u-action-bar>`;
    const hosts = [...document.body.children] as (HTMLElement & { updateComplete: Promise<unknown> })[];
    await Promise.all(hosts.map((h) => h.updateComplete));
    const contained = hosts
      .flatMap(everyElement)
      .filter((el) => getComputedStyle(el).containerType !== 'normal')
      .map((el) => `${el.tagName.toLowerCase()}.${el.className}`);
    expect(contained).toEqual([]);
  });
});

describe('좁은 폭 임계는 고유 크기 배치가 건다 — u-group-box 480px · u-page-header 640px', () => {
  const SEARCH = '<input placeholder="Search" style="width:120px">';

  it('카드가 480px 보다 좁으면 툴바가 제목 아래로 내려가 폭을 채운다', async () => {
    const gb = await mountGroupBox(470, SEARCH);
    const n = gb.shadowRoot!;
    const header = n.querySelector('.header')!.getBoundingClientRect();
    const titles = n.querySelector('.titles')!.getBoundingClientRect();
    const actions = n.querySelector('.actions')!.getBoundingClientRect();
    expect(actions.top).toBeGreaterThanOrEqual(titles.bottom - 1);
    // 헤더 안쪽 폭(좌우 여백 20px 씩)을 채운다.
    expect(Math.round(actions.width)).toBe(Math.round(header.width) - 40);
  });

  it('⚪NEGATIVE — 480px 이상이면 같은 줄, 툴바는 내용 폭으로 오른쪽 끝', async () => {
    const gb = await mountGroupBox(490, SEARCH);
    const n = gb.shadowRoot!;
    const header = n.querySelector('.header')!.getBoundingClientRect();
    const titles = n.querySelector('.titles')!.getBoundingClientRect();
    const actions = n.querySelector('.actions')!.getBoundingClientRect();
    expect(actions.top).toBeLessThan(titles.bottom);
    expect(Math.round(actions.right)).toBe(Math.round(header.right) - 20);
    expect(actions.width).toBeLessThan(140);
  });

  it('⚪NEGATIVE — 슬롯 내용의 이름 없는 @container 질의는 카드를 컨테이너로 삼지 않는다', async () => {
    const style = document.head.appendChild(document.createElement('style'));
    style.textContent = '.grid { display: grid; grid-template-columns: 1fr 1fr; } @container (max-width: 480px) { .grid { grid-template-columns: 1fr; } }';
    try {
      const gb = await mountGroupBox(400, SEARCH);
      expect(getComputedStyle(gb.querySelector('.grid')!).gridTemplateColumns.split(' ')).toHaveLength(2);
    } finally {
      style.remove();
    }
  });

  it('u-page-header — 640px 미만에서 액션만 내려가고 «뒤로» 링크와 제목은 한 줄에 남는다', async () => {
    const at = async (width: number) => {
      document.body.innerHTML = `<div style="width:${width}px"><u-page-header title="Orders" back="#list"><button slot="actions">New</button></u-page-header></div>`;
      const ph = document.querySelector('u-page-header') as HTMLElement & { updateComplete: Promise<unknown> };
      await ph.updateComplete;
      await settle();
      const r = (part: string) => ph.shadowRoot!.querySelector(`[part="${part}"]`)!.getBoundingClientRect();
      return { back: r('back'), heading: r('heading'), actions: r('actions'), host: ph.getBoundingClientRect() };
    };
    const narrow = await at(630);
    expect(narrow.back.top).toBeLessThan(narrow.heading.bottom);
    expect(narrow.actions.top).toBeGreaterThanOrEqual(narrow.heading.bottom - 1);
    expect(Math.round(narrow.actions.width)).toBe(Math.round(narrow.host.width));
    const wide = await at(650);
    expect(wide.actions.top).toBeLessThan(wide.heading.bottom);
    expect(Math.round(wide.actions.right)).toBe(Math.round(wide.host.right));
  });

  it('위쪽에 블록이 생기는 같은 프레임 뒤에도 카드 높이가 그대로다', async () => {
    const gb = await mountGroupBox(600, SEARCH);
    const before = gb.getBoundingClientRect().height;
    const note = document.createElement('p');
    note.textContent = 'Reason';
    gb.parentElement!.insertBefore(note, gb);
    const fieldset = gb.parentElement!.appendChild(document.createElement('fieldset'));
    fieldset.disabled = true;
    await settle();
    expect(gb.getBoundingClientRect().height).toBe(before);
  });
});
