import { customElement } from 'lit/decorators.js';
import { UDrawer } from '@iyulab/components/dist/components/drawer/UDrawer.js';

/**
 * 오른쪽 사이드 패널 — 편집 폼 · 선택한 항목의 상세를 본문 위에 띄우는 정본 형태.
 *
 * `u-drawer` 그 자체이고 기본값만 다르다: **오른쪽에서 들어오고(`placement="right"`) 머리 줄 오른쪽 위에 닫기 X 가
 * 있다(`closable`)**. 열고 닫기(`open` · `show()` · `hide()`) · 슬롯(`header` · 기본 · `footer`) · part · 이벤트는
 * 전부 `u-drawer` 의 것이다. 640px 이하에서는 화면 전체를 덮고, 노치 · 홈 표시줄만큼 안으로 물린다(drawer 가 한다).
 *
 * ```html
 * <u-side-panel>
 *   <span slot="header">주문 편집</span>
 *   …폼…
 *   <u-action-bar slot="footer">…</u-action-bar>
 * </u-side-panel>
 * ```
 *
 * ★**`u-master-detail-layout` 과의 경계**: 상세가 목록과 **나란히 늘 보여야** 하면(목록을 훑으며 상세를 바꿔 본다)
 *   master-detail, 상세 · 편집이 **잠깐 열었다 닫는 작업**이면(본문은 그 뒤에 머문다) 사이드 패널이다.
 *
 * X 를 빼려면 속성으로 `closable` 을 거짓으로(`.closable=${false}`) — 불리언 속성의 기본이 참이라 HTML 에서는 끌 수 없다.
 * 폭은 `--drawer-size`(기본 28rem).
 *
 * @event show - 열리기 직전 — 취소하면 열리지 않는다(`u-drawer` 의 것).
 * @event hide - 닫히기 직전(Escape · 닫기 X · 배경) — 취소하면 닫히지 않는다. 저장 안 한 입력을 물을 자리다.
 */
@customElement('u-side-panel')
export class SidePanel extends UDrawer {
  constructor() {
    super();
    this.closable = true;
    this.placement = 'right';
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'u-side-panel': SidePanel;
  }
}
