import { makeAutoObservable } from 'mobx';

export class TopBarOptions {
  visibleHelp = true;
  visibleNotification = true;

  constructor() {
    makeAutoObservable(this);
  }

  setVisibleHelp(visible: boolean) {
    this.visibleHelp = visible;
  }

  setVisibleNotification(visible: boolean) {
    this.visibleNotification = visible;
  }
}

export const topBarOptions = new TopBarOptions();
