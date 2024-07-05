import { AppSettings } from "../../settings";
import { injectOf } from "../DI";
import { IStandardResponse } from "./ApiClientBase";
import { AuthorizeApiClient } from "./AuthorizeApiClient";

export class ApiClient extends AuthorizeApiClient {
  @injectOf(AppSettings) appSettings?: AppSettings;

  protected host: string = this.appSettings?.getServiceURL() ?? "";
  protected accessToken = this.appSettings?.getAccessToken() ?? "";

  getAsync(
    address: string,
    options: { refreshToken: boolean; retry?: number } = {
      refreshToken: true,
      retry: 1,
    }
  ): Promise<IStandardResponse> {
    return this.get(address, options);
  }

  postAsync(
    address: string,
    data?: any,
    options: {
      refreshToken: boolean;
      retry?: number;
      headers?: { [key: string]: string };
    } = { refreshToken: true, retry: 1 }
  ): Promise<IStandardResponse> {
    return this.post(address, data, options);
  }

  putAsync(
    address: string,
    data?: any,
    options: {
      refreshToken: boolean;
      retry?: number;
      headers?: { [key: string]: string };
    } = { refreshToken: true, retry: 1 }
  ): Promise<IStandardResponse> {
    return this.put(address, data, options);
  }

  deleteAsync(
    address: string,
    options: { refreshToken: boolean; retry?: number } = {
      refreshToken: true,
      retry: 1,
    }
  ): Promise<IStandardResponse> {
    return this.delete(address, options);
  }

  deleteByKey(resourceName: string, _key: string) {
    return super.deleteByKey(resourceName, _key);
  }
}
