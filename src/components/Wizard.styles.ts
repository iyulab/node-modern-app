import { css } from 'lit';

export const styles = css`
  :host {
    display: flex;
    flex-direction: row;
    gap: var(--u-space-xl, 20px);
    min-width: 0;
  }
  :host([orientation="horizontal"]) {
    flex-direction: column;
  }

  .indicator {
    display: flex;
    flex-direction: column;
    gap: var(--u-space-sm, 8px);
    flex: 0 0 auto;
    margin: 0;
    padding: 0;
  }
  :host([orientation="horizontal"]) .indicator {
    flex-direction: row;
    flex-wrap: wrap;
  }

  .content {
    flex: 1 1 auto;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: var(--u-space-lg, 16px);
  }

  .step {
    display: inline-flex;
    align-items: center;
    gap: var(--u-space-sm, 8px);
    background: none;
    border: none;
    padding: var(--u-space-2xs, 4px) 0;
    font: inherit;
    color: var(--u-txt-color-weak, #757575);
    cursor: pointer;
    text-align: left;
  }
  .step[disabled] {
    color: var(--u-txt-color-disabled, #BDBDBD);
    cursor: not-allowed;
  }
  /* 도달은 못 하지만(linear 모드에서 아직 안 지나온 스텝) disabled 는 아니다 —
     소비자가 미리 그 존재는 보여주고 싶을 수 있어 시각적으로 흐리되 마우스 커서는
     "막혔다"가 아니라 "여기는 아직"으로 남긴다. */
  .step[aria-disabled="true"]:not([disabled]) {
    cursor: default;
    opacity: 0.6;
  }

  .marker {
    flex: 0 0 auto;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 1.5em;
    height: 1.5em;
    border-radius: 50%;
    border: 1px solid var(--u-border-color-strong, #BDBDBD);
    font-size: var(--u-text-caption-size, 12px);
    font-weight: var(--u-text-label-weight, 600);
  }
  .step.active .marker {
    border-color: var(--u-primary-color, #1976D2);
    color: var(--u-primary-color, #1976D2);
  }
  .step.state-done .marker {
    background-color: var(--u-primary-color, #1976D2);
    border-color: var(--u-primary-color, #1976D2);
    color: var(--u-txt-color-inverse, #FFFFFF);
  }
  .step.state-error .marker {
    border-color: var(--u-danger-color, #D32F2F);
    color: var(--u-danger-color, #D32F2F);
  }

  .label {
    font-size: var(--u-text-label-size, 13px);
  }

  .panel {
    min-width: 0;
  }

  .actions {
    display: flex;
    gap: var(--u-space-sm, 8px);
  }

  /* live region — 화면엔 안 보이지만 스크린리더는 읽는다. 폭/높이는 디자인 토큰이 아니라
     "존재는 하되 렌더 크기는 0에 가까워야" 하는 구조값이라 var() 로 감싼다(리터럴 스캔
     예외 — 시트 자체와 무관한 값이라 시트에 실을 이유가 없다). */
  .announcement {
    position: absolute;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    width: var(--_a11y-unit, 1px);
    height: var(--_a11y-unit, 1px);
    margin: calc(-1 * var(--_a11y-unit, 1px));
    padding: 0;
    border: 0;
  }
`;
