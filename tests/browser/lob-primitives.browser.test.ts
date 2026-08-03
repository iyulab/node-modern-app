import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import '@iyulab/components/styles/tokens.css';
import '../../src/components/PageHeader.js';
import '../../src/components/GroupBox.js';
import '../../src/components/InfoSection.js';
import '../../src/components/InfoField.js';
import '../../src/components/EmptyState.js';

/**
 * 프리미티브를 **실제로 렌더해** 검증한다.
 *
 * ★소스 대조(`tests/lob-primitives.test.ts`)와 이 파일은 **다른 것을 잡는다.** 전자는
 * 토큰이 적혀 있음을 보이고, 후자는 **그 마크업이 의도한 DOM 을 만드는지**를 본다.
 * 이 컴포넌트들에는 소스만 봐서는 절대 드러나지 않는 함정이 둘 있다:
 *
 * ⑴ **`render()` 안의 `this.querySelector()`** — 라이트 DOM 자식을 렌더 시점에 읽는다.
 *    자식이 아직 파싱되지 않았거나 나중에 붙으면 `null` 이고, 그 분기는 **조용히**
 *    다른 것을 그린다(제목이 통째로 사라지는 식). 소스에는 아무 이상이 없다.
 * ⑵ **`:not(:has(*))`** — `<slot>` 을 감싼 래퍼를 비었을 때 접으려는 규칙인데,
 *    `<slot>` 자신이 자식이므로 `:has(*)` 가 **항상 참일 수 있다.** 그러면 빈 배지 자리가
 *    남아 제목 위치가 화면마다 달라지는데, 그것이 바로 이 컴포넌트가 없애려던 문제다.
 *
 * jsdom/happy-dom 은 `:has()` 도 슬롯 배정도 실제로 계산하지 않으므로 브라우저에서만 성립한다.
 */

let host: HTMLDivElement;

beforeEach(() => {
  host = document.createElement('div');
  document.body.appendChild(host);
});
afterEach(() => host.remove());

const settle = async () => {
  await new Promise(r => requestAnimationFrame(() => r(null)));
  await new Promise(r => setTimeout(r, 0));
};

const partOf = (el: Element, name: string) =>
  el.shadowRoot!.querySelector<HTMLElement>(`[part="${name}"]`);

describe('u-info-field — 빈 값과 0 이 화면에서 갈린다', () => {
  it('🔴`0` 은 `0` 으로 렌더된다 (— 가 아니다)', async () => {
    host.innerHTML = `<u-info-field label="부수"></u-info-field>`;
    const el = host.firstElementChild as HTMLElement & { value?: unknown };
    el.value = 0;
    await settle();
    const value = partOf(el, 'value')!;
    expect(value.textContent!.trim()).toBe('0');
    expect(value.classList.contains('blank')).toBe(false);
  });

  it('값이 없으면 `—` 로 렌더된다', async () => {
    host.innerHTML = `<u-info-field label="비고"></u-info-field>`;
    const el = host.firstElementChild as HTMLElement;
    await settle();
    const value = partOf(el, 'value')!;
    expect(value.textContent!.trim()).toBe('—');
    expect(value.classList.contains('blank')).toBe(true);
  });

  it('빈 문자열도 `—` 다 (0 과 다른 취급)', async () => {
    host.innerHTML = `<u-info-field label="비고"></u-info-field>`;
    const el = host.firstElementChild as HTMLElement & { value?: unknown };
    el.value = '';
    await settle();
    expect(partOf(el, 'value')!.textContent!.trim()).toBe('—');
  });

  it('슬롯 내용이 `value` 를 이긴다', async () => {
    host.innerHTML = `<u-info-field label="거래처">동서인쇄</u-info-field>`;
    const el = host.firstElementChild as HTMLElement & { value?: unknown };
    el.value = null;
    await settle();
    // 슬롯이 있으면 blank 분기로 가지 않는다 — 텍스트는 라이트 DOM 에 남아 있다.
    expect(partOf(el, 'value')!.classList.contains('blank')).toBe(false);
    expect(el.textContent!.trim()).toBe('동서인쇄');
  });

  it('`numeric` 이 우정렬 + 고정폭 숫자를 실제로 낸다', async () => {
    host.innerHTML = `<u-info-field label="금액" numeric></u-info-field>`;
    const el = host.firstElementChild as HTMLElement & { value?: unknown };
    el.value = 1234567;
    await settle();
    const cs = getComputedStyle(partOf(el, 'value')!);
    expect(cs.textAlign).toBe('right');
    expect(cs.fontVariantNumeric).toContain('tabular-nums');
  });
});

