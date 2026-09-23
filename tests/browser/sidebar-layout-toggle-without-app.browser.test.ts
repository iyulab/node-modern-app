import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import '@iyulab/components/styles/tokens.css';
import '../../src/layouts/SidebarLayout.js';
import { ScreenObserver } from '../../src/index.js';
import type { SidebarLayout } from '../../src/layouts/SidebarLayout.js';

/**
 * 규약: **토글은 레이아웃이 받은 화면 크기를 따른다 — `app.load()` 를 거쳤든 아니든.**
 *
 * ★결함(docket `#409`): 크기 «전환» 은 `screen-resize` 이벤트로 받으면서 토글은 싱글턴
 * `app.screen` 을 읽었다. `app.screen` 은 `app.load()` 가 옵저버를 만들 때만 있으므로,
 * `/react` 진입점처럼 레이아웃과 `ScreenObserver` 를 직접 조립하면 언제나 `undefined` →
 * `'large'` 로 떨어졌다. 그래서 모바일 폭에서 메뉴를 열면 `mobile → mobile-open` 이 아니라
 * **`mobile → default`**(데스크톱 사이드바가 좁은 화면에 펼쳐진다)가 됐다.
 *
 * ⚠**초기 상태만 단언하면 이 결함을 못 잡는다** — 초기 `mobile` 은 이벤트로 맞게 선다.
 * 그래서 여기서는 **토글 전이** 를 잰다.
 */

let host: HTMLDivElement;
let frame: HTMLDivElement;
let observer: ScreenObserver | undefined;

beforeEach(() => {
  host = document.createElement('div');
  frame = document.createElement('div');
  document.body.append(frame, host);
});
afterEach(() => {
  observer?.destroy();
  observer = undefined;
  host.remove();
  frame.remove();
});

async function assemble(width: number): Promise<SidebarLayout> {
  const el = document.createElement('u-sidebar-layout') as SidebarLayout;
  el.config = { type: 'sidebar' };
  host.appendChild(el);
  await el.updateComplete;
  // `app.load()` 없이 — /react 소비자가 하는 조립 그대로.
  frame.style.width = `${width}px`;
  observer = new ScreenObserver({ element: frame, breakpoints: [768, 1024] });
  await el.updateComplete;
  return el;
}

/** 지금 보이는 토글 버튼(모바일 헤더 또는 사이드바 헤더). */
function toggle(el: SidebarLayout): HTMLElement {
  const buttons = [...el.shadowRoot!.querySelectorAll<HTMLElement>('u-button.toggler')];
  const visible = buttons.find(b => b.getBoundingClientRect().width > 0);
  expect(visible, '보이는 토글이 있다').toBeTruthy();
  return visible!;
}

async function press(el: SidebarLayout): Promise<void> {
  toggle(el).click();
  await el.updateComplete;
}

describe('SidebarLayout — app.load() 없이 조립해도 토글이 화면 크기를 따른다', () => {
  it('🔴small: mobile → mobile-open → mobile', async () => {
    const el = await assemble(600);
    expect(el.state).toBe('mobile');
    await press(el);
    expect(el.state).toBe('mobile-open');
    await press(el);
    expect(el.state).toBe('mobile');
  });

  it('🔴medium: slim → modal → slim', async () => {
    const el = await assemble(900);
    expect(el.state).toBe('slim');
    await press(el);
    expect(el.state).toBe('modal');
    await press(el);
    expect(el.state).toBe('slim');
  });

  it('NEGATIVE: large: default ↔ slim 은 종전과 같다', async () => {
    const el = await assemble(1200);
    expect(el.state).toBe('default');
    await press(el);
    expect(el.state).toBe('slim');
    await press(el);
    expect(el.state).toBe('default');
  });
});
