import { LitElement } from "lit";

/// 상위노드를 검색하면서 해당속성명을 찾아서 가져옵니다.
function findContext(propertyName: string, element?: Element) {
  // @ts-expect-error 설명: node가 다양한 타입의 DOM 요소 또는 컴포넌트일 수 있음
  let node: any = element ?? this;
  while (node) {
    if (node[propertyName]) {
      return node[propertyName];
    }

    let shadowNode = node;
    while(shadowNode && shadowNode.shadowRoot) {
      shadowNode = shadowNode.shadowRoot;
      if(shadowNode[propertyName]) {
        return shadowNode[propertyName];
      }
    }
    node = node.parentNode || node.host;
  }
}

function aware(element: LitElement) {

  // element 에 findContext 함수를 추가
  const el = element as any;
  if (el.__proto__.findContext != true) {
    el.__proto__.findContext = findContext;
  }
}

(LitElement.prototype as any).findContext = findContext;

export const LitHelper = {
  findContext,
  aware
}