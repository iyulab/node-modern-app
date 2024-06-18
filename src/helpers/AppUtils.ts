export namespace AppUtils {
  type Constructor<T extends object> = new (...args: any[]) => T;

  export function mapToArray<T extends object>(data: any[], cls: Constructor<T>): T[] {
    return data.map(item => mapToClass(item, cls));
  }

  export function mapToClass<T extends object>(data: any, cls: Constructor<T>): T {
    const instance = new cls();
    
    for (const key of Object.keys(data)) {
      const lowerKey = key.toLowerCase();
      const instanceKey = Object.keys(instance).find(k => k.toLowerCase() === lowerKey);
      if (instanceKey) {
        if (typeof data[key] === 'object' && data[key] !== null && !(data[key] instanceof Array)) {
          (instance as any)[instanceKey] = mapToClass(data[key], (instance as any)[instanceKey].constructor);
        } else {
          (instance as any)[instanceKey] = data[key];
        }
      } else {
        (instance as any)[key] = data[key];
      }
    }
    
    return instance;
  }
}