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
  /* 칸 여백은 칸이 자기 섀도 안에서 그린다(u-info-field 의 --_info-field-padding) — 여기서 ::slotted 로 준 여백은
     문서의 전역 리셋(Tailwind preflight 류)에 진다: 캡슐화 문맥이 다르면 문서 쪽 normal 선언이 이긴다.
     u-info-field 가 아닌 칸에는 종전대로 ::slotted 여백을 준다(리셋 아래에서는 그 칸이 스스로 여백을 가져야 한다). */
  :host([layout="strip"]) ::slotted(*) {
    flex: 1 1 calc((640px - 100%) * 999);
    min-width: 0;
    background: var(--u-bg-color, #FFFFFF);
    --_info-field-padding: var(--u-space-md, 12px) var(--u-space-lg, 16px);
  }
  /* reset-ok: u-info-field 가 아닌 칸은 그 안쪽을 이 요소가 그릴 수 없다 — 리셋 아래에서는 그 칸이 스스로 여백을 가져야 한다(스킬 문서). */
  :host([layout="strip"]) ::slotted(:not(u-info-field)) {
    padding: var(--u-space-md, 12px) var(--u-space-lg, 16px);
  }
`;
