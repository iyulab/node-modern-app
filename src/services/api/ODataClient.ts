import { EntityMetadata } from "../../data";
import { IResultValue } from "../../data/IResultValue";
import { UrlHelpers } from "../../helpers";

import { resolveAppSettings } from "../../settings/AppSettings";

export class ODataClient {
  
  private async getAsync(url: string) {
    const settings = resolveAppSettings();
    const token = settings.getAccessToken();
    const response = await fetch(url, {
      headers: token ? { "Authorization": `Bearer ${token}` } : {}
    });
    return await response.json();
  }

  private async postAsync(url: string, data: any) {
    const settings = resolveAppSettings();
    const token = settings.getAccessToken();
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    if (token) {
      headers.append("Authorization", `Bearer ${token}`);
    }
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data)
    });
    return response;
  }
  
  async getEntityMetadataAsync(url: string, resourceName: string) {
    const r = await this.getAsync(UrlHelpers.buildUrl(url, `/$metadata/${resourceName}`));
    return new EntityMetadata(r);
  }

  async saveAsync(url: string, resourceName: string, data: any): Promise<IResultValue> {
    const r = await this.postAsync(UrlHelpers.buildUrl(url, `/${resourceName}`), data);
    if (r.status === 200) {
      return {
        success: true,
        value: await r.json()
      };
    } else {
      return {
        success: false,
        errors: [await r.text()]
      };
    }
  }
}