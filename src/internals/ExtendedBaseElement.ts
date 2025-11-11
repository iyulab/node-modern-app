import { property } from "lit/decorators.js";
import { PropertyValues } from "lit";

import { BaseElement } from "@iyulab/components/dist/components/BaseElement.js";
import type { StyleMap, StyleValue } from "../types/AppTypes";

/**
 * ExtendedBaseElement - BaseElement를 확장한 클래스
 * - 부분별 스타일링 지원
 */
export class ExtendedBaseElement<T extends string> extends BaseElement {
  static styles = super.styles;
  static dependencies: Record<string, typeof BaseElement> = {};
  
  /** 부분별 스타일 구성 */
  @property({ type: Object, attribute: false }) styles?: StyleMap<T>;

  protected updated(changedProperties: PropertyValues): void {
    super.updated?.(changedProperties);

    if (changedProperties.has('styles')) {
      this.applyToParts(this.styles);
    }
  }

  /**
   * 현재 스타일 구성을 각 파트에 적용, host 포함
   */
  private applyToParts(styles?: StyleMap<T>) {
    if (!styles) return;

    // 타입 단언: Object.entries는 [string, any][] 타입을 반환하므로 T로 단언
    const entries = Object.entries(styles) as [T, StyleValue][];

    for (const [part, style] of entries) {
      if (!style) continue;

      if (part === 'host') {
        // 호스트 스타일을 직접 적용
        this.assignToObject(this, style);
      } else {
        // 파트 요소 선택
        const el = this.renderRoot?.querySelector(`[part="${String(part)}"]`) as HTMLElement | null;
        if (!el) continue;
        this.assignToObject(el, style);
      }
    }
  }

  /** 
   * 스타일 객체를 개별 프로퍼티 단위로 적용 (camelCase / kebab-case / custom props 처리) 
   */
  private assignToObject(el: HTMLElement, style: StyleValue) {
    for (const [key, value] of Object.entries(style)) {
      if (value == null) continue;
      const strValue = String(value);

      // custom property or contains hyphen -> setProperty 사용
      if (key.startsWith('--') || key.includes('-')) {
        el.style.setProperty(key, strValue);
        continue;
      }

      // el.style에 직접 할당, 실패시 kebab-case 변환 후 할당 시도
      try {
        (el.style as any)[key] = strValue;
      } catch {
        // fallback: camelCase -> kebab-case 변환 후 setProperty
        const kebab = key.replace(/[A-Z]/g, m => '-' + m.toLowerCase())
        el.style.setProperty(kebab, strValue);
      }
    }
  }
}