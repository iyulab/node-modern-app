Document.prototype.findElementsWithSelector = function (selector: string, root = document) {
  const elements = Array.from(root.querySelectorAll('*'));
  const matchingElements: Array<HTMLElement> = [];

  elements.forEach((element) => {
    // 타입 가드를 사용하여 element가 HTMLElement임을 보장
    if (element instanceof HTMLElement && element.shadowRoot) {
      // @ts-expect-error 설명: findElementsWithSelector의 재귀적 호출, 타입스크립트가 shadowRoot 타입을 정확히 인식하지 못할 수 있음
      const shadowElements = findElementsWithSelector(selector, element.shadowRoot);
      matchingElements.push(...shadowElements);
    }

    if (element.matches && element.matches(selector)) {
      // @ts-expect-error 설명: HTMLElement 타입 가드를 통과했음에도 불구하고, 타입스크립트가 matches 메서드를 인식하지 못할 수 있음
      matchingElements.push(element);
    }
  });

  return matchingElements;
};

export {};