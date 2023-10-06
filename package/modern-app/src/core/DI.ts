
type Constructor<T> = new (...args: any[]) => T;

class DIContainer {

  private static instance: DIContainer;
  private singletons: Map<Constructor<any>, any> = new Map<Constructor<any>, any>();
  private multitons: Map<string,any> = new Map<string,any>();

  static getOrCreate() {
    if (!DIContainer.instance) {
      DIContainer.instance = new DIContainer();
    }
    return DIContainer.instance;
  }
  
  // args : 생성자 인자 목록 튜플타입으로 전달해야하는 사항이 있음
  // ConstructorParameters로 전달불가
  addSingleton<T>( 
    type: Constructor<T>,
    args?: ConstructorParameters<Constructor<T>> 
  ) : T {

    const singleton = this.singletons.get(type);

    if (singleton) {
      return singleton;
    } else {
      const instance = new type(...args ?? []);
      this.singletons.set(type, instance);
      return instance;
    }
  }

  // args : 생성자 인자 목록 튜플타입으로 전달해야하는 사항이 있음
  // ConstructorParameters로 전달불가
  addMultiton<T>(
    key: string,
    type: Constructor<T>,
    args?: ConstructorParameters<Constructor<T>> 
  ) : T {
    const multiton = this.multitons.get(key);
    if (multiton) {
      console.warn(`${key} already exists`);
      return multiton;
    } else {
      const instance = new type(...args ?? []);
      this.multitons.set(key, instance);
      return instance;
    }
  }

  get<T>( 
    type: Constructor<T>,
    key?: string
  ) : T {

    if (key) {
      const multiton = this.multitons.get(key);
      if (multiton) {
        return multiton;
      } else {
        console.warn(`${key} is not registered, it will be registered as a multiton`);
        return this.addMultiton(key, type);
      }
    } else {
      const singleton = this.singletons.get(type);
      if (singleton) {
        return singleton;
      } else {
        console.warn(`${type.name} is not registered, it will be registered as a singleton`);
        return this.addSingleton(type);
      }
    }
  }

}

// 서비스 주입하는 데코레이터
export function inject<T>( type: Constructor<T>, key?: string ) {
  return function (target: any, propertyKey: string) {
    Object.defineProperty(target, propertyKey, {
      get: () => DI.get<T>(type, key)
    });
  }
}

// 서비스 등록객체
export const DI = DIContainer.getOrCreate();