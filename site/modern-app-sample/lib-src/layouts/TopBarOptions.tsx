import { makeAutoObservable } from 'mobx';

export class TopBarOptions {
  visibleHelp = true;
  visibleNotification = true;

  constructor() {
    makeAutoObservable(this);
  }

  setVisibleHelp(visible) {
    this.visibleHelp = visible;
  }

  setVisibleNotification(visible) {
    this.visibleNotification = visible;
  }
}

export const topBarOptions = new TopBarOptions();
