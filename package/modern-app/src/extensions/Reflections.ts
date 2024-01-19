// object 는 다른 라이브러리(monaco editor 등)에서 충돌 문제가 있어서
// prototype을 사용하지 않습니다.
function cloneFrom(from: object, to: object) {
  const propertyNames = Object.getOwnPropertyNames(from);

  for (const propertyName of propertyNames) {
    if (propertyName !== "constructor") {
      // @ts-expect-error 설명: 동적 속성 할당으로 인한 타입 체크 무시
      to[propertyName] = from[propertyName];
    }
  }
}

export const Reflections = {
  cloneFrom
};
