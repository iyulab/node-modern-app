import { css } from 'lit';

export const styles = css`
  :host {
    display: flex;
    align-items: flex-start;
    gap: var(--u-space-md, 12px);
    flex-wrap: wrap;
    margin-bottom: var(--u-space-2xl, 24px);
  }

  .heading {
    flex: 1 1 auto;
    min-width: 0; /* 긴 제목이 액션을 밀어내지 않게 — 줄바꿈이 아니라 축소가 먼저다 */
  }

  .title-row {
    display: flex;
    align-items: center;
    gap: var(--u-space-sm, 8px);
    flex-wrap: wrap;
  }

  .title {
    margin: 0;
    font-size: var(--u-text-display-size, 26px);
    font-weight: var(--u-text-display-weight, 700);
    line-height: var(--u-text-display-leading, 1.4);
    letter-spacing: var(--u-text-display-tracking, -0.02em);
    color: var(--u-txt-color, #212121);
  }

  .subtitle {
    margin: var(--u-space-2xs, 4px) 0 0;
    font-size: var(--u-text-caption-size, 12px);
    font-weight: var(--u-text-caption-weight, 400);
    line-height: var(--u-text-caption-leading, 1.5);
    color: var(--u-txt-color-weak, #757575);
  }

  .back {
    flex: 0 0 auto;
    align-self: center;
    font-size: var(--u-text-label-size, 13px);
    font-weight: var(--u-text-label-weight, 600);
    color: var(--u-link-txt-color, #1565C0);
    text-decoration: none;
  }
  .back::before {
    content: '←';
    margin-right: var(--u-space-3xs, 2px);
  }
  .back:hover {
    text-decoration: underline;
  }

  /* 상태 슬롯이 비어 있으면 자리를 차지하지 않는다 — 빈 배지 자리가 제목을 밀면
     같은 화면인데 제목 위치가 달라 보인다. */
  .status:not(:has(*)) {
    display: none;
  }

  .actions {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    gap: var(--u-space-sm, 8px);
    margin-left: auto;
  }

  /* 좁은 화면: 액션이 제목 아래로 내려가고 **왼쪽 정렬**이 된다.
     ★오른쪽 정렬을 유지하면 손가락이 닿기 어려운 쪽으로 몰린다. */
  @media (max-width: 640px) {
    .actions {
      margin-left: 0;
      width: 100%;
    }
  }
`;
