export namespace UrlHelpers {

  export function getUrlParams(url: string = document.location.href): Record<string, string> {
    const searchParams = new URLSearchParams(new URL(url).search);
    const params: Record<string, string> = {};
  
    for (const [key, value] of searchParams) {
      params[key] = value;
    }
  
    return params;
  }

}