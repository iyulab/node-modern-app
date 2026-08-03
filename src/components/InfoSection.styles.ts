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
`;
