declare function getUrlParams(url?: string): Record<string, string>;
/**
* 주어진 URL 조각들을 결합하여 하나의 완전한 URL 문자열을 생성합니다.
*
* @param parts URL을 구성하는 문자열 조각들. 첫 번째 조각은 기본 URL이어야 합니다.
*
* - 경로 조각: "/"로 시작하는 문자열은 경로로 간주됩니다.
* - 쿼리 문자열 조각: "?"로 시작하는 문자열은 쿼리 문자열로 간주됩니다.
* - 해시 조각: "#"로 시작하는 문자열은 해시로 간주됩니다.
* - 기타 문자열: "="을 포함하는 문자열은 쿼리 문자열로 간주되며, 그렇지 않은 경우 경로의 일부로 간주됩니다.
*
* 예시:
* buildUrl("http://example.com", "/path", "?query=123", "#hash");
* // 결과: "http://example.com/path?query=123#hash"
*/
declare function buildUrl(...parts: string[]): string;
export declare const UrlHelpers: {
    getUrlParams: typeof getUrlParams;
    buildUrl: typeof buildUrl;
};
export {};
//# sourceMappingURL=UrlHelpers.d.ts.map