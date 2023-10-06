import { makeAutoObservable } from "mobx";

export class AppInfoStore {

  logo?: string = undefined;
  title: string = "IYULAB APP";

  constructor() {
    makeAutoObservable(this);
  }

  initAppInfo(title?: string, logo?: string) : void {
    this.logo = logo;
    this.title = title ?? this.title;
  }
  
}