import { describe, it, expect, afterEach } from 'vitest';
import { ScreenObserver as ScreenObserverFromIndex } from '../../src/index.js';
import { ScreenObserver as ScreenObserverFromReact } from '../../src/react.js';

/**
 * `SidebarLayout`을 `app.load()` 없이 `/react` 단독으로 쓰는 소비자에게는 반응형
 * (large→slim, medium→modal, small→mobile)을 구동할 공개 수단이 없었다 — `ScreenObserver`가
 * `internals/`에만 있고 `index.ts`/`react.ts` 어디에도 export되지 않아, 소비자는
 * `@iyulab/modern-app/dist/internals/ScreenObserver.js`를 직접 import하는 비공개 경로에
 * 의존해야 했다. 이제 둘 다에서 정식 export된다.
 */

let el: HTMLDivElement | null = null;

afterEach(() => {
  el?.remove();
  el = null;
});

describe('ScreenObserver — 공개 API', () => {
  it('index.ts와 react.ts가 같은 클래스를 export한다', () => {
    expect(ScreenObserverFromIndex).toBe(ScreenObserverFromReact);
  });

  it('🔴index.ts에서 import한 클래스로 관찰·해제가 실제로 동작한다(app.load() 없이)', async () => {
    el = document.body.appendChild(document.createElement('div'));
    el.style.width = '1000px';

    let lastSize: string | undefined;
    const handler = (e: Event) => { lastSize = (e as CustomEvent<{ size: string }>).detail.size; };
    window.addEventListener('screen-resize', handler);

    const observer = new ScreenObserverFromIndex({ element: el, breakpoints: [768, 1024] });
    expect(observer.get()).toBe('medium'); // 768 <= 1000 < 1024

    observer.destroy();
    window.removeEventListener('screen-resize', handler);
    expect(lastSize).toBe('medium');
  });
});
