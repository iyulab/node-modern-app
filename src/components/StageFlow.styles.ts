import { css } from 'lit';

export const styles = css`
  :host {
    display: block;
    min-width: 0;
  }

  /* 단계는 같은 폭의 칸으로 늘어서고, 칸이 --stage-flow-min-width 보다 좁아지면 다음 줄로 넘어간다.
     크기 containment(@container)를 두지 않는다 — 호스트가 그리드 · 플렉스 안에서 자기 내용으로 폭을 정할 수 있어야 한다. */
  .base {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(var(--stage-flow-min-width, 7rem), 1fr));
    gap: var(--u-space-lg, 16px) 0;
  }

  .item {
    --_count-block: calc(var(--u-text-display-size, 26px) * var(--u-text-display-leading, 1.4));
    position: relative;
    min-width: 0;
    padding-inline-end: var(--u-space-md, 12px);
  }

  /* 단계 사이 흐름 표시 — 앞 단계의 막대 칸 끝에 놓는 꺾쇠. 줄이 바뀐 첫 칸에도 남지만 순서를 해치지 않는다. */
  .item + .item::before {
    content: '';
    position: absolute;
    inset-inline-start: calc(var(--u-space-xs, 6px) * -1.5);
    top: calc(var(--_count-block) + var(--stage-flow-bar-height, 6.5rem) * 0.5);
    width: 0.45rem;
    height: 0.45rem;
    border-block-start: 0.125rem solid var(--u-txt-color-weaker, #757575);
    border-inline-end: 0.125rem solid var(--u-txt-color-weaker, #757575);
    transform: rotate(45deg);
  }
  :host(:dir(rtl)) .item + .item::before {
    transform: rotate(-135deg);
  }

  .stage {
    display: grid;
    grid-template-areas:
      'count'
      'well'
      'label'
      'description'
      'note';
    grid-template-rows: var(--_count-block) var(--stage-flow-bar-height, 6.5rem) auto auto auto;
    min-width: 0;
    color: inherit;
    text-decoration: none;
    border-radius: var(--u-radius-md, 4px);
  }

  a.stage:hover .bar:not([data-empty]) {
    filter: brightness(0.92);
  }
  a.stage:hover .label {
    text-decoration: underline;
    text-underline-offset: 0.2em;
  }
  a.stage:focus-visible {
    outline: 0.125rem solid var(--u-primary-color-weak, #2196F3);
    outline-offset: 0.25rem;
  }

  .count {
    grid-area: count;
    align-self: end;
    font-size: var(--u-text-display-size, 26px);
    font-weight: var(--u-text-display-weight, 700);
    line-height: var(--u-text-display-leading, 1.4);
    font-variant-numeric: tabular-nums;
    color: var(--u-txt-color, #212121);
    white-space: nowrap;
  }
  .unit {
    margin-inline-start: var(--u-space-3xs, 2px);
    font-size: var(--u-text-label-size, 13px);
    font-weight: var(--u-text-body-weight, 400);
    color: var(--u-txt-color-weak, #616161);
  }
  .figure {
    letter-spacing: var(--u-text-display-tracking, -0.02em);
  }

  /* 막대 칸 — 아래 기준선 위에 비율만큼 선다. 0 은 기준선만 남긴다(«없음» 도 자리를 가진다). */
  .well {
    grid-area: well;
    display: flex;
    align-items: flex-end;
    margin-block: var(--u-space-sm, 8px);
    border-block-end: 0.125rem solid var(--_ink, var(--u-txt-color, #212121));
  }
  .bar {
    display: block;
    width: 100%;
    height: calc(var(--_ratio, 0) * 100%);
    min-height: 0;
    background: var(--_ink, var(--u-txt-color, #212121));
    border-start-start-radius: var(--u-radius-sm, 3px);
    border-start-end-radius: var(--u-radius-sm, 3px);
    transition: height var(--u-duration-slow, 320ms) ease;
  }
  .bar[data-empty] {
    background: transparent;
  }

  .label {
    grid-area: label;
    font-size: var(--u-text-label-size, 13px);
    font-weight: var(--u-text-label-weight, 600);
    line-height: var(--u-text-label-leading, 1.5);
    color: var(--u-txt-color, #212121);
    overflow-wrap: anywhere;
  }
  .index {
    margin-inline-end: var(--u-space-xs, 6px);
    font-size: var(--u-text-caption-size, 12px);
    font-weight: var(--u-text-body-weight, 400);
    font-variant-numeric: tabular-nums;
    color: var(--u-txt-color-weak, #616161);
  }
  .description {
    grid-area: description;
    margin-block-start: var(--u-space-3xs, 2px);
    font-size: var(--u-text-caption-size, 12px);
    line-height: var(--u-text-caption-leading, 1.5);
    font-variant-numeric: tabular-nums;
    color: var(--u-txt-color-weak, #616161);
  }
  .note {
    grid-area: note;
    justify-self: start;
    margin-block-start: var(--u-space-xs, 6px);
    padding: var(--u-space-3xs, 2px) var(--u-space-sm, 8px);
    border-radius: var(--u-radius-pill, 9999px);
    font-size: var(--u-text-caption-size, 12px);
    font-weight: var(--u-text-label-weight, 600);
    line-height: var(--u-text-caption-leading, 1.5);
    background: var(--_ink, var(--u-txt-color, #212121));
    color: var(--_on-ink, var(--u-bg-color, #FFFFFF));
  }

  /* 톤 — 막대 · 기준선 · 수 · 알약이 함께 바뀐다. 알약 글자가 색만으로 전하지 않게 이유를 말한다. */
  .item[data-tone='warning'] {
    --_ink: var(--u-warning-color, #FDD835);
    --_on-ink: var(--u-warning-txt-color, #000000);
  }
  .item[data-tone='warning'] .count {
    color: var(--u-warning-color-strong, #8A4A00);
  }
  .item[data-tone='negative'] {
    --_ink: var(--u-danger-color, #D32F2F);
    --_on-ink: var(--u-danger-txt-color, #FFFFFF);
  }
  .item[data-tone='negative'] .count {
    color: var(--u-danger-color-strong, #C62828);
  }

  @media (prefers-reduced-motion: reduce) {
    .bar {
      transition: none;
    }
  }
`;
