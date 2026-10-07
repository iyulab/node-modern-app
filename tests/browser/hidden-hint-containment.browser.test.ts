import { describe, it, expect, afterEach } from 'vitest';
import '../../src/components/Wizard.js';

/**
 * **화면 낭독기 전용 알림(`.announcement`)은 요소 안에 갇힌다.** 절대 위치 상자라, 요소 안에 위치 지정된 조상이 없으면 포함
 * 블록이 문서 전체가 되어 호스트의 `overflow` 감싸개를 건너뛰고 문서를 늘린다(위치 지정되지 않은 스크롤 상자 안에서).
 * 판정: 알림의 `offsetParent` 가 `body` 가 아니다.
 */
afterEach(() => document.body.replaceChildren());

describe('u-wizard — 숨김 알림의 포함 블록', () => {
  it('단계 알림은 요소 안에 갇힌다', async () => {
    const box = document.createElement('div');
    box.style.cssText = 'height: 100px; overflow: auto;';
    const spacer = document.createElement('div');
    spacer.style.height = '3000px';
    const el = document.createElement('u-wizard') as HTMLElement & { steps: unknown[]; updateComplete: Promise<unknown> };
    el.steps = [{ id: 'a', label: 'Account' }, { id: 'b', label: 'Profile' }];
    box.append(spacer, el);
    document.body.appendChild(box);
    await el.updateComplete;
    const hint = el.shadowRoot!.querySelector('.announcement') as HTMLElement;
    expect(hint).not.toBeNull();
    expect(hint.offsetParent).not.toBe(document.body);
    expect(document.documentElement.scrollHeight).toBeLessThanOrEqual(window.innerHeight);
  });
});
