export interface BinancePublicApiProvider {
  getApiUrl(): Promise<string>;
}

export interface BinanceProtectedApiProvider extends BinancePublicApiProvider {
  getApiKey(): Promise<string>;

  getSecretKey(): Promise<string>;
}
