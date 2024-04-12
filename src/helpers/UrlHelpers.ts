import { DI } from "../services/DI";
import { AppSettings } from "../settings";

function getUrlParams(url: string = document.location.href): Record<string, string> {
  const searchParams = new URLSearchParams(new URL(url).search);
  const params: Record<string, string> = {};

  for (const [key, value] of searchParams) {
    params[key] = value;
  }

  return params;
}

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
function buildUrl(...parts: string[]): string {
  const url = new URL(parts[0]);

  for (let i = 1; i < parts.length; i++) {
    const part = parts[i];
    if (part.startsWith("/")) {
      // 중복 슬래시 방지
      url.pathname = url.pathname.replace(/\/$/, "") + part;
    } else if (part.startsWith("?")) {
      // 첫 번째 쿼리 문자열 조각 설정
      if (!url.search) {
        url.search = part;
      } else {
        // 추가 쿼리 문자열 조각 결합
        url.search += "&" + part.substring(1);
      }
    } else if (part.startsWith("#")) {
      url.hash = part;
    } else if (part.includes("=")) {
      // 쿼리 문자열 추가
      url.search += (url.search ? "&" : "?") + part;
    } else {
      // 경로 조각 추가
      // 경로 끝에 '/'가 없으면 추가
      if (!url.pathname.endsWith("/")) {
        url.pathname += "/";
      }
      url.pathname += encodeURIComponent(part);
    }
  }
  return url.toString();
}

function buildWith(...parts: string[]): string {
  
  const first = parts[0];
  if (first.startsWith("http://") || first.startsWith("https://")) {
    return buildUrl(...parts);
  } else {
    const appSettings = DI.resolve<AppSettings>(AppSettings);
    const apiHost = appSettings?.getServiceURL() ?? window.location.origin;
    const url = buildUrl(apiHost, ...parts);
    return url;
  }
}

export const UrlHelpers = {
  getUrlParams,
  buildUrl,
  buildWith
}