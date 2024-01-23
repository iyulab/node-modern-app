import "reflect-metadata";
export interface PropertyMetaData<_ = unknown, TypeHint = unknown> {
    required?: boolean;
    label?: string;
    hint?: string;
    format?: string;
    type?: TypeHint;
    minLength?: number;
    maxLength?: number;
    regex?: RegExp;
}
export declare function propertyMeta<T = unknown, TypeHint = unknown>(metadata: PropertyMetaData<T, TypeHint>): (target: object, propertyKey: string | symbol) => void;
export declare function getPropertyMeta(target: object, propertyKey: string | symbol): PropertyMetaData | undefined;
//# sourceMappingURL=PropertyMeta.d.ts.map