import { axiosInstance, getQueryConfig, getQueryParameters } from '../common/axios-instance.js';
import { SecuredApiInfoProvider } from '../client.js';
import { sign } from '../common/signature.js';
import { Command, CommandOutput } from '../command.js';
import { GetAccountTradeListInput, GetAccountTradeListOutput } from './trade.js';

export type GetAccountTradeListCommandOutput = CommandOutput<GetAccountTradeListOutput>;

export class GetAccountTradeListCommand extends Command<GetAccountTradeListCommandOutput> {
  constructor(readonly input: GetAccountTradeListInput) {
    super();
  }

  async execute(apiInfoProvider: SecuredApiInfoProvider): Promise<GetAccountTradeListCommandOutput> {
    const [apiUrl, apiKey, secretKey] = await Promise.all([apiInfoProvider.getApiUrl(), apiInfoProvider.getApiKey(), apiInfoProvider.getSecretKey()]);

    const queryParameters = `${getQueryParameters(this.input, true)}`;
    const querySignature = sign(queryParameters, secretKey);
    const queryUrl = `/v3/myTrades?${queryParameters}&${querySignature}`;
    const queryConfig = getQueryConfig(apiUrl, apiKey);

    return this.handle(() => axiosInstance.get<GetAccountTradeListOutput>(queryUrl, queryConfig));
  }
}
