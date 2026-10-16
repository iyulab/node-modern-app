import type { ReactiveController, ReactiveControllerHost } from 'lit';
import type { RouteLeaveContext } from '@iyulab/router';
import { getLocaleStrings } from './internals/locale.js';

/**
 * «저장 안 한 변경» 등록소 — 문서 하나에 하나.
 *
 * «무엇이 저장 안 됨인가» 는 화면이 알고, «떠나기 전에 물을 자리» 는 둘이다: 라우터 이동(`leave` 가드 — 앱 안의 대화상자로
 * 물을 수 있다)과 문서 이탈(새로 고침 · 다른 사이트 · 탭 닫기 — 브라우저의 `beforeunload` 확인만 가능하다). 화면이 판정
 * 함수 하나를 등록하면 둘 다 그것을 본다. `app.load()` 는 라우터에 이미 배선한다 — `Router` 를 직접 만드는 앱은
 * `leave: unsavedChangesGuard` 를 준다.
 */
const predicates = new Set<() => boolean>();

const onBeforeUnload = (event: BeforeUnloadEvent) => {
  if (!hasUnsavedChanges()) return;
  // 브라우저가 자기 문구로 묻는다(사이트 문구는 보여 주지 않는다). `returnValue` 는 옛 브라우저용.
  event.preventDefault();
  event.returnValue = '';
};

/**
 * 화면의 «저장 안 한 변경» 판정을 등록한다 — 돌려받은 함수로 해제한다(화면이 사라질 때).
 *
 * 등록이 하나라도 있는 동안 문서 이탈에 `beforeunload` 확인이 걸린다(판정이 `true` 일 때만 묻는다).
 * @example
 * ```ts
 * const release = trackUnsavedChanges(() => form.dirty);
 * // 화면이 내려갈 때
 * release();
 * ```
 */
export function trackUnsavedChanges(isDirty: () => boolean): () => void {
  if (predicates.size === 0 && typeof window !== 'undefined') {
    window.addEventListener('beforeunload', onBeforeUnload);
  }
  predicates.add(isDirty);
  return () => {
    if (!predicates.delete(isDirty)) return;
    if (predicates.size === 0 && typeof window !== 'undefined') {
      window.removeEventListener('beforeunload', onBeforeUnload);
    }
  };
}

/** 등록된 판정 중 하나라도 «저장 안 한 변경이 있다» 인가. 던지는 판정은 «있다» 로 본다(잃는 쪽보다 묻는 쪽). */
export function hasUnsavedChanges(): boolean {
  for (const isDirty of predicates) {
    try {
      if (isDirty()) return true;
    } catch (error) {
      console.error('[@iyulab/modern-app] the unsaved-changes check threw — treating the screen as unsaved:', error);
      return true;
    }
  }
  return false;
}

/** `confirmDiscardChanges` 의 문구 — 주지 않은 것은 `modernAppLocale` 의 `discard*` 문자열(영어·한국어 내장). */
export interface DiscardChangesOptions {
  title?: string;
  message?: string;
  confirmLabel?: string;
  cancelLabel?: string;
}

/**
 * «변경을 버리고 떠날까요?» 를 묻는다 — 버리면 `true`. 판정 없이 늘 묻는다(묻기 전에 판정은 호출하는 쪽이 —
 * `hasUnsavedChanges()` 나 자기 폼의 상태). 모달 서랍을 닫기 전처럼 라우터 밖의 «떠남» 에도 같은 문장을 쓴다.
 */
export async function confirmDiscardChanges(options?: DiscardChangesOptions): Promise<boolean> {
  const strings = getLocaleStrings();
  // 대화상자는 묻는 순간에만 싣는다 — 등록만 하는 화면이 대화상자 모듈을 끌어오지 않게.
  const { Dialog } = await import('@iyulab/components/dist/utilities/Dialog.js');
  return Dialog.confirm(options?.message ?? strings.discardMessage, {
    title: options?.title ?? strings.discardTitle,
    confirmLabel: options?.confirmLabel ?? strings.discardConfirm,
    cancelLabel: options?.cancelLabel ?? strings.discardCancel,
    confirmColor: 'danger',
  });
}

/**
 * 라우터 `leave` 가드 — 저장 안 한 변경이 있으면 `confirmDiscardChanges()` 로 묻는다. `app.load()` 가 이미 배선한다.
 * `Router` 를 직접 만드는 앱: `new Router({ …, leave: unsavedChangesGuard })`.
 */
export function unsavedChangesGuard(_ctx?: RouteLeaveContext): boolean | Promise<boolean> {
  return hasUnsavedChanges() ? confirmDiscardChanges() : true;
}

/**
 * Lit 요소의 «저장 안 한 변경» — 연결된 동안 판정을 등록하고, 떨어지면 해제한다. 저장 · 삭제 뒤 같은 틱에 떠날 때는
 * `markClean()` — 다음 갱신 전까지의 이동은 묻지 않는다(판정이 폼 상태를 아직 내리지 않았어도).
 * @example
 * ```ts
 * class OrderPage extends LitElement {
 *   readonly unsaved = new UnsavedChangesController(this, () => this.form.dirty);
 * }
 * ```
 */
export class UnsavedChangesController implements ReactiveController {
  private release?: () => void;
  private clean = false;
  private readonly check = () => !this.clean && this.isDirty();

  constructor(host: ReactiveControllerHost, private readonly isDirty: () => boolean) {
    host.addController(this);
  }

  /** 지금 상태는 저장됐다 — 호스트의 다음 갱신 전까지의 이동은 묻지 않는다. */
  markClean(): void {
    this.clean = true;
  }

  hostConnected(): void {
    this.release ??= trackUnsavedChanges(this.check);
  }

  hostUpdated(): void {
    this.clean = false;
  }

  hostDisconnected(): void {
    this.release?.();
    this.release = undefined;
  }
}
