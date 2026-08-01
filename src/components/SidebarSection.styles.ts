import { css } from 'lit';

export const styles = css`
  :host {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin: 8px 0;
  }

  .header {
    display: flex;
    flex-direction: column;
    padding: 8px 12px 4px;
  }

  /* ⚠아래 두 색만 팔레트를 직접 읽는다 — 시맨틱 토큰으로 옮기면 대비가 무너지기 때문이다.
     섹션 제목·부제는 본문(neutral-800)보다 약한 3단 위계를 이루는데, 역할 층의 보조
     텍스트 단은 --u-txt-color-weak 하나뿐이고 그 값은 흰 배경에서 2.68:1 이라
     WCAG AA(4.5:1)에 미달한다. 현행 두 값은 6.19:1 · 4.61:1 로 통과한다.
     ⇒ 역할 층에 AA 를 넘는 보조 텍스트 단이 생기면 그때 옮긴다. */
  .title {
    color: var(--u-neutral-700, #616161);
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.5px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .subtitle {
    color: var(--u-neutral-600, #757575);
    font-size: 11px;
    font-weight: 300;
  }

  .items {
    display: flex;
    flex-direction: column;
  }
`;