// 지연 실행 함수
// 함수를 타이머에 넣고, 타이머가 끝날때 실행
// 단 타이머가 끝나기 전에 함수가 다시 호출되면 타이머를 초기화
// 마지막 debounce 함수 호출 후 타이머가 끝나면 함수 실행
export const debounce = <F extends (...args: any[]) => void>(
  func: F, 
  timeout = 300
): ((...args: Parameters<F>) => void) => {
  let timer: any;
  return (...args: Parameters<F>) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      func(...args);
    }, timeout);
  };
};