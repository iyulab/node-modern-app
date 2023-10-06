import { LitElement } from 'lit';

type Constructor<T = object> = new (...args: any[]) => T;

export declare interface IObservable {
}

export const ObservableMixin = <T extends Constructor<LitElement>>(superClass: T) => {
  
  class ObservableClass extends superClass {

    async updated(changedProperties: any) {
      super.updated(changedProperties);
      await this.updateComplete;
      
      if (this.isConnected != true) return;
      
      for (const [propertyName] of changedProperties) {
        const pName = `${propertyName.charAt(0).toUpperCase()}${propertyName.slice(1)}`;
        const methodName = `onChanged${pName}`;
        const method = Reflect.get(this, methodName);
        if (typeof method === 'function') {
          const oldValue = changedProperties.get(propertyName);
          const newValue = (<any>this)[propertyName];
          method.call(this, newValue, oldValue);
        }
      }
    }
    
  }
  
  return ObservableClass as Constructor<IObservable> & T;
}