describe('u-group-box — 헤더 분기', () => {
  it('제목만 있어도 헤더가 나온다', async () => {
    host.innerHTML = `<u-group-box title="수금"></u-group-box>`;
    const el = host.firstElementChild as HTMLElement;
    await settle();
    expect(partOf(el, 'header')).not.toBeNull();
    expect(partOf(el, 'title')!.textContent!.trim()).toBe('수금');
  });

  it('🔴제목 없이 **슬롯 액션만** 있어도 헤더가 나온다 (querySelector 타이밍)', async () => {
    // render() 가 라이트 DOM 을 읽는 자리다. 자식이 늦게 붙으면 null 이 되어
    // 헤더가 통째로 사라진다 — 소스에는 아무 이상이 없다.
    host.innerHTML = `<u-group-box><a slot="actions" href="#">수정</a></u-group-box>`;
    const el = host.firstElementChild as HTMLElement;
    await settle();
    expect(getComputedStyle(partOf(el, 'header')!).display,
      '슬롯 액션만 있을 때 헤더가 접혔다').not.toBe('none');
  });

  it('🔴자식을 **나중에** 붙여도 헤더가 따라온다', async () => {
    host.innerHTML = `<u-group-box></u-group-box>`;
    const el = host.firstElementChild as HTMLElement & { requestUpdate?: () => void };
    await settle();
    const a = document.createElement('a');
    a.slot = 'actions';
    a.textContent = '수정';
    el.appendChild(a);
    // ★requestUpdate() 를 **부르지 않는다** — 소비자가 그것을 부를 이유가 없다.
    //   slotchange 가 스스로 갱신을 일으켜야 한다.
    await settle();
    expect(getComputedStyle(partOf(el, 'header')!).display,
      '나중에 붙은 슬롯을 못 봤다').not.toBe('none');
  });

  it('제목도 액션도 없으면 헤더가 없다', async () => {
    host.innerHTML = `<u-group-box>본문</u-group-box>`;
    const el = host.firstElementChild as HTMLElement;
    await settle();
    // DOM 에서 빼지 않고 **접는다** — 슬롯이 렌더되지 않으면 slotchange 가 영영 안 온다.
    expect(getComputedStyle(partOf(el, 'header')!).display).toBe('none');
  });
});

describe('u-page-header — 빈 상태 슬롯이 자리를 차지하지 않는다', () => {
  it('🔴상태 배지가 없으면 그 래퍼가 접힌다 (`:has()` 가 실제로 동작하는가)', async () => {
    host.innerHTML = `<u-page-header title="주문"></u-page-header>`;
    const el = host.firstElementChild as HTMLElement;
    await settle();
    const status = partOf(el, 'status')!;
    expect(getComputedStyle(status).display, '빈 배지 자리가 남아 제목을 민다').toBe('none');
  });

  it('상태 배지가 있으면 보인다', async () => {
    host.innerHTML = `<u-page-header title="주문"><span slot="status">완료</span></u-page-header>`;
    const el = host.firstElementChild as HTMLElement;
    await settle();
    expect(getComputedStyle(partOf(el, 'status')!).display).not.toBe('none');
  });

  it('제목이 타입 스케일을 실제로 받는다', async () => {
    host.innerHTML = `<u-page-header title="주문"></u-page-header>`;
    const el = host.firstElementChild as HTMLElement;
    await settle();
    const cs = getComputedStyle(partOf(el, 'title')!);
    // 시트가 로드돼 있으므로 폴백이 아니라 토큰 값이 와야 한다.
    expect(parseFloat(cs.fontSize)).toBeGreaterThanOrEqual(20);
    expect(Number(cs.fontWeight)).toBeGreaterThanOrEqual(600);
  });

  it('`back` 이 없으면 뒤로가기 링크가 없다', async () => {
    host.innerHTML = `<u-page-header title="주문"></u-page-header>`;
    const el = host.firstElementChild as HTMLElement;
    await settle();
    expect(partOf(el, 'back')).toBeNull();
  });
});

describe('u-info-section — 컨테이너 폭이 열 수를 정한다', () => {
  it('좁은 컨테이너에서 열이 줄어든다 (미디어 쿼리가 아니라 컨테이너 기준)', async () => {
    host.style.width = '200px';
    host.innerHTML = `
      <u-info-section min="160">
        <u-info-field label="a" ></u-info-field>
        <u-info-field label="b" ></u-info-field>
      </u-info-section>`;
    const el = host.querySelector('u-info-section') as HTMLElement;
    await settle();
    const cols = getComputedStyle(partOf(el, 'grid')!).gridTemplateColumns.split(/\s+/).length;
    expect(cols, '좁은 컨테이너인데 열이 둘 이상이다').toBe(1);
  });

  it('넓은 컨테이너에서는 열이 늘어난다', async () => {
    host.style.width = '900px';
    host.innerHTML = `
      <u-info-section min="160">
        <u-info-field label="a"></u-info-field>
        <u-info-field label="b"></u-info-field>
      </u-info-section>`;
    const el = host.querySelector('u-info-section') as HTMLElement;
    await settle();
    const cols = getComputedStyle(partOf(el, 'grid')!).gridTemplateColumns.split(/\s+/).length;
    expect(cols).toBeGreaterThan(1);
  });
});

describe('u-empty-state — 두 variant 가 화면에서 다르다', () => {
  it('기본 문구가 서로 다르다', async () => {
    host.innerHTML = `<u-empty-state variant="no-data"></u-empty-state>
                      <u-empty-state variant="no-results"></u-empty-state>`;
    const [a, b] = [...host.children] as HTMLElement[];
    await settle();
    expect(partOf(a, 'title')!.textContent!.trim())
      .not.toBe(partOf(b, 'title')!.textContent!.trim());
  });

  it('액션이 없으면 액션 영역이 접힌다', async () => {
    host.innerHTML = `<u-empty-state></u-empty-state>`;
    const el = host.firstElementChild as HTMLElement;
    await settle();
    expect(getComputedStyle(partOf(el, 'actions')!).display).toBe('none');
  });
});
