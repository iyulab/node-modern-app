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
  .actions:not(:has(*)) {
    display: none;
  }
`;
