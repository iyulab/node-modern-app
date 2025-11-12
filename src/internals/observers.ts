/**
 * 전역으로 관리되는 상태 관찰자들
 */
import { IObservableValue, observable } from "mobx";
import { ScreenSize } from "../types/AppTypes";

/** 
 * 현재 화면 크기 상태 
 */
export const screen: IObservableValue<ScreenSize> = observable.box('large');

/**
 * 로딩 진행 상태 (0 - 100) 
 */
export const progress: IObservableValue<number> = observable.box(0);