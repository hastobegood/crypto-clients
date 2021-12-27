export interface ApiInfoProvider {
  getApiUrl(): Promise<string>;
}

export interface SecuredApiInfoProvider extends ApiInfoProvider {
  getApiKey(): Promise<string>;

  getSecretKey(): Promise<string>;
}
