class Service<T> {
  key: Symbol;
  instance?: T;
  type: string;

  constructor(type: 'singleton' | 'multiton') {
    this.key = Symbol();
    this.type = type;
  }
}

type Constructor<T> = new (...args: any[]) => T;

class DIContainer {

  private static instance: DIContainer;
  private singletons: Map<Constructor<any>, any> = new Map<Constructor<any>, any>();
  private multitons: Map<string,any> = new Map<string,any>();
  private services: Service<any>[] = [];

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
  
  createService<T>(type: 'singleton' | 'multiton' = 'singleton') {
    let service = new Service<T>(type);
    this.services.push(service);
    return service.key;
  }

  register(key: Symbol, instance: any) {
    let service = this.services.find(n => n.key == key);
    if (service) {
      service.instance = instance;
    } else {
      console.warn(`Service ${key.toString()} is not registered`);
    }
  }

  resolve<T>(key: Symbol): T | null {
    let service = this.services.find(n => n.key == key);
    if (service) {
      if (service.type == 'singleton') {
        return service.instance;

      } else if (service.type == 'multiton') {
        const constructor = service.instance.constructor;
        const instance = constructor();
        return instance;

      } else {
        throw new Error(`Service ${key.toString()} is not registered`);
      }
    } else {
      console.warn(`Service ${key.toString()} is not registered`);
      return null;
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

// 심볼에 의한 주입 데코레이터
// 예) @injectOf(AppSettings) appSettings?: AppSettings;
export function injectOf<T>(key: Symbol) {
  return function (target: any, propertyKey: string) {
    Object.defineProperty(target, propertyKey, {
      get: function () {
        return DI.resolve<T>(key);
      }
    });
  }
}


// 서비스 등록객체
export const DI = DIContainer.getOrCreate();