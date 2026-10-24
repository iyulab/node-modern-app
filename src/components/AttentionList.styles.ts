import { css } from 'lit';

export const styles = css`
  :host {
    display: block;
    min-width: 0;
  }

  /* 줄들이 한 그리드를 나눠 쓴다(subgrid) — 행동 이름의 길이가 달라도 건수와 버튼이 줄을 넘어 같은 열에 선다. */
  .base {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    grid-template-columns: auto minmax(0, 1fr) auto auto;
    column-gap: var(--u-space-md, 12px);
  }

  /* 띠 · 글 · 건수 · 행동 — 줄마다 같은 칸이라 건수와 버튼이 세로로 맞는다. 좁으면 글 칸이 줄어 줄을 바꾼다. */
  .item {
    display: grid;
    grid-column: 1 / -1;
    grid-template-columns: subgrid;
    grid-template-areas: 'rail text count action';
    align-items: center;
    padding-block: var(--u-space-md, 12px);
    border-block-start: 1px solid var(--u-border-color-weak, #EEEEEE);
  }
  .item:first-child {
    border-block-start: 0;
  }

  .rail {
    grid-area: rail;
    align-self: stretch;
    width: var(--u-space-xs, 6px);
    min-height: var(--u-space-2xl, 24px);
    border-radius: var(--u-radius-pill, 9999px);
    background: var(--_tone, var(--u-border-color, #E0E0E0));
  }

  .text {
    grid-area: text;
    display: flex;
    flex-direction: column;
    min-width: 0;
  }
  .title {
    font-size: var(--u-text-body-size, 14px);
    font-weight: var(--u-text-subtitle-weight, 600);
    line-height: var(--u-text-body-leading, 1.6);
    color: var(--u-txt-color, #212121);
  }
  .description {
    font-size: var(--u-text-caption-size, 12px);
    line-height: var(--u-text-caption-leading, 1.5);
    color: var(--u-txt-color-weak, #616161);
  }

  .count {
    grid-area: count;
    font-size: var(--u-text-title-size, 20px);
    font-weight: var(--u-text-title-weight, 700);
    line-height: var(--u-text-title-leading, 1.45);
    font-variant-numeric: tabular-nums;
    text-align: end;
    color: var(--_count, var(--u-txt-color, #212121));
  }

  .action-cell {
    grid-area: action;
    display: flex;
    justify-content: flex-end;
  }

  .item[data-tone='negative'] {
    --_tone: var(--u-danger-color, #D32F2F);
    --_count: var(--u-danger-color-strong, #C62828);
  }
  .item[data-tone='warning'] {
    --_tone: var(--u-warning-color, #FDD835);
  }
  .item[data-tone='info'] {
    --_tone: var(--u-info-color, #1976D2);
  }

  /* 할 일이 없는 줄 — 남지만 물러선다: «없음» 도 사실이다. */
  .item[data-idle] .title,
  .item[data-idle] .count {
    color: var(--u-txt-color-weaker, #757575);
  }
`;
