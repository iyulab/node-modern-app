import { EntityMetadata } from "./EntityMetadata";
import { IEntityField, IEntityHandler } from "./IEntityHandler";
import { IResultValue } from "./IResultValue";
export interface IODataEntityHandlerProps {
    url: string;
    resourceName: string;
    data?: any;
}
export declare class ODataEntityHandler implements IEntityHandler {
    url: string;
    resourceName: string;
    label?: string | undefined;
    fields?: IEntityField[] | PromiseLike<IEntityField[]>;
    data?: any;
    entityMeta: EntityMetadata | null;
    readyTask: Promise<any> | null;
    constructor(props: IODataEntityHandlerProps);
    readyAsync(): Promise<any>;
    getInputFieldsAsync(): Promise<IEntityField[]>;
    saveAsync(): Promise<IResultValue>;
    validate(): {
        success: boolean;
        errors: string[];
    };
    validateField(field: IEntityField, errors: string[]): void;
    validateEmail(email: string): boolean;
    validateTel(tel: string): boolean;
    validateUrl(url: string): boolean;
    validatePassword(password: string): boolean;
}
//# sourceMappingURL=ODataEntityHandler.d.ts.map