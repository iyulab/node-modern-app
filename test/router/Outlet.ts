import { LitElement, css, html, nothing, render } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { createElement, type ComponentType } from 'react';
import { createRoot } from 'react-dom/client';
import { convertReact } from '@iyulab/u-components/utils';

@customElement('u-outlet')
export class UOutlet extends LitElement {
  // React 컴포넌트를 렌더링할 DOM 컨테이너
  private containerDom?: ReturnType<typeof createRoot>;

  // React 컴포넌트를 렌더링할 엘리먼트
  @query('#react') reactDom!: HTMLElement;
  // LitElement를 렌더링할 엘리먼트
  @query('#lit') litDom!: HTMLElement;

  @property({ type: String, reflect: true }) type?: 'react' | 'lit';

  render() {
    return html`
      <div id="react"></div>
      <div id="lit"></div>
    `;
  }

  /**
   * 기존 렌더링된 DOM을 제거하고, LitElement를 삽입합니다.
   */
  public async renderLitElement(element: typeof LitElement | string) {
    this.removeDom();
    this.type = 'lit';
    let template;
    if (typeof element === 'string') {
      template = document.createElement(element);
    } else if(element.prototype instanceof LitElement) {
      template = new element();
    } else {
      throw new Error('Provided element is neither a string nor a LitElement.');
    }
    render(html`${template}`, this.litDom);
    await this.updateComplete;
    return this.litDom.firstChild;
  }

  /**
   * 기존 렌더링된 DOM을 제거하고, React 컴포넌트를 삽입합니다.
   */
  public async renderReactComponent(component: ComponentType) {
    this.removeDom();
    this.type = 'react';
    this.containerDom = createRoot(this.reactDom);
    this.containerDom.render(createElement(component));
    await this.updateComplete;
    return this.reactDom.firstChild;
  }

  // 기존 렌더링된 DOM을 제거합니다.
  public removeDom() {
    if(this.containerDom) {
      this.containerDom.unmount();
      this.containerDom = undefined;
    }
    render(nothing, this.litDom);
  }

  static styles = css`
    :host {
      display: block;
    }
    :host([type="react"]) #lit {
      display: none;
    }
    :host([type="lit"]) #react {
      display: none;
    }
  `;
  
}

export const Outlet = convertReact({
  elementClass: UOutlet,
  tagName: 'u-outlet',  
});