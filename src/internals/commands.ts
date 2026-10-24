import type { DirectiveResult } from 'lit/directive.js';
import i18next from 'i18next';
import { filterCommands } from '@iyulab/components/dist/components/command-palette/UCommandPalette.js';
import type {
  CommandItem,
  CommandSource,
  UCommandPalette,
} from '@iyulab/components/dist/components/command-palette/UCommandPalette.js';
import type { SidebarItem, SidebarLayoutConfig } from '../layouts/SidebarLayout.types';
import { filterSidebarItems } from '../layouts/filterSidebarItems';
import { getLocaleStrings } from './locale';

/** 셸 팔레트의 항목 — `run` 이 있으면 고를 때 호출하고, 없으면 `href` 로 `app.navigate` 한다. */
export interface ShellCommandItem extends CommandItem {
  run?: () => void;
}

/** 셸 팔레트의 출처 — 앱의 도메인 검색(주문 · 거래처 …). */
export interface ShellCommandSource extends Omit<CommandSource, 'search'> {
  search: (query: string, options: { signal: AbortSignal }) => ShellCommandItem[] | Promise<ShellCommandItem[]>;
}

/** `app.load({ commands })` — 셸의 명령 팔레트(Ctrl/⌘ K). 주면 켜진다. */
export interface CommandsConfig {
  /** 앱의 출처들 — 화면 · 최근 묶음 뒤에 이 순서로 묶인다. */
  sources?: ShellCommandSource[];
  /**
   * 여는 단축키 — `'mod+k'`(기본: macOS 는 ⌘, 그 밖은 Ctrl) 꼴, `false` 면 단축키 없이 «찾기» 버튼으로만 연다.
   * 편집 칸(입력 · textarea · contenteditable) 안이나 입력기 조합 중에는 가로채지 않는다.
   * @default 'mod+k'
   */
  shortcut?: string | false;
  /**
   * 최근 고른 항목(`href` 를 가진 것)을 빈 검색어 맨 위에 — 기기 저장소(`localStorage`)에 앱 단위 키로 둔다. 숫자면 개수.
   * @default false
   */
  recent?: boolean | number;
  /** 화면 묶음 — 사이드바 링크(권한 필터 뒤). `false` 면 뺀다. @default true */
  screens?: boolean;
  /** 검색 칸의 자리표시 글. 비면 로캘 `commandPlaceholder`. */
  placeholder?: string;
}

/** 사이드바 설정의 글(문자열 또는 `translate()` 지시자)을 지금 언어의 글로. */
export function labelText(label: string | DirectiveResult | undefined): string {
  if (typeof label === 'string') return label;
  const values = (label as { values?: unknown[] } | undefined)?.values;
  if (values && i18next.isInitialized) {
    const value = i18next.t(values[0] as string | string[], values[1] as Record<string, unknown> | undefined);
    return typeof value === 'string' ? value : '';
  }
  return '';
}

/** 사이드바 선언에서 화면 항목을 뽑는다 — 권한 필터를 지난 링크만(원천은 하나 — 설계 불변식). 묶음 이름은 설명으로. */
export function screenItems(layout: SidebarLayoutConfig): CommandItem[] {
  const items: CommandItem[] = [];
  const seen = new Set<string>();
  const walk = (list: readonly SidebarItem[], parent?: string) => {
    for (const item of list) {
      if (item.type === 'link') {
        if (seen.has(item.href)) continue;
        seen.add(item.href);
        const label = labelText(item.label);
        if (!label) continue;
        items.push({ id: item.href, label, href: item.href, description: parent, icon: item.icon, iconLib: item.lib });
      } else if (item.type === 'section' || item.type === 'group') {
        walk(item.items as SidebarItem[], labelText((item as { label?: string | DirectiveResult }).label) || parent);
      }
    }
  };
  walk(filterSidebarItems(layout.main ?? [], layout.hasPermission));
  walk(filterSidebarItems(layout.footer ?? [], layout.hasPermission));
  return items;
}

/** `mod+k` 꼴을 판정 함수로. 모르는 꼴이면 `null`(단축키 없음). */
export function parseShortcut(spec: string): ((e: KeyboardEvent) => boolean) | null {
  const parts = spec.toLowerCase().split('+').map((p) => p.trim()).filter(Boolean);
  const key = parts.pop();
  if (!key) return null;
  const mac = typeof navigator !== 'undefined' && /mac|iphone|ipad/i.test(navigator.platform || navigator.userAgent);
  const want = { ctrl: false, meta: false, alt: false, shift: false };
  for (const m of parts) {
    if (m === 'mod') want[mac ? 'meta' : 'ctrl'] = true;
    else if (m === 'ctrl' || m === 'control') want.ctrl = true;
    else if (m === 'meta' || m === 'cmd') want.meta = true;
    else if (m === 'alt' || m === 'option') want.alt = true;
    else if (m === 'shift') want.shift = true;
    else return null;
  }
  return (e) => e.key.toLowerCase() === key
    && e.ctrlKey === want.ctrl && e.metaKey === want.meta && e.altKey === want.alt && e.shiftKey === want.shift;
}

