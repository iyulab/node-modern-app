import { css } from 'lit';

export const styles = css`
  :host {
    display: block;
    background-color: var(--u-panel-bg-color, #FFFFFF);
    border: 1px solid var(--u-border-color-weak, #EEEEEE);
    /* 면(surface) 단 — 컨트롤과 같은 반경을 쓰면 큰 사각형이 각져 보인다. */
    border-radius: var(--u-radius-2xl, 12px);
    box-shadow: var(--u-shadow-sm, 0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 1px rgba(0, 0, 0, 0.04));
  }

  .header {
    display: flex;
    align-items: center;
    gap: var(--u-space-sm, 8px);
    padding: var(--u-space-xl, 20px) var(--u-space-xl, 20px) 0;
  }
  /* 제목도 액션도 없으면 헤더를 접는다. ★DOM 에서 빼지 않고 접는 이유 =
     슬롯 배정을 'slotchange' 로 알아야 하는데, 슬롯이 렌더되지 않으면 그 이벤트가
     영영 오지 않는다(자식을 나중에 붙이는 소비자가 헤더를 못 얻는다). */
  .header.empty {
    display: none;
  }

  .header.divider {
    padding-bottom: var(--u-space-md, 12px);
    border-bottom: 1px solid var(--u-border-color-weak, #EEEEEE);
  }

  .title {
    margin: 0;
    flex: 1 1 auto;
    min-width: 0;
    font-size: var(--u-text-subtitle-size, 16px);
    font-weight: var(--u-text-subtitle-weight, 600);
    line-height: var(--u-text-subtitle-leading, 1.5);
    letter-spacing: var(--u-text-subtitle-tracking, 0);
    color: var(--u-txt-color, #212121);
  }

  .actions {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    gap: var(--u-space-sm, 8px);
    font-size: var(--u-text-label-size, 13px);
    font-weight: var(--u-text-label-weight, 600);
  }
  /* 빈 슬롯 래퍼는 접는다.
     ⚠**CSS ':has()' 로는 못 한다** — <slot> 자신이 자식 요소라 ':has(*)' 가 항상 참이다
     (실브라우저 테스트로 확인했다. 소스 검사와 jsdom 은 둘 다 통과시킨다).
     배정 상태는 'slotchange' 로 추적해 '.empty' 클래스로 내려온다 — internals/slotted.ts */
  .actions.empty {
    display: none;
  }

  .body {
    padding: var(--u-space-xl, 20px);
  }
  /* 표를 카드 가장자리까지 붙일 때. 헤더가 있으면 위 여백만 남긴다 —
     0 으로 만들면 제목과 표가 붙어 읽기 어려워진다. */
  .body.flush {
    padding: 0;
  }
  /* 헤더가 접혀 있으면 위 여백도 없다 — 인접 선택자는 'display:none' 을 보지 못하므로
     클래스로 갈라야 한다. */
  .header:not(.empty) + .body.flush {
    padding-top: var(--u-space-md, 12px);
  }
`;
