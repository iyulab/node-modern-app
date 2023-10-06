import {
  LitElement,
  unsafeCSS,
  CSSResultGroup,
  TemplateResult,
  html,
} from "lit";
import { MobxLitElement } from "@adobe/lit-mobx";

import baseStyle from "@iyulab/modern-app/styles/tailwind.scss";

type Constructor<T> = new (...args: any[]) => T;

export declare class IPage {
  // highlight: boolean;
  // renderHighlight(content: unknown): unknown;
}

export const PageBaseMixin = <T extends Constructor<LitElement>>(superClass: T) => {
  
  class PageBaseElement extends superClass implements IPage {
    static styles = [
      unsafeCSS(baseStyle),
      (superClass as unknown as typeof LitElement).styles ?? [],
    ] as CSSResultGroup;
  }

  return PageBaseElement as Constructor<IPage> & T;
};

/**
 * lit Element의 기본 페이지 베이스
 * MobxLitElement를 기본 포함
 * tailwind css를 포함
*/
export abstract class PageBase extends PageBaseMixin(MobxLitElement) {
  static styles = [
    PageBaseMixin(MobxLitElement).styles,
  ] as CSSResultGroup;

  abstract pageTitle: string;
  abstract renderContent(): TemplateResult<1>;

  render() {
    return html` 
      <!-- <c-page title=${this.pageTitle}> -->
        ${this.renderContent()}
      <!-- </c-page> -->
    `;
  }
}
