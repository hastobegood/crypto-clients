import { AxiosInstance } from 'axios';
import { getQueryConfig, getQueryParameters } from '../common/http.js';
import { ApiInfoProvider } from '../client.js';
import { sign } from '../common/signature.js';
import { Command, CommandOutput } from '../command.js';
import { GetAccountInfoOutput } from './account';

export type GetAccountInfoCommandOutput = CommandOutput<GetAccountInfoOutput>;

export class GetAccountInfoCommand extends Command<GetAccountInfoCommandOutput> {
  async execute(axiosInstance: AxiosInstance, apiInfoProvider: ApiInfoProvider): Promise<GetAccountInfoCommandOutput> {
    const [apiUrl, apiKey, secretKey] = await Promise.all([apiInfoProvider.getApiUrl(), apiInfoProvider.getApiKey(), apiInfoProvider.getSecretKey()]);

    const queryParameters = `${getQueryParameters({}, true)}`;
    const querySignature = sign(queryParameters, secretKey);
    const queryUrl = `/v3/account?${queryParameters}&${querySignature}`;
    const queryConfig = getQueryConfig(apiUrl, apiKey);

    return this.handle(() => axiosInstance.get<GetAccountInfoOutput>(queryUrl, queryConfig));
  }
}
