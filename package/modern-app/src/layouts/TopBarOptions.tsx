import { makeAutoObservable } from 'mobx';

export class TopBarOptions {
  visibleHelp = true;
  visibleNotification = true;

  constructor() {
    makeAutoObservable(this);
  }

  setVisibleHelp(visible: any) {
    this.visibleHelp = visible;
  }

  setVisibleNotification(visible: any) {
    this.visibleNotification = visible;
  }
}

export const topBarOptions = new TopBarOptions();
