import type { PropertyMetaType } from "@iyulab/components/decorators";
import type { DatetimeInputFormat } from "@iyulab/components/components/input/UDatetimeInput.model";
import type { NumberInputFormat } from "@iyulab/components/components/input/UNumberInput.model";
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

function resolveStringType(p: IEntityProperty): {
  type: PropertyMetaType;
  format?: DatetimeInputFormat | NumberInputFormat;
} {
  if(p.multiline) {
    return { type: "textarea" };
  } else if(p.textRange && p.textRange.length > 0) {
    return { type: "select" };
  } else if(p.format) {
    switch(p.format) {
      case "email":
      case "emailaddress":
        return { type: "email" };
      case "password":
        return { type: "password" };
      case "Tel":
      case "phone":
      case "phonenumber":
        return { type: "tel" };
      case "url":
        return { type: "url" };
      default:
        return { type: "text" };
    }
  } else {
    return { type: "text" };
  }
}

function getInputTypeByEntityProperty(p: IEntityProperty): {
  type: PropertyMetaType;
  format?: DatetimeInputFormat | NumberInputFormat;
} {
  const type = p.type.toLowerCase(); // .NET 타입을 소문자로 변환

  switch (type) {
    case "string":
      return resolveStringType(p);
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
    case "datetime":
      return { type: "datetime", format: "datetime-local" };
    case "date":
      return { type: "datetime", format: "date" };
    case "time":
      return { type: "datetime", format: "time" };
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
