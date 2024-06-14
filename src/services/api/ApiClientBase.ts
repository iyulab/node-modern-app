export interface IStandardResponse {
  success: boolean;
  status: number;
  value?: any;
}

export abstract class ApiClientBase {

  protected abstract host: string;

  private success(status: number) {
    return status >= 200 && status < 300;
  }

  private isClientError(status: number) {
    return status >= 400 && status < 500;
  }

  private asText(v: any) {
    if (typeof v == 'object') {
      return JSON.stringify(v);
    } else {
      return `${v}`;
    }
  }

  private async onResponseAsync(res: Response) {
    const contentType = res.headers.get('content-type');
    if (contentType == "text/html") {
      // 리다이렉트 되었음
      document.location.href = res.url;
      return { success: true, status: res.status, value: null };
    } else if (this.success(res.status)) {
      if (contentType == null || contentType.indexOf('json') > 0) {
        try {
          const resJson = await res.json();
          if (resJson.key == "Redirect") {
            document.location.href = resJson.value;
            return { success: true, status: res.status, value: null };
          } else {
            return { success: true, status: res.status, value: resJson };
          }
        } catch {
          return { success: true, status: res.status, value: null };
        }
      } else if (contentType.startsWith("text/plain")) {
        const text = await res.text();
        return { success: true, status: res.status, value: text };
      } else if (contentType == 'application/octet-stream') {
        const data = await res.blob();
        const downloadUrl = window.URL.createObjectURL(data);
        const contentDisposition = res.headers.get('Content-Disposition');
        let fileName = 'downloaded_file';
        if (contentDisposition) {
          const fileNameMatch = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
          if (fileNameMatch && fileNameMatch[1]) {
            fileName = fileNameMatch[1].replace(/['"]/g, ''); // 따옴표 제거
          }
        }

        const a = document.createElement('a');
        a.href = downloadUrl;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();

        // 다운로드 후 링크 제거
        window.URL.revokeObjectURL(downloadUrl);
        document.body.removeChild(a);

        return { success: true, status: res.status };
      } else {
        return { success: false, status: res.status };
      }
    } else if (this.isClientError(res.status)) {
      return await this.buildFailResponseAsync(res, contentType);
    } else {
      return await this.buildFailResponseAsync(res, contentType);
    }
  }

  private async buildFailResponseAsync(res: Response, contentType: string | null) {
    if (contentType) {
      if (contentType.indexOf('json') > 0) {
        return { success: false, status: res.status, value: await res.json() };
      } else if (contentType.indexOf("text/plain") >= 0) {
        return { success: false, status: res.status, value: await res.text() };
      } else {
        return { success: false, status: res.status };
      }
    } else {
      return { success: false, status: res.status };
    }
  }

  protected buildUrl(url: string): string {
    if (url.startsWith("http")) {
      return url;
    } else {
      const host = this.host;
      if (host.length < 1 || host == "/") {
        return new URL(url, document.location.origin).href;
      } else {
        let address: string;
        if (host.endsWith("/") || url.startsWith("/")) {
          address = host + url;
        } else {
          address = `${host}/${url}`;
        }

        if (window.location.search && address.includes('?') != true) {
          address += window.location.search;
        }
        return address;
      }
    }
  }

  protected async buildHeadersAsync(defaults?: any) {
    const headers: any = defaults ?? {};
    return headers;
  }

  protected async get(address: string): Promise<IStandardResponse> {
    const url = this.buildUrl(address);
    console.debug(`Req|GET ${url}`);
    const headers = await this.buildHeadersAsync();
    const r: IStandardResponse = await fetch(url, {
      method: 'GET',
      headers: headers,
      redirect: 'follow' // Redirect 를 허용
    })
      .then(async res => {
        return await this.onResponseAsync(res);
      })
      .catch(reason => {
        throw reason;
      });

    return r;
  }

  protected async post(address: string, data?: any, options?: {
    headers?: { [key: string]: string; }
  }): Promise<IStandardResponse> {
    const url = this.buildUrl(address);
    console.debug(`Req|POST ${url} ${this.asText(data)}`);

    const headers = await this.buildHeadersAsync();
    let body: any;

    if (data instanceof FormData) {
      body = data;
    } else {
      headers['Content-Type'] = 'application/json';
      body = JSON.stringify(data);
    }

    if (options && options.headers) {
      for (const key in options.headers) {
        const header = options.headers[key];
        if (typeof header === 'function') continue;
        headers[key] = header;
      }
    }

    const r: IStandardResponse = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: body,
      redirect: 'follow' // Redirect 를 허용
    })
      .then(async res => {
        const r = await this.onResponseAsync(res);
        console.debug(`Res|POST ${url}`, r.status, this.asText(r.value));
        return r;
      })
      .catch(reason => {
        throw reason;
      });

    return r;
  }

  protected async put(address: string, data?: any, options?: {
    headers?: { [key: string]: string; }
  }): Promise<IStandardResponse> {
    const url = this.buildUrl(address);
    console.debug(`Req|PUT ${url} ${this.asText(data)}`);
    const headers = await this.buildHeadersAsync({
      'Content-Type': 'application/json'
    });

    if (options && options.headers) {
      for (const key in options.headers) {
        const header = options.headers[key];
        if (typeof header === 'function') continue;
        headers[key] = header;
      }
    }

    const jsonBody = JSON.stringify(data);
    const r: IStandardResponse = await fetch(url, {
      method: 'PUT',
      headers: headers,
      body: jsonBody,
      redirect: 'follow' // Redirect 를 허용
    })
      .then(async res => {
        const r = await this.onResponseAsync(res);
        console.debug(`Res|PUT ${url}`, r.status, this.asText(r.value));
        return r;
      })
      .catch(reason => {
        throw reason;
      });

    return r;
  }

  protected async delete(address: string): Promise<IStandardResponse> {
    const url = this.buildUrl(address);

    const headers = await this.buildHeadersAsync();
    const r: IStandardResponse = await fetch(url, {
      method: 'DELETE',
      headers: headers
    })
      .then(async res => {
        return await this.onResponseAsync(res);
      })
      .catch(reason => {
        throw reason;
      });

    return r;
  }

  protected async deleteWithKeys(address: string, keys: any[]): Promise<IStandardResponse> {
    const url = this.buildUrl(address);
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        keys: keys
      })
    });

    if (!response.ok) {
      let message = await response.text();
      throw new Error(`[${response.status}] ${message}`);
    }

    const contentType = response.headers.get('content-type');
    if (contentType) {
      if (contentType.indexOf('application/json') !== -1) {
        const data = await response.json();
        return {
          status: response.status,
          success: true,
          value: data,
        }
      } else if (contentType.indexOf('text/plain') !== -1) {
        const data = await response.text();
        return {
          status: response.status,
          success: true,
          value: data,
        }
      } else {
        throw new Error(`Unsupported content type: ${contentType}`);
      }
    } else {
      const data = await response.text();
      return {
        status: response.status,
        success: true,
        value: data,
      };
    }
  }
}
