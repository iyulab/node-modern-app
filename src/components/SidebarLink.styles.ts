import { css } from 'lit';

export const styles = css`
  :host {
    /* 활성 배경의 단일 원천. 소비자는 셸 계약 토큰(--app-sidebar-active-bg) 또는
       역할 토큰(--u-primary-color) 어느 쪽을 덮어도 hover 파생까지 함께 따라온다.
       팔레트(--u-blue-600)를 직접 읽으면 브랜드를 바꾸려는 소비자가 "진짜 파랑"이
       필요한 배지·차트까지 함께 오염시키는 길밖에 없다. */
    --link-active-bg: var(--app-sidebar-active-bg, var(--u-primary-color, #1976D2));

    display: block;
    color: var(--app-sidebar-fg, var(--u-txt-color, #212121));
    background-color: transparent;
    border-radius: 8px;
    transition: all 0.2s ease;
    cursor: pointer;
  }
  :host(:hover) {
    color: var(--u-txt-color-hover, #1565C0);
    background-color: var(--u-bg-color-hover, #F5F5F5);
  }
  :host([selected]) {
    color: var(--app-sidebar-active-fg, var(--u-txt-color-inverse, #FFFFFF));
    background-color: var(--link-active-bg);
    box-shadow: 0 1px 3px var(--u-shadow-color-weak, rgba(0, 0, 0, 0.08));
  }
  :host([selected]:hover) {
    color: var(--app-sidebar-active-fg, var(--u-txt-color-inverse, #FFFFFF));
    background-color: color-mix(in srgb, var(--link-active-bg) 85%, black);
    box-shadow: 0 2px 6px var(--u-shadow-color-normal, rgba(0, 0, 0, 0.12));
  }
  
  .container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 12px;
    padding: 8px 12px;
  }
  .container[compact] {
    justify-content: center;
    gap: 0;
    padding: 8px;
  }

  u-icon {
    flex-shrink: 0;
    color: inherit;
    font-size: 20px;
  }

  /*
   * ★내비 항목은 «대상의 짧은 이름» = label 단이다(용도 배정 — DL-157-4).
   * ⚠행 높이는 바뀌지 않는다: 13 x 1.5 = 19.5px < 아이콘 20px 이라 행을 잡는 것은
   *   여전히 아이콘이다. 접힌 사이드바(아이콘만)와 펼친 사이드바의 행 높이가 같아야 한다.
   */
  span {
    flex: 1;
    font-size: var(--u-text-label-size, 13px);
    line-height: var(--u-text-label-leading, 1.5);
    font-weight: var(--u-text-label-weight, 600);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;