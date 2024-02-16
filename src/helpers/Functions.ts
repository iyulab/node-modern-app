/**
 * 주어진 값을 문자열로 변환합니다.
 *
 * 이 함수는 주어진 값이 null이나 undefined인 경우 빈 문자열을 반환합니다.
 * 그렇지 않은 경우, 주어진 값을 문자열로 변환하여 반환합니다.
 * 
 * @param {any} value - 문자열로 변환하고자 하는 값.
 * @return {string} 변환된 문자열, 또는 값이 null/undefined인 경우 빈 문자열.
 *
 * @example
 * console.log(asText(123)); // '123'
 * console.log(asText(null)); // ''
 * console.log(asText(undefined)); // ''
 * console.log(asText({ a: 1, b: 2 })); // '[object Object]'
 */
export function asText(value: any): string {
  if (value === null || value === undefined) return "";
  return value.toString();
}