import { axiosInstance, getQueryConfig, getQueryParameters } from '../common/axios-instance.js';
import { SecuredApiInfoProvider } from '../client.js';
import { sign } from '../common/signature.js';
import { Command, CommandInput, CommandOutput } from '../command.js';
import { GetAccountInfoInput, GetAccountInfoOutput } from './account';

export type GetAccountInfoCommandInput = CommandInput<GetAccountInfoInput>;
export type GetAccountInfoCommandOutput = CommandOutput<GetAccountInfoOutput>;

export class GetAccountInfoCommand extends Command<GetAccountInfoCommandInput, GetAccountInfoCommandOutput> {
  constructor(readonly input: GetAccountInfoCommandInput) {
    super();
  }

  async execute(apiInfoProvider: SecuredApiInfoProvider): Promise<GetAccountInfoCommandOutput> {
    const [apiUrl, apiKey, secretKey] = await Promise.all([apiInfoProvider.getApiUrl(), apiInfoProvider.getApiKey(), apiInfoProvider.getSecretKey()]);

    const queryParameters = `${getQueryParameters(this.input.data, true)}`;
    const querySignature = sign(queryParameters, secretKey);
    const queryUrl = `/v3/account?${queryParameters}&${querySignature}`;
    const queryConfig = getQueryConfig(apiUrl, apiKey);

    return this.handle(() => axiosInstance.get<GetAccountInfoOutput>(queryUrl, queryConfig));
  }
}
