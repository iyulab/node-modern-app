/** 화면 크기 타입 */
export type ScreenSize = 'small' | 'medium' | 'large';

/** 스타일 값 타입 */
export type StyleValue = Record<string, string> | Partial<CSSStyleDeclaration>;

/** 스타일 맵 타입 */
export type StyleMap<T extends string> = Partial<Record<T, StyleValue>>;