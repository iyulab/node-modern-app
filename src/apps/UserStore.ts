import { action, makeAutoObservable } from "mobx";

export interface IUser {
  claims: {type:string, value: string}[];
}

export class UserStore {
  
  // @injectOf(AppSettings) appSettings?: AppSettings;
  user?: IUser | null = null;

  get userId() {
    return this.user?.claims?.find((n: { type: string; }) => n.type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier")?.value;
  }

  get userName() {
    return this.user?.claims?.find((n: { type: string; }) => n.type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name")?.value;
  }

  get userEmail() {
    return this.user?.claims?.find((n: { type: string; }) => n.type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress")?.value;
  }

  get userRoles() {
    return this.user?.claims?.filter((n: { type: string; }) => n.type == "http://schemas.microsoft.com/ws/2008/06/identity/claims/role")?.map((n: { value: string; }) => n.value);
  }

  get SID() {
    const endWith = "/identity/claims/sid";
    return this.user?.claims?.find((n: { type: string; }) => n.type.endsWith(endWith))?.value;
  }

  get userClaims() {
    return this.user?.claims;
  }
  
  constructor() {
    makeAutoObservable(this);
  }

  @action login(user: IUser) {
    this.user = user;
    console.debug('login user', user);
  }
  
  init() {
    // let url = `/identity` + location.search;
    // let option: any = null;
    // if (this.appSettings) {
    //   const accessToken = this.appSettings.getAccessToken();
    //   const baseUrl = this.appSettings.getServiceURL();
    //   if (accessToken) {
    //     if (baseUrl) {
    //       url = baseUrl + url;
    //     }
    //     option = {
    //       headers: {
    //         Authorization: `Bearer ${accessToken}`
    //       }
    //     };
    //   }
    // }
    
    // fetch(url, option)
    //   .then(response => {
    //     if (response.headers.get('content-type')?.startsWith('application/json')) {
    //       return response.json();
    //     } else {
    //       return null;
    //     }
    //   })      
    //   .then(user => {
    //     if (user == null) {
    //       console.debug('user is null');
    //     } else {
    //       this.login(user);
    //     }
    //   })
    //   .catch(error => {
    //     // 오류를 무시하고 아무것도 처리하지 않습니다.
    //     console.error(error);
    //   });
  }
}

export const userStore = new UserStore();
