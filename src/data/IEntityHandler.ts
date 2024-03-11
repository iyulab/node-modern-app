import type { UInputType } from "@iyulab/u-components/components/input";
import { IEntityProperty } from "./EntityMetadata";
import { IResultValue } from "./IResultValue";

export interface IEntityField {
  name: string;
  label?: string;
  type?: string | UInputType;
  format?: string;
  hint?: string;
  required?: boolean;
  maxLength?: number;
  multiline?: boolean;
  textRange?: string[];
}

export interface IEntityHandler {
  label?: string;
  fields?: IEntityField[];
  data?: any;

  readyAsync(key?: string): Promise<any>;
  validate(): IResultValue;
  saveAsync(): Promise<IResultValue>;
}

function getInputType(field: IEntityField): UInputType {
  if (field.type == null) return "text";
  else if (field.type == "bool") return "checkbox";
  else if (field.type == "number") return "number";
  else if (field.type == "date") return "date";
  else if (field.type == "time") return "time";
  else if (field.type == "datetime") return "datetime-local";
  else if (field.type == "text") {
    if (field.format == "email") return "email";
    else if (field.format == "tel") return "tel";
    else if (field.format == "url") return "url";
    else if (field.format == "password") return "password";
    else return "text";
  } else {
    return "text";
  }
}

function getInputFormat(field: IEntityField): string | undefined {
  return field.format;
}

function convertPropertiesToFields(properties: IEntityProperty[]) {
  return properties.map(convertFieldByProperty);
}

function convertFieldByProperty(p: IEntityProperty): IEntityField {
  const inputType = getInputTypeByEntityProperty(p);
  const field: IEntityField = {
    ...p,
  };

  if (field.label == null) {
    field.label = p.name;
  }
  field.type = inputType;
  return field;
}

function getInputTypeByEntityProperty(p: IEntityProperty): UInputType {
  const type = p.type.toLowerCase(); // .NET 타입을 소문자로 변환
  // console.log(type);

  switch (type) {
    case "string":
      return "text";
    case "email":
    case "emailaddress":
      return "email";
    case "password":
      return "password";
    case "phone":
    case "phonenumber":
      return "tel";
    case "url":
      return "url";
    case "bool":
    case "boolean":
      return "checkbox";
    case "int":
    case "int32":
    case "int64":
    case "integer":
    case "float":
    case "double":
    case "decimal":
    case "number":
      return "number";
    case "datetime":
      return "datetime-local";
    case "date":
      return "date";
    case "time":
      return "time";
    default:
      return "text"; // 기본값
  }
}

export const EntityFieldUtils = {
  getInputType,
  getInputFormat,
  convertPropertiesToFields,
  convertFieldByProperty,
  getInputTypeByEntityProperty,
};
