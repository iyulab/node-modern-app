/**
 * 슬롯에 **실제로 배정된 내용이 있는가**.
 *
 * ★**CSS 로는 알 수 없다.** `.wrapper:not(:has(*))` 로 빈 슬롯 래퍼를 접으려는 시도는
 *   실패한다 — `<slot>` **자신이 자식 요소**이므로 `:has(*)` 가 항상 참이기 때문이다.
 *   실브라우저 테스트로 확인했다(소스 검사와 jsdom 은 둘 다 통과시킨다).
 *   `::slotted()` 는 배정된 자식을 칠할 수는 있어도 **부모를 선택하지 못한다.**
 *   ⇒ 배정 상태는 `slotchange` 로 추적하는 수밖에 없다.
 *
 * 빈 텍스트 노드는 내용으로 치지 않는다 — 마크업을 여러 줄로 쓰면 공백 텍스트 노드가
 * 생기고, 그것을 내용으로 세면 **줄바꿈 여부에 따라 레이아웃이 달라진다.**
 */
export function slotHasContent(slot: HTMLSlotElement | null | undefined): boolean {
  if (!slot) return false;
  return slot
    .assignedNodes({ flatten: true })
    .some(n => n.nodeType !== Node.TEXT_NODE || (n.textContent ?? '').trim() !== '');
}
