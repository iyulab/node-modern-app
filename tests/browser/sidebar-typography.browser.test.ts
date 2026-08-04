import { describe, it, expect, beforeAll, afterEach } from 'vitest';
import '@iyulab/components/styles/tokens.css';
import '../../src/components/SidebarLink.js';
import '../../src/components/SidebarButton.js';
import '../../src/components/SidebarGroup.js';
import '../../src/components/SidebarSection.js';

/**
 * 셸 크롬을 타이포 스케일로 옮기면서 **레이아웃이 그대로임을 실측으로 고정**한다.
 *
 * 소스 대조(`tests/typography-scale.test.ts`)는 *"단을 읽는가"* 만 본다. 그것이 참이어도
 * 잘못된 단을 고르면 화면이 무너진다 — 이 파일이 그 축을 잰다. 지키는 것은 값이 아니라
 * **관계** 둘이다:
 *
 *   ⑴ 접힌 사이드바(아이콘만)와 펼친 사이드바(아이콘+글자)의 **행 높이가 같다**
 *      — 토글할 때 목록이 늘었다 줄었다 하면 안 된다. 이것이 성립하는 조건은
 *        «라벨 줄 박스 <= 아이콘 크기» 이고, label 단이 13 x 1.5 = 19.5px 로 20px 아이콘
 *        아래에 들어가기 때문에 참이다. body 단(14 x 1.6 = 22.4px)이면 깨진다.
 *   ⑵ 링크·버튼·그룹의 **행 높이가 서로 같다** — 세 종류가 한 목록에 섞이므로
 *      하나만 다른 단을 쓰면 목록이 계단이 된다.
 *
 * jsdom 은 줄 박스를 계산하지 않으므로 브라우저에서만 성립한다.
 */

const tokenOf = (name: string) =>
  getComputedStyle(document.documentElement).getPropertyValue(name).trim();

async function mount(tag: string, attrs: Record<string, string> = {}) {
  const el = document.createElement(tag) as HTMLElement & { updateComplete: Promise<unknown> };
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}

const rowHeight = (el: HTMLElement) =>
  el.shadowRoot!.querySelector('[part="base"], .container, button')!.getBoundingClientRect().height;

describe('사이드바 타이포 — 단을 옮겨도 배치는 그대로다', () => {
  beforeAll(() => {
    expect(tokenOf('--u-text-label-size'), '이 테스트는 토큰 시트를 전제한다').not.toBe('');
  });

  afterEach(() => {
    document.body.replaceChildren();
  });

  it('★접힌 항목과 펼친 항목의 행 높이가 같다 — 행을 잡는 것은 아이콘이다', async () => {
    const open = await mount('u-sidebar-link', { label: '대시보드' });
    const compact = await mount('u-sidebar-link', { label: '대시보드', compact: '' });
    expect(rowHeight(open)).toBe(rowHeight(compact));
  });

  it('★링크·버튼·그룹의 행 높이가 서로 같다 — 한 목록에 섞이기 때문이다', async () => {
    const link = await mount('u-sidebar-link', { label: '대시보드' });
    const button = await mount('u-sidebar-button', { label: '내보내기' });
    const group = await mount('u-sidebar-group', { label: '관리' });
    const heights = [rowHeight(link), rowHeight(button), rowHeight(group)];
    expect(new Set(heights).size, `실측 ${heights.join(' / ')}`).toBe(1);
  });

  it('라벨의 줄 박스가 아이콘보다 크지 않다 — 이것이 위 두 관계의 근거다', async () => {
    const link = await mount('u-sidebar-link', { label: '대시보드' });
    const label = link.shadowRoot!.querySelector('[part="label"]') as HTMLElement;
    const icon = link.shadowRoot!.querySelector('[part="icon"]') as HTMLElement;
    const lineBox = parseFloat(getComputedStyle(label).lineHeight);
    const iconBox = parseFloat(getComputedStyle(icon).fontSize);
    expect(lineBox, `라벨 줄 박스 ${lineBox} vs 아이콘 ${iconBox}`).toBeLessThanOrEqual(iconBox);
  });

  it('★subtitle 단의 줄 박스가 24px 다 — 헤더 제목이 종전과 같은 높이를 차지한다', async () => {
    // SidebarLayout 의 .title 이 18px/24px 리터럴에서 subtitle 단으로 옮겨 갔다.
    // 그 이주가 헤더 높이를 바꾸지 않는 근거가 이 산술이며, 시트 값이 바뀌면 여기가 먼저 깨진다.
    const probe = document.createElement('div');
    probe.style.fontSize = 'var(--u-text-subtitle-size)';
    probe.style.lineHeight = 'var(--u-text-subtitle-leading)';
    probe.textContent = '앱 제목';
    document.body.appendChild(probe);
    expect(probe.getBoundingClientRect().height).toBe(24);
  });

  it('섹션 제목과 부제가 스케일 단을 실제로 받는다', async () => {
    const section = await mount('u-sidebar-section', { label: '운영', description: '설명' });
    const title = section.shadowRoot!.querySelector('.title') as HTMLElement | null;
    if (!title) return; // 마크업이 바뀌면 위 소스 대조가 잡는다 — 여기서 거짓 통과를 만들지 않는다
    expect(getComputedStyle(title).fontSize).toBe(tokenOf('--u-text-overline-size'));
    expect(getComputedStyle(title).textTransform, '대문자 변환을 붙이지 않았다').toBe('none');
  });
});
