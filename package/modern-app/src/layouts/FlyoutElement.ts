import { LitElement, html, css } from "lit";
import { customElement, property, query } from "lit/decorators.js";

enum Position {
  TopLeft,
  TopCenter,
  TopRight,
  BottomLeft,
  BottomCenter,
  BottomRight,
  LeftTop,
  LeftCenter,
  LeftBottom,
  RightTop,
  RightCenter,
  RightBottom
}

@customElement("flyout-element")
export class FlyoutElement extends LitElement {
  private open = false;

  get isOpen() {
    return this.open;
  }

  @query(".flyout")
  flyout!: HTMLDivElement;

  @property({ type: Object })
  content?: HTMLElement;

  @property({ type: Number })
  position: Position = Position.BottomCenter;

  render() {
    return html`
      <div class="flyout">
        ${this.content}
      </div>
    `;
  }

  async showAsync(target:HTMLElement, content: HTMLElement) {
    // 컨텐츠를 넣어 한번 렌더링을 시킵니다.(컨텐츠의 크기를 구하기 위함)
    this.hidden = false;
    this.style.opacity = "0";
    this.content = content;
    await this.updateComplete;

    // 컨텐츠의 위치를 조정하고 보여줍니다.
    await this.adjustPosition(target);
    this.style.opacity = "1";

    // 컨텐츠 외부를 클릭하면 숨깁니다.(이벤트 중복 등록 방지)
    if(this.open) return;
    document.addEventListener("click", this.handleOutsideClickBind, { capture: true });
    this.open = true;
  }

  async hideAsync() {
    this.hidden = true;
    document.removeEventListener("click", this.handleOutsideClickBind, { capture: true });
    this.open = false;
  }

  private async adjustPosition(target: HTMLElement) {
    
    // 1. 현재 브라우저의 크기를 구한다.
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    console.log("windowWidth", windowWidth);
    console.log("windowHeight", windowHeight);

    // 2. 현재 타겟을 기준으로 남은 공간을 구한다.
    const targetRect = target.getBoundingClientRect();
    const spaceTop = targetRect.top;
    const spaceBottom = windowHeight - targetRect.bottom;
    const spaceLeft = targetRect.left;
    const spaceRight = windowWidth - targetRect.right;
    console.log("spaceTop", spaceTop);
    console.log("spaceBottom", spaceBottom);
    console.log("spaceLeft", spaceLeft);
    console.log("spaceRight", spaceRight);

    // 3. 현재 컨텐츠의 크기를 구한다.
    const contentRect = this.content!.getBoundingClientRect();
    const { width, height } = contentRect;
    console.log("width", width);
    console.log("height", height);

    // 4. 위의 정보들과 현재 포지션을 기준으로 컨텐츠의 위치를 구한다.
    let top = 0, left = 0;
    switch (this.position) {
      case Position.TopLeft:
        top = targetRect.top - height;
        left = targetRect.left;
        break;
      case Position.TopCenter:
        top = targetRect.top - height;
        left = targetRect.left + (targetRect.width - width) / 2;
        break;
      case Position.TopRight:
        top = targetRect.top - height;
        left = targetRect.right - width;
        break;
      case Position.BottomLeft:
        top = targetRect.bottom;
        left = targetRect.left;
        break;
      case Position.BottomCenter:
        top = targetRect.bottom;
        left = targetRect.left + (targetRect.width - width) / 2;
        break;
      case Position.BottomRight:
        top = targetRect.bottom;
        left = targetRect.right - width;
        break;
      case Position.LeftTop:
        top = targetRect.top;
        left = targetRect.left - width;
        break;
      case Position.LeftCenter:
        top = targetRect.top + (targetRect.height - height) / 2;
        left = targetRect.left - width;
        break;
      case Position.LeftBottom:
        top = targetRect.bottom - height;
        left = targetRect.left - width;
        break;
      case Position.RightTop:
        top = targetRect.top;
        left = targetRect.right;
        break;
      case Position.RightCenter:
        top = targetRect.top + (targetRect.height - height) / 2;
        left = targetRect.right;
        break;
      case Position.RightBottom:
        top = targetRect.bottom - height;
        left = targetRect.right;
        break;
    }

    // 컨텐츠를 적절한 위치에 배치합니다.
    this.flyout.style.top = `${top}px`;
    this.flyout.style.left = `${left}px`;
  }

  private handleOutsideClick(event: Event) {
    console.log("handleOutsideClick");
    const isInside = (event.target as Node).contains(this);
    if(!isInside) {
      this.hideAsync();
    }
  }

  private handleOutsideClickBind = this.handleOutsideClick.bind(this);

  static styles = css`
    .flyout {
      position: absolute;
      z-index: 999;
      background-color: red;
      border: 1px solid black;
    }
  `;

}