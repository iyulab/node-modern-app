import { IconRegistry } from '@iyulab/components';

/**
 * **테스트를 네트워크에서 떼어낸다.**
 *
 * ## 왜 필요한가
 *
 * 2026-08-03 첫 CI 실행에서 `enter-guard.test.ts` 2건이 실패했다:
 *
 * ```
 * [IconRegistry] 'bootstrap:list' 아이콘 리졸브 실패 (재시도 가능):
 *   NetworkError: Failed to fetch "https://cdn.jsdelivr.net/npm/bootstrap-icons@…/list.svg"
 * ```
 *
 * ⇒ 테스트가 **외부 CDN 을 실제로 호출한다.** 러너의 네트워크 상태에 결과가 달리므로
 * 결정적이지 않다. 로컬에서 안 드러난 이유는 응답이 이미 캐시돼 있기 때문이다.
 *
 * ## ⚠ 원인이 초안의 추정과 달랐다
 *
 * 초안(`ISSUE-modern-app-20260803-tests-depend-on-cdn.md`)은 *"메뉴 정의에서 아이콘을
 * 빼라"* 를 권했는데, **이 테스트의 픽스처에는 아이콘이 없다.** 호출을 만드는 것은
 * `SidebarLayout` 이 **자기 chrome 으로** 그리는 아이콘이다(토글러 등).
 * ⇒ 소비자가 아이콘을 안 써도 `layout: { type: 'sidebar' }` 만으로 네트워크를 탄다.
 *
 * ## 왜 fetch 를 가로채지 않는가
 *
 * 전역 `fetch` 패치는 **이 원인과 무관한 호출까지 함께 가린다** — 나중에 진짜 네트워크
 * 결함이 생겨도 조용해진다. 여기서는 `IconRegistry` 의 **공개 API** 로 그 lib 하나만
 * 결정적으로 만든다. 라이브러리 동작은 바뀌지 않고(테스트 프로세스 안에서만 유효),
 * 다른 네트워크 호출은 종전대로 실패한다.
 */
const STUB = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"></svg>';

for (const lib of ['bootstrap', 'tabler', 'heroicons', 'lucide']) {
  // 🔴**`unregister` 가 먼저여야 한다.** `register` 는 *"이미 등록된 lib 은 덮어쓰지 않고
  // 무시"* 하는 계약이고, `icons.ts` 는 **모듈 로드 시점에** CDN 리졸버를 등록한다.
  // 그래서 `register` 만 부르면 **조용한 no-op** 이 되고 테스트는 계속 네트워크를 탄다.
  // ⚠첫 판이 정확히 그랬고, `network-isolation.test.ts` 가 그것을 잡았다.
  // `unregister` 는 그 lib 의 캐시도 함께 비운다 — 이전 결과가 남지 않게.
  IconRegistry.unregister(lib);
  IconRegistry.register(lib, async () => STUB);
}
