/**
 * modern-app chrome strings — a `Locale.namespace('modern-app')` of `@iyulab/components`.
 *
 * Scope: library-internal chrome strings only (empty-state copy, back label, shell toggles).
 * NOT a general i18n framework — the app's own content is the app's business.
 *
 * ★**The language is chosen in one place: `Locale.set()`** of `@iyulab/components`. The primitives
 * (`components`) and the table (`flex-table`) already follow it; this package kept a registry of its
 * own, so an app that set the language once got English shell labels in the middle of a translated
 * screen, silently. Translations are namespace registrations — the same shape as
 * `flexTableLocale.register`:
 *
 *   import { modernAppLocale } from '@iyulab/modern-app';
 *   modernAppLocale.register('ko', { back: '뒤로', toggleSidebar: '사이드바 접기/펼치기' });
 *
 * ★**English is the built-in default.** This package sits in the *generic* layer
 * (`components` = neutral primitives, `modern-app` = what a modern app usually provides,
 * `enterprise` = iyulab house style). A generic layer that ships Korean defaults excludes every
 * non-Korean consumer. Language excludes harder than aesthetics: an odd-looking default is
 * awkward, an unreadable one is unusable.
 *
 * Resolution for one element: its own `locale` attribute → `setDefaultLocale()` (deprecated,
 * when called) → the active `Locale`. Each step walks the `components` lookup chain (exact →
 * shortened tag → the language's default regional table → English).
 */
import { Locale } from '@iyulab/components/dist/utilities/Locale.js';

export interface ModernAppLocaleStrings {
  /** Back button label in the page header. */
  back: string;

  /** Empty state — nothing exists yet. */
  noDataTitle: string;
  noDataDescription: string;

  /** Empty state — records exist but the current query matched none. */
  noResultsTitle: string;
  noResultsDescription: string;

  /** Accessible label for an overlay-mode close button (master-detail layout, sidebar layout overlay). */
  detailClose: string;

  /** Sidebar layout — accessible label for the mobile-header menu toggle button. */
  toggleMobileMenu: string;
  /** Sidebar layout — accessible label for the sidebar-header collapse/expand toggle button. */
  toggleSidebar: string;

  /** Wizard — default Back/Next action labels ("Submit" wording is the consumer's call). */
  wizardBack: string;
  wizardNext: string;
  /** Wizard — live-region announcement read out on every step change. */
  wizardStepAnnouncement: (index: number, total: number, label: string) => string;
}

/**
 * Keys of the `modern-app` namespace. All strings — `wizardStepAnnouncement` is a template with
 * `{index}`, `{total}` and `{label}` placeholders (`'Step {index} of {total}: {label}'`).
 */
export type ModernAppMessageKey = keyof ModernAppLocaleStrings;

const EN_TABLE: Record<ModernAppMessageKey, string> = {
  back: 'Back',
  noDataTitle: 'Nothing here yet',
  noDataDescription: '',
  noResultsTitle: 'No matching results',
  noResultsDescription: 'Try changing your search terms or filters.',
  detailClose: 'Close',
  toggleMobileMenu: 'Toggle menu',
  toggleSidebar: 'Toggle sidebar',
  wizardBack: 'Back',
  wizardNext: 'Next',
  wizardStepAnnouncement: 'Step {index} of {total}: {label}',
};

/** The `modern-app` chrome-string namespace. Register translations here; pick the language with `Locale.set()`. */
export const modernAppLocale = Locale.namespace<ModernAppMessageKey>('modern-app');
modernAppLocale.register('en', EN_TABLE);

/* ── Deprecated registry surface — kept so existing apps keep working ─────────────────────────
   `registerLocale` accepted a function for `wizardStepAnnouncement`. A namespace stores strings,
   so a registered function is stored under a per-locale token and called when the chain lands on
   it — the chain itself stays the namespace's. */
let defaultLang: string | undefined;
const announcers = new Map<string, ModernAppLocaleStrings['wizardStepAnnouncement']>();
const ANNOUNCER_TOKEN = '\u0000modern-app:announcer:';

/**
 * @deprecated Register with `modernAppLocale.register(lang, strings)` and choose the language with
 * `Locale.set()`. This forwards to the namespace; a function-valued `wizardStepAnnouncement` keeps
 * working (the namespace form is a `{index}`/`{total}`/`{label}` template).
 */
export function registerLocale(lang: string, strings: Partial<ModernAppLocaleStrings>): void {
  const { wizardStepAnnouncement, ...rest } = strings;
  const table: Partial<Record<ModernAppMessageKey, string>> = { ...rest };
  if (wizardStepAnnouncement) {
    const key = lang.toLowerCase();
    announcers.set(key, wizardStepAnnouncement);
    table.wizardStepAnnouncement = ANNOUNCER_TOKEN + key;
  }
  modernAppLocale.register(lang, table);
}

/**
 * @deprecated Choose the language with `Locale.set()` of `@iyulab/components` — this package now
 * follows it. When called, this still takes precedence over `Locale` for elements without their
 * own `locale`; `setDefaultLocale(undefined)` hands the choice back to `Locale`.
 */
export function setDefaultLocale(lang: string | undefined): void {
  defaultLang = lang;
}

/** One string, resolved for an element's `locale` (empty → `setDefaultLocale` → active `Locale`). */
function text(lang: string | undefined, key: ModernAppMessageKey, params?: Record<string, string | number>): string {
  const value = modernAppLocale.textIn(lang || defaultLang, key, params);
  // Every key has an English entry, so getting the key back means «empty in every table» —
  // `noDataDescription` is empty on purpose (no description unless the app gives one).
  return value === key ? '' : value;
}

/**
 * Resolve every chrome string for a language tag (empty → `setDefaultLocale` → active `Locale`).
 */
export function getLocaleStrings(lang?: string): ModernAppLocaleStrings {
  const t = (key: Exclude<ModernAppMessageKey, 'wizardStepAnnouncement'>) => text(lang, key);
  return {
    back: t('back'),
    noDataTitle: t('noDataTitle'),
    noDataDescription: t('noDataDescription'),
    noResultsTitle: t('noResultsTitle'),
    noResultsDescription: t('noResultsDescription'),
    detailClose: t('detailClose'),
    toggleMobileMenu: t('toggleMobileMenu'),
    toggleSidebar: t('toggleSidebar'),
    wizardBack: t('wizardBack'),
    wizardNext: t('wizardNext'),
    wizardStepAnnouncement: (index, total, label) => {
      const value = text(lang, 'wizardStepAnnouncement', { index, total, label });
      return value.startsWith(ANNOUNCER_TOKEN)
        ? announcers.get(value.slice(ANNOUNCER_TOKEN.length))!(index, total, label)
        : value;
    },
  };
}

/** The English defaults — for tests and reference. */
export function getDefaultLocale(): ModernAppLocaleStrings {
  return {
    ...(EN_TABLE as Omit<Record<ModernAppMessageKey, string>, 'wizardStepAnnouncement'>),
    wizardStepAnnouncement: (index, total, label) => `Step ${index} of ${total}: ${label}`,
  };
}
