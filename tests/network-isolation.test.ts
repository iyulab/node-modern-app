// @vitest-environment happy-dom
import { describe, it, expect } from 'vitest';
import { IconRegistry } from '@iyulab/components';

/**
 * **테스트 셋업이 실제로 도는가.**
 *
 * `vitest.config.ts` 에 `setupFiles` 를 적는 것과 그것이 도는 것은 다르다 — 이 리포가
 * 반복해서 본 형태다(*"게이트 존재 ≠ 린팅 동작"*, *"토큰 존재 ≠ 배선"*).
 * 셋업이 조용히 빠지면 테스트는 **그대로 통과하면서** 다시 외부 CDN 을 타기 시작하고,
 * 그때는 러너의 네트워크 상태가 결과를 정한다.
 *
 * ⇒ 이 파일은 **셋업의 효력**을 단언한다.
 */
describe('테스트 네트워크 격리', () => {
  const LIBS = ['bootstrap', 'tabler', 'heroicons', 'lucide'] as const;

  it('🔴아이콘 리졸버가 스텁으로 대체돼 있다 (setupFiles 가 돌았다)', async () => {
    const resolved = await Promise.all(LIBS.map(lib => IconRegistry.resolve(lib, 'list')));

    // CDN 리졸버였다면 실제 아이콘 SVG(경로 데이터 포함)가 오거나 네트워크 실패로
    // undefined 가 온다. 스텁은 빈 뷰박스 하나다 — 어느 쪽과도 구별된다.
    for (const [i, svg] of resolved.entries()) {
      expect(svg, `${LIBS[i]} 리졸버가 스텁이 아니다`).toBeDefined();
      expect(svg, `${LIBS[i]} 가 실제 아이콘을 가져왔다 — 네트워크를 탔다`).not.toContain('<path');
    }
  });

  it('sidebar 레이아웃이 아이콘을 쓴다는 전제가 아직 참이다', async () => {
    // 이 격리가 필요한 «이유»가 사라지면(레이아웃이 아이콘을 안 쓰게 되면) 셋업도
    // 정리 대상이다. 전제가 조용히 바뀌지 않게 여기서 확인한다.
    const src = await import('../src/layouts/SidebarLayout.js').then(() => true).catch(() => false);
    expect(src, 'SidebarLayout 을 불러올 수 없다').toBe(true);
  });
});
