import { makeAutoObservable } from "mobx";

export class AppInfoStore {

  logo?: any = undefined;
  title: string = "IYULAB APP";

  constructor() {
    makeAutoObservable(this);
  }

  initAppInfo(title?: string, logo?: any) : void {
    this.logo = logo;
    this.title = title ?? this.title;
  }
  
}