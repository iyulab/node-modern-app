// @vitest-environment happy-dom
import { describe, it, expect, afterEach } from 'vitest';
import '../src/components/SidebarLink.js';
// ⚠`SidebarLink` 는 `u-link` 를 그리지만 그 등록을 자기가 import 하지 않는다(셸을 쓰는
//   앱이 라우터를 함께 로드하는 것이 전제다). 앵커 축을 재려면 여기서 등록을 세운다.
import '@iyulab/router';
import type { SidebarLink } from '../src/components/SidebarLink.js';

/**
 * 사이드바 메뉴가 **앱 밖 경로**를 표현할 수 있는가.
 *
 * ## 왜 이 파일이 생겼는가
 *
 * `SidebarLinkConfig` 는 `href` 만 받았고, 그 링크가 SPA 라우트인지 아닌지를 **말할 수
 * 없었다.** `SidebarLink` 는 `<u-link>` 를 그리면서 `target` 조차 넘기지 않아, 하위 레이어에
 * 있던 유일한 탈출구마저 설정에서 닿지 않았다. 결과: 같은 오리진의 정적 문서 사이트를 메뉴에
 * 걸면 라우터가 클릭을 가로채 not-found 로 떨어진다.
 *
 * 실무 앱의 메뉴에는 SPA 화면만 서지 않는다 — 도움말/문서 사이트, 리포트 출력, 관리 콘솔,
 * 레거시 페이지가 같은 목록에 선다. 「메뉴에 걸 수 있는 것이 SPA 라우트뿐」이라는 제약은
 * **셸이 자기 역할을 좁게 수행하는 것**이다.
 *
 * ## 왜 «앵커가 유지되는지»를 재는가
 *
 * 이것이 없으면 소비앱은 `type: 'button'` + `location.assign()` 으로 우회하고, 그러면
 * 가운데 클릭·주소 복사·상태바 미리보기·스크린리더의 «링크» 역할·`pattern` 기반 선택 표시를
 * 전부 잃으며 **섹션·그룹이 `button` 을 받지 않아 메뉴 최상위로 밀려난다.**
 * ⇒ 계약은 «이동한다»가 아니라 ***«앵커인 채로 이동한다»*** 다.
 */

const links: SidebarLink[] = [];

async function mount(props: Record<string, string>): Promise<SidebarLink> {
  const el = document.createElement('u-sidebar-link') as SidebarLink;
  for (const [k, v] of Object.entries(props)) (el as unknown as Record<string, string>)[k] = v;
  document.body.appendChild(el);
  await el.updateComplete;
  links.push(el);
  return el;
}

const innerLink = (el: SidebarLink) => el.shadowRoot!.querySelector('u-link') as HTMLElement & {
  navigate?: string;
  target?: string;
  href?: string;
};

afterEach(() => {
  while (links.length) links.pop()!.remove();
});

describe('SidebarLink — 앱 밖 경로', () => {
  it('🔴navigate 를 하위 u-link 로 흘려보낸다', async () => {
    const el = await mount({ href: '/help/', navigate: 'document' });
    expect(innerLink(el).navigate).toBe('document');
  });

  it('🔴target 도 흘려보낸다 — 종전에는 넘기는 자리 자체가 없었다', async () => {
    const el = await mount({ href: '/help/', target: '_blank' });
    expect(innerLink(el).target).toBe('_blank');
  });

  it('🔴앵커로 남는다 — 우회(button + location.assign)가 잃는 것이 이것이다', async () => {
    const el = await mount({ href: '/help/', navigate: 'document' });
    const u = innerLink(el) as HTMLElement & { updateComplete: Promise<boolean> };
    await u.updateComplete;
    const anchor = u.shadowRoot?.querySelector('a');
    expect(anchor, 'u-link 는 앵커를 그려야 한다').not.toBeNull();
    expect(anchor!.getAttribute('href')).toContain('/help/');
    expect(anchor!.getAttribute('data-navigate')).toBe('document');
  });

  it('NEGATIVE: 선언이 없으면 하위로 아무것도 강제하지 않는다 (종전 동작)', async () => {
    const el = await mount({ href: '/home' });
    const u = innerLink(el);
    expect(u.navigate ?? undefined).toBeUndefined();
    expect(u.target ?? undefined).toBeUndefined();
  });

  it('NEGATIVE: href 가 없어도 종전대로 그려진다', async () => {
    const el = await mount({});
    expect(innerLink(el)).not.toBeNull();
  });
});
