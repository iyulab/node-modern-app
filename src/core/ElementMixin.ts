import { LitElement, unsafeCSS, CSSResultGroup } from "lit";
import { MobxLitElement } from '@adobe/lit-mobx';

import { LitHelper } from '../extensions/LitElement';
import baseStyle from '../styles/tailwind.css?inline';

type Constructor<T> = new (...args: any[]) => T;

export interface IElement {
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
          if (propertyName in this) {
            method.call(this, this[propertyName as keyof this]);
          }
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