import { css } from 'lit';

export const styles = css`
  :host {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: var(--u-space-4xl, 40px) var(--u-space-xl, 20px);
    color: var(--u-txt-color-weak, #757575);
  }

  .icon {
    /* 타입 스케일 밖이다 — 글자가 아니라 장식이라서. 대신 소비자 훅을 연다
       (아이콘을 SVG 로 갈아 끼우는 소비자가 크기를 맞출 수 있어야 한다). */
    font-size: var(--empty-state-icon-size, 32px);
    line-height: 1;
    margin-bottom: var(--u-space-md, 12px);
    opacity: 0.7;
  }

  .title {
    margin: 0;
    font-size: var(--u-text-subtitle-size, 16px);
    font-weight: var(--u-text-subtitle-weight, 600);
    line-height: var(--u-text-subtitle-leading, 1.5);
    /* 제목은 본문 색이다 — 빈 상태 전체를 흐리게 만들면 "로딩 중"으로 오독된다. */
    color: var(--u-txt-color, #212121);
  }

  .description {
    margin: var(--u-space-2xs, 4px) 0 0;
    font-size: var(--u-text-caption-size, 12px);
    line-height: var(--u-text-caption-leading, 1.5);
  }

  .actions {
    display: flex;
    gap: var(--u-space-sm, 8px);
    margin-top: var(--u-space-lg, 16px);
  }
  /* 빈 슬롯 래퍼는 접는다.
     ⚠**CSS ':has()' 로는 못 한다** — <slot> 자신이 자식 요소라 ':has(*)' 가 항상 참이다
     (실브라우저 테스트로 확인했다. 소스 검사와 jsdom 은 둘 다 통과시킨다).
     배정 상태는 'slotchange' 로 추적해 '.empty' 클래스로 내려온다 — internals/slotted.ts */
  .actions.empty {
    display: none;
  }
`;
