import { LitElement } from "lit";
export declare enum Position {
    TopLeft = 0,
    TopCenter = 1,
    TopRight = 2,
    BottomLeft = 3,
    BottomCenter = 4,
    BottomRight = 5,
    LeftTop = 6,
    LeftCenter = 7,
    LeftBottom = 8,
    RightTop = 9,
    RightCenter = 10,
    RightBottom = 11,
    Auto = 12
}
export declare abstract class FlyoutElement extends LitElement {
    private open;
    private target?;
    /**
     * 현재 컨텐츠가 보여지고 있는지 여부
     */
    get isOpen(): boolean;
    /**
     * 현재 컨텐츠에 연결되어 있는 타겟 엘리먼트
    */
    get targetElement(): HTMLElement | undefined;
    /**
     * 호버링 방식의 이벤트에서 툴팁에 진입할 경우 호버링을 유지할지 여부
     */
    abstract keepHover: boolean;
    /**
     * 컨텐츠를 보여줄 기준이 되는 위치
     */
    abstract position: Position;
    connectedCallback(): void;
    /**
     * 토글 방식의 이벤트를 사용할 경우 사용합니다(with onClick event)
    */
    toggleAsync(event: Event): Promise<void>;
    /**
     * 클릭 이벤트를 사용할때 컨텐츠를 보여줍니다. (with onClick event)
     */
    showClickAsync(event: Event): Promise<void>;
    /**
     * 클릭 이벤트를 사용할때 컨텐츠를 감춥니다. (with onClick event)
    */
    hideClickAsync(): Promise<void>;
    /**
     * 호버링 방식의 이벤트를 사용할 경우 사용합니다(with onMouseEnter event)
     */
    hoverAsync(event: Event): Promise<void>;
    /**
     * 호버링 이벤트를 사용할때 컨텐츠를 보여줍니다. (with onMouseEnter event)
     */
    showHoverAsync(event: Event): Promise<void>;
    /**
     * 호버링 이벤트를 사용할때 컨텐츠를 감춥니다. (with onMouseLeave event)
    */
    hideHoverAsync(): Promise<void>;
    private showAsync;
    private handleOutsideClickBind;
    private handleEscapeKeyBind;
    private handleHoverTargetBind;
    private handleHoverThisBind;
    private adjustPositionBind;
    private handleOutsideClick;
    private handleEscapeKey;
    private handleHoverTarget;
    private handleHoverThis;
    private adjustPosition;
}
//# sourceMappingURL=FlyoutElement.d.ts.map