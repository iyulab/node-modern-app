import { css } from 'lit';

export const styles = css`
  :host {
    display: block;
  }

  /* ★'auto-fit' + 'minmax' — **컨테이너 폭**이 열 수를 정한다.
     미디어 쿼리로 열 수를 고정하면 사이드 패널(좁은 컨테이너) 안에서 화면 폭 기준으로
     계산돼 칸이 짓눌린다. 이 방식은 어디에 놓여도 자기 폭을 본다. */
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(var(--info-min, 160px), 1fr));
    gap: var(--u-space-lg, 16px) var(--u-space-xl, 20px);
  }

  /* 지표 띠 — 넓으면 basis 0(나란히), 띠가 640px 보다 좁으면 basis 가 매우 커져 칸마다 한 줄(전부 쌓임).
     칸 사이 1px 간격이 면의 테두리 색을 비춰 구분선이 된다 — 쌓이면 가로선, 나란하면 세로선. */
  :host([layout="strip"]) .grid {
    display: flex;
    flex-wrap: wrap;
    gap: 1px;
    background: var(--u-border-color, #E0E0E0);
    border: 1px solid var(--u-border-color, #E0E0E0);
    border-radius: var(--u-radius-xl, 8px);
    overflow: hidden;
  }
  :host([layout="strip"]) ::slotted(*) {
    flex: 1 1 calc((640px - 100%) * 999);
    min-width: 0;
    padding: var(--u-space-md, 12px) var(--u-space-lg, 16px);
    background: var(--u-bg-color, #FFFFFF);
  }
`;
