import { makeAutoObservable } from "mobx";

export class IdentityStore {
  email: string | null = null;
  name: string | null = null;
  phone: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async getClaimAsync(type: string) {
    const response = await fetch(`/identity/claims?type=${type}`);
    if (response.ok) {
      // HTTP 상태 코드가 200-299인 경우 true를 반환
      return await response.json(); // 응답 본문을 JSON으로 변환
    } else {
      return null;
    }
  }

  async UpdateAsync() {
    this.email = await this.getClaimAsync(
      "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
    );
    this.name = await this.getClaimAsync(
      "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname"
    );
    this.phone = await this.getClaimAsync(
      "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/mobilephone"
    );
  }
}

export const identityStore = new IdentityStore();
