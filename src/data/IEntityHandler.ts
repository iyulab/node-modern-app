import type { PropertyMetaType } from "@iyulab/u-components/decorators";
import type { DatetimeInputFormat } from "@iyulab/u-components/components/input/UDatetimeInput.model";
import type { NumberInputFormat } from "@iyulab/u-components/components/input/UNumberInput.model";
import type { IEntityProperty } from "./EntityMetadata";
import type { IResultValue } from "./IResultValue";

export interface IEntityField {
  name: string;
  type?: PropertyMetaType;
  format?: DatetimeInputFormat | NumberInputFormat;
  label?: string;
  required?: boolean;
  placeholder?: string;
  length?: number;
  options?: string[];
}

export interface IEntityHandler {
  label?: string;
  fields?: IEntityField[];
  data?: any;

  readyAsync(key?: string): Promise<any>;
  validate(): IResultValue;
  saveAsync(): Promise<IResultValue>;
}

// function getInputType(field: IEntityField): PropertyMetaType | undefined {
//   return field.type;
// }

// function getInputFormat(field: IEntityField): TextInputFormat | NumberInputFormat | undefined {
//   return field.format;
// }

function getInputTypeByEntityProperty(p: IEntityProperty): {
  type: PropertyMetaType;
  format?: DatetimeInputFormat | NumberInputFormat;
} {
  const type = p.type.toLowerCase(); // .NET 타입을 소문자로 변환

  switch (type) {
    case "string":
      return p.multiline
      ? { type: "textarea" }
      : p.textRange && p.textRange.length > 0
      ? { type: "select" }
      : { type: "text" };
    case "email":
    case "emailaddress":
      return { type: "email" };
    case "password":
      return { type: "password" };
    case "phone":
    case "phonenumber":
      return { type: "tel" };
    case "url":
      return { type: "url" };
    case "datetime":
      return { type: "datetime", format: "datetime-local" };
    case "date":
      return { type: "datetime", format: "date" };
    case "time":
      return { type: "datetime", format: "time" };
    case "bool":
    case "boolean":
      return { type: "checkbox" };
    case "int":
    case "int32":
    case "int64":
    case "integer":
      return { type: "number", format: "integer" };
    case "float":
    case "double":
    case "decimal":
    case "number":
      return { type: "number", format: "float" };
    default:
      return { type: "text" } // 기본값
  }
}

function convertFieldByProperty(p: IEntityProperty): IEntityField {
  const { type, format } = getInputTypeByEntityProperty(p);
  const field: IEntityField = {
    name: p.name,
    type: type,
    format: format,
    label: p.label || p.name,
    required: p.required,
    placeholder: p.hint,
    length: p.maxLength,
    options: p.textRange,
  };
  return field;
}

function convertPropertiesToFields(properties: IEntityProperty[]) {
  return properties.map(convertFieldByProperty);
}

export const EntityFieldUtils = {
  // getInputType,
  // getInputFormat,
  getInputTypeByEntityProperty,
  convertFieldByProperty,
  convertPropertiesToFields,
};
