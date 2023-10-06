import { LitElement, unsafeCSS, CSSResultGroup } from "lit";
import { MobxLitElement } from '@adobe/lit-mobx';

import { LitHelper } from '@iyulab/modern-app/extensions/LitElement';
import baseStyle from '@iyulab/modern-app/styles/tailwind.css';

type Constructor<T> = new (...args: any[]) => T;

export declare interface IElement {
  findContext(propertyName: string): any;
}

export const ElementMixin = <T extends Constructor<LitElement>>(superClass: T) => {
  
  class ElementClass extends superClass implements IElement {

    static styles = [
      unsafeCSS(baseStyle),
      (superClass as unknown as typeof LitElement).styles ?? [],
    ] as CSSResultGroup;

    async updated(_changedProperties: any) {
      super.updated(_changedProperties);
      await this.updateComplete;
      
      if (this.isConnected != true) return;
      
      for (const [propertyName] of _changedProperties) {
        const pName = `${propertyName.charAt(0).toUpperCase()}${propertyName.slice(1)}`;
        const methodName = `onChanged${pName}`;
        const method = Reflect.get(this, methodName);
        if (typeof method === 'function') {
          // @ts-ignore 
          method.call(this, this[propertyName]);
        }
      }
    }
    
    findContext(propertyName: string) {
      return LitHelper.findContext(propertyName, this);
    }
  }
  
  return ElementClass as Constructor<IElement> & T;
}

/**
 * lit Element의 기본 베이스
 * - `MobxLitElement` include
 * - `tailwind` include
 */
export abstract class ElementBase extends ElementMixin(MobxLitElement) {
  static styles = [
    ElementMixin(MobxLitElement).styles as CSSResultGroup,
  ] as CSSResultGroup;
}