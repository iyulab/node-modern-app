import { IObservableValue, observable } from "mobx";

/** 화면 크기 타입 */
export type ScreenSize = 'small' | 'medium' | 'large';

/** 
 * 현재 화면 크기 상태 
 */
export const screen: IObservableValue<ScreenSize> = observable.box('large');