declare function validateEmail(value: string): boolean;
declare function validateTel(value: string): boolean;
declare function validatePath(obj: any, path: string): string[];
declare function validate(obj: any, ...paths: string[]): string[];
export declare const Validations: {
    validateEmail: typeof validateEmail;
    validateTel: typeof validateTel;
    validatePath: typeof validatePath;
    validate: typeof validate;
};
export {};
//# sourceMappingURL=Validations.d.ts.map