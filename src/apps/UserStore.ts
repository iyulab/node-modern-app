import { action, makeAutoObservable } from "mobx";
import { injectOf } from "../services";
import { AppSettings } from "../settings";

export interface IUser {
  claims: {
    [key: string]: string;
  };

  readonly id?: string;
  readonly name?: string;
  readonly email?: string;
  readonly roles?: string[];
  readonly SID?: string;
}

export class User implements IUser {
  claims: {
    [key: string]: string;
  } = {};

  constructor(user: IUser) {
    this.claims = user.claims;
  }

  get id() {
    return this.claims["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
  }

  get name() {
    return this.claims["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
  }

  get email() {
    return this.claims["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"];
  }

  get roles() {
    return this.claims["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]?.split(',');
  }

  get SID() {
    return this.claims["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid"];
  }
}

export class UserStore {
  
  @injectOf(AppSettings) appSettings?: AppSettings;
  user?: IUser | null = null;
  
  constructor() {
    makeAutoObservable(this);
  }

  @action login(user: IUser) {
    this.user = new User(user);
    return this.user;
  }
  
  async init() {
    let url = `/identity` + location.search;
    let option: any = null;
    if (this.appSettings) {
      const accessToken = this.appSettings.getAccessToken();
      const baseUrl = this.appSettings.getServiceURL();
      if (baseUrl) {
        url = baseUrl + url;
      }
      
      if (accessToken) {
        option = {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        };
      }
    }
    
    let res = await fetch(url, option);
    if (res.status == 200) {
      if (res.headers.get('content-type')?.startsWith('application/json')) {
        let user = await res.json() as IUser;
        return this.login(user);
      } else {
        console.error('The session is invalid.', res.status);
        return null;
      }
    } else {
      console.error('The session is invalid.');
      return null;
    }
  }
}

export const userStore = new UserStore();
