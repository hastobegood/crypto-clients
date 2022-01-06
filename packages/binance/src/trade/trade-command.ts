import { axiosInstance, getQueryConfig, getQueryParameters } from '../common/axios-instance.js';
import { SecuredApiInfoProvider } from '../client.js';
import { sign } from '../common/signature.js';
import { Command, CommandOutput } from '../command.js';
import { GetTradeListInput, GetTradeListOutput } from './trade.js';

export type GetTradeListCommandOutput = CommandOutput<GetTradeListOutput>;

export class GetTradeListCommand extends Command<GetTradeListCommandOutput> {
  constructor(readonly input: GetTradeListInput) {
    super();
  }

  async execute(apiInfoProvider: SecuredApiInfoProvider): Promise<GetTradeListCommandOutput> {
    const [apiUrl, apiKey, secretKey] = await Promise.all([apiInfoProvider.getApiUrl(), apiInfoProvider.getApiKey(), apiInfoProvider.getSecretKey()]);

    const queryParameters = `${getQueryParameters(this.input, true)}`;
    const querySignature = sign(queryParameters, secretKey);
    const queryUrl = `/v3/myTrades?${queryParameters}&${querySignature}`;
    const queryConfig = getQueryConfig(apiUrl, apiKey);

    return this.handle(() => axiosInstance.get<GetTradeListOutput>(queryUrl, queryConfig));
  }
}
