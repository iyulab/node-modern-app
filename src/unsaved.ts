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
    // 물을 대화상자를 지금 싣는다 — 묻는 순간에 네트워크가 필요하면, 배포로 청크가 바뀐 뒤 열려 있던 탭에서 묻지 못한다.
    loadDialog().catch(() => { /* 묻는 순간에 다시 시도하고, 그래도 안 되면 네이티브로 묻는다 */ });
  }
  predicates.add(isDirty);
  notifyUnsavedChange();
  return () => {
    if (!predicates.delete(isDirty)) return;
    if (predicates.size === 0 && typeof window !== 'undefined') {
      window.removeEventListener('beforeunload', onBeforeUnload);
    }
    notifyUnsavedChange();
  };
}

const listeners = new Set<(unsaved: boolean) => void>();
/** 구독자에게 마지막으로 알린 답 — 같은 답은 다시 알리지 않는다. */
let lastAnswer = false;
let checkQueued = false;

/**
 * «저장 안 한 변경이 있는가» 의 답이 바뀔 때마다 부른다 — 셸의 미저장 표지(문서 탭의 점 · 창 제목 표식 · 데스크톱 창의 닫기 확인)용.
 * 해제 함수를 돌려준다. 지금 답으로 먼저 부르지 않는다(지금 답은 `hasUnsavedChanges()`).
 *
 * 등록소는 판정이 언제 달라지는지 모른다 — 판정은 화면의 상태다. 다시 재는 순간은 등록 · 해제, `UnsavedChangesController` 호스트의
 * 갱신 · `markClean()`, `useUnsavedChanges` 의 `dirty` 변화 · `markClean()`, 그리고 `notifyUnsavedChange()` 다. 한 틱의 여러 순간은
 * 한 번 재고, 구독자가 없으면 재지 않는다(판정 비용은 화면의 것).
 * @example
 * ```ts
 * const stop = onUnsavedChange((unsaved) => { document.title = (unsaved ? '● ' : '') + baseTitle; });
 * ```
 */
export function onUnsavedChange(listener: (unsaved: boolean) => void): () => void {
  if (listeners.size === 0) lastAnswer = hasUnsavedChanges();
  listeners.add(listener);
  return () => { listeners.delete(listener); };
}

/**
 * 판정의 답이 달라졌을 수 있다 — `trackUnsavedChanges` 로 판정 함수를 직접 등록한 화면이, 그 함수가 읽는 상태를 바꾼 뒤 부른다
 * (`UnsavedChangesController` · `useUnsavedChanges` 는 스스로 부른다). 답이 실제로 바뀌었을 때만 `onUnsavedChange` 구독자가 불린다.
 */
export function notifyUnsavedChange(): void {
  if (listeners.size === 0 || checkQueued) return;
  checkQueued = true;
  queueMicrotask(() => {
    checkQueued = false;
    const answer = hasUnsavedChanges();
    if (answer === lastAnswer) return;
    lastAnswer = answer;
    for (const listener of [...listeners]) {
      try {
        listener(answer);
      } catch (error) {
        console.error('[@iyulab/modern-app] an onUnsavedChange listener threw:', error);
      }
    }
  });
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
  const title = options?.title ?? strings.discardTitle;
  const message = options?.message ?? strings.discardMessage;
  let Dialog: DialogApi;
  try {
    ({ Dialog } = await loadDialog());
  } catch (error) {
    // 대화상자 모듈을 못 실으면(배포로 청크가 바뀐 탭 · 오프라인) 묻지 못한 채 머물면 모든 이동이 조용히 막힌다 —
    // 같은 문장을 브라우저 네이티브로 묻는다(청크가 필요 없다).
    console.warn('[@iyulab/modern-app] the discard-changes dialog could not load — asking with window.confirm instead:', error);
    return typeof window !== 'undefined' && typeof window.confirm === 'function'
      ? window.confirm(`${title}\n\n${message}`)
      : false;
  }
  return Dialog.confirm(message, {
    title,
    confirmLabel: options?.confirmLabel ?? strings.discardConfirm,
    cancelLabel: options?.cancelLabel ?? strings.discardCancel,
    confirmColor: 'danger',
  });
}

type DialogApi = typeof import('@iyulab/components/dist/utilities/Dialog.js')['Dialog'];
let dialogModule: Promise<{ Dialog: DialogApi }> | undefined;

/**
 * 대화상자 모듈 — 가드를 처음 등록할 때 싣는다(등록만 하는 화면이 없는 앱은 끌어오지 않는다). 실패한 시도는 잊어
 * 다음에 다시 싣는다.
 */
function loadDialog(): Promise<{ Dialog: DialogApi }> {
  dialogModule ??= import('@iyulab/components/dist/utilities/Dialog.js').catch((error: unknown) => {
    dialogModule = undefined;
    throw error;
  });
  return dialogModule;
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
    notifyUnsavedChange();
  }

  hostConnected(): void {
    this.release ??= trackUnsavedChanges(this.check);
  }

  hostUpdated(): void {
    this.clean = false;
    // 갱신은 판정이 읽는 상태가 바뀐 자리다 — 구독자(셸의 미저장 표지)가 있으면 다시 잰다.
    notifyUnsavedChange();
  }

  hostDisconnected(): void {
    this.release?.();
    this.release = undefined;
  }
}
