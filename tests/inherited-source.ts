import { existsSync, readFileSync } from 'fs';
import { dirname, join, resolve } from 'path';

/**
 * 요소가 `@iyulab/components` 의 클래스를 상속하면(`u-side-panel` = `UDrawer`) 그 상속 사슬의 소스 — 공개 속성 · part 는
 * 기반 클래스에 산다. 상속하지 않으면 `null`. 형제 소스가 없는 단독 클론이면 빈 배열(판정하지 않는다).
 */
export function componentsBaseSources(src: string, packageRoot: string): string[] | null {
  const base = /\bextends\s+(\w+)/.exec(src)?.[1];
  if (!base) return null;
  const spec = new RegExp(`import\\s*\\{[^}]*\\b${base}\\b[^}]*\\}\\s*from\\s*'@iyulab/components/dist/(.+?)\\.js'`).exec(src)?.[1];
  if (!spec) return null;
  // workspace-only: 형제 소스를 읽는다 — 단독 클론에는 없고, 그때는 빈 배열로 판정을 건너뛴다.
  const siblingSrc = resolve(packageRoot, '..', 'components', 'src');
  const out: string[] = [];
  let file = join(siblingSrc, `${spec}.ts`);
  while (existsSync(file)) {
    const text = readFileSync(file, 'utf-8');
    out.push(text);
    const parent = /\bextends\s+(\w+)/.exec(text)?.[1];
    const rel = parent && new RegExp(`import\\s*\\{[^}]*\\b${parent}\\b[^}]*\\}\\s*from\\s*'(\\.{1,2}/[^']+?)\\.js'`).exec(text)?.[1];
    if (!rel) break;
    file = join(dirname(file), `${rel}.ts`);
  }
  return out;
}
