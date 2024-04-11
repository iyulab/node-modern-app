import { IEntityField, IEntityHandler } from "./IEntityHandler";
import { IResultValue } from "./IResultValue";

export abstract class EntityHandlerBase implements IEntityHandler {
  
  label?: string;
  fields?: IEntityField[];
  data?: any;
  
  abstract readyAsync(key?: string): Promise<any>;
  abstract saveAsync(): Promise<IResultValue>;

  validate(): { success: boolean; errors: string[] } {
    if (this.data == null) {
      return { success: false, errors: ["데이터가 없습니다."] };
    } else if (this.fields && Array.isArray(this.fields)) {
      const errors: string[] = [];
      this.fields.forEach((f: IEntityField) => this.validateField(f, errors));

      if (errors.length > 0) {
        return { success: false, errors };
      }
    }

    return { success: true, errors: [] };
  }

  validateField(field: IEntityField, errors: string[]) {
    const value = this.data[field.name];
    
    if (field.required && (value == null || value == "")) {
      errors.push(`${field.label} 필드는 필수입니다.`);
    }

    if (field.type == "email") {
      const email = value;
      if (email && !this.validateEmail(email)) {
        errors.push(`${field.label} 필드가 이메일 형식이 아닙니다.`);
      }
    }

    if (field.type == "tel") {
      const tel = value;
      if (tel && !this.validateTel(tel)) {
        errors.push(`${field.label} 필드가 전화번호 형식이 아닙니다.`);
      }
    }

    if (field.type == "url") {
      const url = value;
      if (url && !this.validateUrl(url)) {
        errors.push(`${field.label} 필드가 URL 형식이 아닙니다.`);
      }
    }

    if (field.type == "password") {
      const password = value;
      if (password && password.length < 4) {
        errors.push(`${field.label} 필드는 4자 이상이어야 합니다.`);
      } else if (password && this.validatePassword(password)) {
        errors.push(`${field.label} 필드가 약한 비밀번호입니다.`);
      }
    }
  }

  validateEmail(email: string): boolean {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/i;
    return re.test(String(email).toLowerCase());
  }  
  
  validateTel(tel: string): boolean {
    // 숫자, -, +, (, ) 만 입력 가능
    const re = /^[\d\-+()]*$/;
    return re.test(String(tel).toLowerCase());
  }
  
  validateUrl(url: string): boolean {
    const re =
      /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/i;
    return re.test(String(url).toLowerCase());
  }
  
  validatePassword(password: string): boolean {
    // 숫자, 영문자, 특수문자(!@#$%^&*()-_=+) 만 입력 가능
    const re = /^[\w!@#$%^&*()-_=+]*$/;
    return re.test(String(password).toLowerCase());
  }
}