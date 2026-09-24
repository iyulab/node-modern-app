import { describe, it, expect, beforeEach } from 'vitest';
import { getLocaleStrings, setDefaultLocale, modernAppLocale } from '../src/internals/locale.js';
import { Locale } from '@iyulab/components/dist/utilities/Locale.js';

/**
 * 🔴**`Locale.set('ko')` 한 번이면 셸 문구가 한국어다 — 소비자가 표를 등록하지 않아도**(docket #430).
 *
 * 0.26.0 이 언어 선택을 `Locale` 하나로 모았지만 표가 `en` 뿐이라, 이미 `Locale.set('ko')` 를 부르는
 * 앱에서도 사이드바 토글·오버레이 닫기의 **접근성 이름**이 영어로 남았다. 형제 `flex-table` 은
 * `ko` 를 내장한다.
 *
 * ⚠이 파일은 등록을 하지 않는다 — `locale.test.ts` 는 `ko` 를 부분 등록해 표를 덮으므로, 내장 표 자체를
 * 재려면 등록이 없는 격리된 파일이어야 한다.
 * ⚠값을 박지 않고 «영어와 다르고 키 이름이 아니다» 를 잰다(`DL-656-2` — 번역 문구 수정이 이 테스트를
 * 깨지 않게). 알림 템플릿만 자리표시자 치환까지 본다.
 */
describe('내장 ko 표', () => {
  beforeEach(() => {
    setDefaultLocale(undefined);
    Locale.set('en');
  });

  const KEYS = [
    'back', 'noDataTitle', 'noResultsTitle', 'noResultsDescription', 'detailClose',
    'toggleMobileMenu', 'toggleSidebar', 'wizardBack', 'wizardNext',
  ] as const;

  it('Locale.set("ko") 만으로 비어 있지 않은 모든 문구가 영어와 다르다', () => {
    const en = getLocaleStrings();
    Locale.set('ko');
    const ko = getLocaleStrings();
    for (const key of KEYS) {
      expect(ko[key], key).not.toBe(en[key]);
      expect(ko[key], key).not.toBe(key);
      expect(ko[key], key).not.toBe('');
    }
  });

  it('지역 태그(ko-KR)도 내장 표로 떨어진다', () => {
    Locale.set('ko-KR');
    expect(getLocaleStrings().toggleSidebar).not.toBe('Toggle sidebar');
  });

  it('마법사 알림 템플릿이 자리표시자를 채운다', () => {
    Locale.set('ko');
    const s = getLocaleStrings().wizardStepAnnouncement(2, 3, '확인');
    expect(s).toContain('2');
    expect(s).toContain('3');
    expect(s).toContain('확인');
    expect(s).not.toMatch(/\{(index|total|label)\}/);
  });

  it('빈 설명은 한국어에서도 빈 채로 — 키 이름이 새어 나오지 않는다', () => {
    Locale.set('ko');
    expect(getLocaleStrings().noDataDescription).toBe('');
  });

  it('기본값은 여전히 영어다', () => {
    expect(getLocaleStrings().back).toBe('Back');
  });

  it('소비자 등록은 준 키만 덮는다 — 나머지는 내장 ko 로 남는다', () => {
    const builtinClose = (Locale.set('ko'), getLocaleStrings().detailClose);
    modernAppLocale.register('ko', { back: 'OVERRIDE' });
    expect(getLocaleStrings().back).toBe('OVERRIDE');
    expect(getLocaleStrings().detailClose).toBe(builtinClose);
  });
});
