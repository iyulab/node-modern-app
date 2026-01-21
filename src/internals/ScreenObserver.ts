/** 화면 크기 타입 */
export type ScreenSize = 'small' | 'medium' | 'large';

/** 스크린 옵저버 설정 */
export interface ScreenObserverConfig {
  /** 관찰할 엘리먼트 */
  element: Element;
  /** 브레이크포인트 설정 [small, medium] */
  breakpoints: [number, number];
}

/**
 * 화면 크기 변경을 감지하고 관리하는 옵저버 클래스
 * root 엘리먼트의 크기를 기준으로 반응형 화면 크기를 추적합니다.
 */
export class ScreenObserver {
  /** ResizeObserver 인스턴스 */
  private _observer: ResizeObserver;
  /** 브레이크포인트 설정 [small, medium] */
  private _breakpoints: [number, number];
  /** 현재 화면 크기 */
  private _size: ScreenSize;

  /**
   * ScreenObserver 생성자
   * @param config - 스크린 옵저버 설정
   */
  constructor(config: ScreenObserverConfig) {
    this._breakpoints = config.breakpoints;

    // ResizeObserver 생성 및 관찰 시작
    this._observer = new ResizeObserver((entries) => {
      const target = entries[0];
      const size = this.calculate(target.contentRect.width);
      if (this._size === size) return;
    
      this._size = size;
      window.dispatchEvent(new CustomEvent('screen-resize', {
        detail: { size: this._size }
      }));
    });
    this._observer.observe(config.element);

    // 초기 크기 설정
    const rect = config.element.getBoundingClientRect();
    this._size = this.calculate(rect.width);
    window.dispatchEvent(new CustomEvent('screen-resize', {
      detail: { size: this._size }
    }));
  }

  public destroy() {
    if (this._observer) {
      this._observer.disconnect();
    }
  }

  /** 현재 화면 크기 반환 */
  public get(): ScreenSize {
    return this._size;
  }

  /**
   * 너비를 기준으로 화면 크기를 반환
   * @param width - 엘리먼트의 너비
   * @return 화면 크기
   */
  private calculate(width: number): ScreenSize {
    const [small, medium] = this._breakpoints;
    
    return width < small ? 'small'
      : width < medium ? 'medium'
      : 'large';
  }
}

export type ScreenResizeEvent = CustomEvent<{ size: ScreenSize }>;

declare global {
  interface WindowEventMap {
    'screen-resize': ScreenResizeEvent;
  }
}
