import { css } from 'lit';

export const styles = css`
  :host {
    display: block;
    background-color: var(--u-panel-bg-color, #FFFFFF);
    border: 1px solid var(--u-border-color-weak, #EEEEEE);
    /* 면(surface) 단 — 컨트롤과 같은 반경을 쓰면 큰 사각형이 각져 보인다. */
    border-radius: var(--u-radius-2xl, 12px);
    box-shadow: var(--u-shadow-sm, 0 1px 3px rgba(0, 0, 0, 0.08));
  }

  .header {
    display: flex;
    align-items: center;
    gap: var(--u-space-sm, 8px);
    padding: var(--u-space-xl, 20px) var(--u-space-xl, 20px) 0;
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
  .actions:not(:has(*)) {
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
  .header + .body.flush {
    padding-top: var(--u-space-md, 12px);
  }
`;