/** 키가 편집 칸에서 왔는가 — 편집기의 같은 단축키(링크 삽입 등)를 빼앗지 않는다. 섀도 안까지 본다. */
export function fromEditable(e: Event): boolean {
  const origin = e.composedPath()[0];
  if (!(origin instanceof HTMLElement)) return false;
  if (origin.isContentEditable) return true;
  if (origin instanceof HTMLTextAreaElement || origin instanceof HTMLSelectElement) return true;
  if (origin instanceof HTMLInputElement) {
    return !['button', 'checkbox', 'radio', 'submit', 'reset', 'range', 'color', 'file', 'image'].includes(origin.type);
  }
  return false;
}

interface StoredRecent { id: string; label: string; href: string; description?: string; icon?: string; iconLib?: string }

/** 최근 항목 저장소 — 저장소를 못 쓰면 조용히 비어 있다. */
class RecentStore {
  constructor(private readonly key: string, private readonly limit: number) {}

  read(): StoredRecent[] {
    try {
      const raw = localStorage.getItem(this.key);
      const list = raw ? (JSON.parse(raw) as unknown) : [];
      return Array.isArray(list) ? (list as StoredRecent[]).filter((r) => r && typeof r.href === 'string').slice(0, this.limit) : [];
    } catch {
      return [];
    }
  }

  add(item: CommandItem) {
    if (!item.href) return;
    const entry: StoredRecent = { id: item.href, label: item.label, href: item.href, description: item.description, icon: item.icon, iconLib: item.iconLib };
    const next = [entry, ...this.read().filter((r) => r.href !== item.href)].slice(0, this.limit);
    try {
      localStorage.setItem(this.key, JSON.stringify(next));
    } catch {
      /* 저장소를 못 쓰면(사생활 모드 · 차단) 최근 항목 없이 동작한다 */
    }
  }
}

/**
 * 셸의 명령 팔레트 — `u-command-palette` 를 앱에 잇는다: 단축키 · 화면 · 최근 · 앱 출처 · 고른 항목으로 이동.
 * `App.load()` 가 `commands` 를 받았을 때만 만든다.
 */
export class CommandShell {
  private palette?: UCommandPalette;
  private matches: ((e: KeyboardEvent) => boolean) | null = null;
  private recent?: RecentStore;

  constructor(
    private readonly config: CommandsConfig,
    private readonly layout: SidebarLayoutConfig,
    private readonly navigate: (href: string) => void,
    private readonly storageKey: string,
  ) {}

  async attach(root: Element): Promise<void> {
    await import('@iyulab/components/dist/components/command-palette/UCommandPalette.js');
    const palette = document.createElement('u-command-palette');
    palette.addEventListener('command', this.handleCommand);
    palette.addEventListener('show', this.refreshSources);
    root.appendChild(palette);
    this.palette = palette;

    if (this.config.recent) {
      const limit = typeof this.config.recent === 'number' ? Math.max(1, this.config.recent) : 5;
      this.recent = new RecentStore(this.storageKey, limit);
    }
    this.refreshSources();

    const shortcut = this.config.shortcut === undefined ? 'mod+k' : this.config.shortcut;
    this.matches = shortcut === false ? null : parseShortcut(shortcut);
    if (this.matches) window.addEventListener('keydown', this.handleKeydown);
  }

  detach(): void {
    window.removeEventListener('keydown', this.handleKeydown);
    this.palette?.remove();
    this.palette = undefined;
  }

  /** 팔레트를 연다(«찾기» 버튼 · `app.showCommands()`). */
  open(): void {
    this.palette?.show();
  }

  /** 출처 · 글을 지금 상태로 — 열 때마다(언어 · 최근 항목이 바뀌었을 수 있다). */
  private refreshSources = () => {
    if (!this.palette) return;
    const strings = getLocaleStrings();
    // 대화상자는 그것을 여는 «찾기» 버튼과 같은 이름으로 불린다.
    this.palette.label = strings.commandFind;
    this.palette.placeholder = this.config.placeholder ?? strings.commandPlaceholder;
    const sources: CommandSource[] = [];
    if (this.recent) {
      const recent = this.recent;
      sources.push({ id: 'recent', label: strings.commandRecent, search: (q) => (q.trim() ? [] : recent.read()) });
    }
    if (this.config.screens !== false) {
      const screens = screenItems(this.layout);
      sources.push({ id: 'screens', label: strings.commandScreens, search: (q) => filterCommands(screens, q) });
    }
    sources.push(...((this.config.sources ?? []) as CommandSource[]));
    this.palette.sources = sources;
  };

  private handleKeydown = (e: KeyboardEvent) => {
    if (!this.matches || !this.palette || this.palette.open) return;
    if (e.isComposing || e.keyCode === 229) return;
    if (!this.matches(e) || fromEditable(e)) return;
    e.preventDefault();
    this.open();
  };

  private handleCommand = (e: CustomEvent<{ item: CommandItem; source: string }>) => {
    e.preventDefault();
    const item = e.detail.item as ShellCommandItem;
    if (item.run) {
      item.run();
      return;
    }
    if (item.href) {
      this.recent?.add(item);
      this.navigate(item.href);
    }
  };
}
