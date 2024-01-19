import { EntityMetadata } from "@iyulab/modern-app/data";
import { IResultValue } from "@iyulab/modern-app/data/IResultValue";
import { UrlHelpers } from "@iyulab/modern-app/helpers";

export class ODataClient {
  
  private async getAsync(url: string) {
    const response = await fetch(url);
    return await response.json();
  }

  private async postAsync(url: string, data: any) {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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