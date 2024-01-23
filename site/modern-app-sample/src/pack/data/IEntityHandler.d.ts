import { InputTypes } from "../components/lit";
import { IEntityProperty } from "./EntityMetadata";
import { IResultValue } from "./IResultValue";
export interface IEntityField {
    field: string;
    label?: string;
    type?: string | InputTypes;
    format?: string;
    required?: boolean;
    maxLength?: number;
}
export interface IEntityHandler {
    data?: any;
    label?: string;
    readyAsync(): Promise<any>;
    getInputFieldsAsync(): any;
    validate(): IResultValue;
    saveAsync(): Promise<IResultValue>;
}
declare function getInputType(field: IEntityField): InputTypes;
declare function getInputFormat(field: IEntityField): string | undefined;
declare function convertPropertiesToFields(properties: IEntityProperty[]): IEntityField[];
declare function convertFieldByProperty(p: IEntityProperty): IEntityField;
declare function getInputTypeByEntityProperty(p: IEntityProperty): InputTypes;
export declare const EntityFieldUtils: {
    getInputType: typeof getInputType;
    getInputFormat: typeof getInputFormat;
    convertPropertiesToFields: typeof convertPropertiesToFields;
    convertFieldByProperty: typeof convertFieldByProperty;
    getInputTypeByEntityProperty: typeof getInputTypeByEntityProperty;
};
export {};
//# sourceMappingURL=IEntityHandler.d.ts.map