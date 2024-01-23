type Constructor<T> = new (...args: any[]) => T;
declare class DIContainer {
    private static instance;
    private singletons;
    private multitons;
    private services;
    static getOrCreate(): DIContainer;
    addSingleton<T>(type: Constructor<T>, args?: ConstructorParameters<Constructor<T>>): T;
    addMultiton<T>(key: string, type: Constructor<T>, args?: ConstructorParameters<Constructor<T>>): T;
    createService<T>(type?: 'singleton' | 'multiton'): symbol;
    register(key: symbol, instance: any): void;
    resolve<T>(key: symbol): T | null;
    get<T>(type: Constructor<T>, key?: string): T;
}
export declare function inject<T>(type: Constructor<T>, key?: string): (target: any, propertyKey: string) => void;
export declare function injectOf<T>(key: symbol): (target: any, propertyKey: string) => void;
export declare const DI: DIContainer;
export {};
//# sourceMappingURL=DI.d.ts.map