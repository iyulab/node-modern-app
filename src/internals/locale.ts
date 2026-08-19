/**
 * Lightweight locale registry for modern-app chrome strings.
 *
 * Scope: library-internal chrome strings only (empty-state copy, back label).
 * NOT a general i18n framework — the app's own content is the app's business.
 *
 * ★**English is the built-in default.** This package sits in the *generic* layer
 * (see the three-layer split: `components` = neutral primitives, `modern-app` =
 * what a modern app usually provides, `enterprise` = iyulab house style).
 * A generic layer that ships Korean defaults excludes every non-Korean consumer —
 * the same objection this repo raised against baking a house aesthetic into
 * `components`. Language excludes harder than aesthetics: an odd-looking default
 * is awkward, an unreadable one is unusable.
 *
 * Mirrors the registry already established in `u-widgets` — one pattern, not two.
 *
 *   registerLocale('ko', { back: '뒤로', noDataTitle: '아직 등록된 항목이 없습니다' });
 *   setDefaultLocale('ko');
 */

export interface ModernAppLocaleStrings {
  /** Back button label in the page header. */
  back: string;

  /** Empty state — nothing exists yet. */
  noDataTitle: string;
  noDataDescription: string;

  /** Empty state — records exist but the current query matched none. */
  noResultsTitle: string;
  noResultsDescription: string;

  /** Master-detail layout — accessible label for the overlay-mode close button. */
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

const EN: ModernAppLocaleStrings = {
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
  wizardStepAnnouncement: (index, total, label) => `Step ${index} of ${total}: ${label}`,
};

const registry = new Map<string, ModernAppLocaleStrings>();
let defaultLang: string | undefined;

/**
 * Register a locale. Partial overrides are merged with the English defaults,
 * so a consumer can translate one string without restating the rest.
 */
export function registerLocale(lang: string, strings: Partial<ModernAppLocaleStrings>): void {
  registry.set(lang.toLowerCase(), { ...EN, ...strings });
}

/** Set the locale used when a component does not specify one. */
export function setDefaultLocale(lang: string | undefined): void {
  defaultLang = lang;
}

/**
 * Resolve strings for a language tag.
 *
 * Order: exact match (`ko-KR`) → base language (`ko`) → English.
 * ⚠The base-language step matters: consumers register `ko` but browsers report
 * `ko-KR`, and without it every registration would silently miss.
 */
export function getLocaleStrings(lang?: string): ModernAppLocaleStrings {
  const key = (lang ?? defaultLang)?.toLowerCase();
  if (!key) return EN;
  if (registry.has(key)) return registry.get(key)!;
  const base = key.split('-')[0];
  if (base !== key && registry.has(base)) return registry.get(base)!;
  return EN;
}

/** The English defaults — for tests and reference. */
export function getDefaultLocale(): ModernAppLocaleStrings {
  return { ...EN };
}
