import { LitElement, CSSResultGroup } from "lit";
import { MobxLitElement } from '@adobe/lit-mobx';
type Constructor<T> = new (...args: any[]) => T;
export declare interface IElement {
    findContext(propertyName: string): any;
}
export declare const ElementMixin: <T extends Constructor<LitElement>>(superClass: T) => Constructor<IElement> & T;
declare const ElementBase_base: Constructor<IElement> & typeof MobxLitElement;
/**
 * lit Element의 기본 베이스
 * - `MobxLitElement` include
 * - `tailwind` include
 */
export declare abstract class ElementBase extends ElementBase_base {
    static styles: CSSResultGroup;
}
export {};
//# sourceMappingURL=ElementMixin.d.ts.map