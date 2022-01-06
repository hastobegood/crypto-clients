import { axiosInstance, getQueryConfig, getQueryParameters } from '../common/axios-instance.js';
import { SecuredApiInfoProvider } from '../client.js';
import { sign } from '../common/signature.js';
import { Command, CommandInput, CommandOutput } from '../command.js';
import { GetTradeListInput, GetTradeListOutput } from './trade.js';

export type GetTradeListCommandInput = CommandInput<GetTradeListInput>;
export type GetTradeListCommandOutput = CommandOutput<GetTradeListOutput>;

export class GetTradeListCommand extends Command<GetTradeListCommandInput, GetTradeListCommandOutput> {
  constructor(readonly input: GetTradeListCommandInput) {
    super();
  }

  async execute(apiInfoProvider: SecuredApiInfoProvider): Promise<GetTradeListCommandOutput> {
    const [apiUrl, apiKey, secretKey] = await Promise.all([apiInfoProvider.getApiUrl(), apiInfoProvider.getApiKey(), apiInfoProvider.getSecretKey()]);

    const queryParameters = `${getQueryParameters(this.input.data, true)}`;
    const querySignature = sign(queryParameters, secretKey);
    const queryUrl = `/v3/myTrades?${queryParameters}&${querySignature}`;
    const queryConfig = getQueryConfig(apiUrl, apiKey);

    return this.handle(() => axiosInstance.get<GetTradeListOutput>(queryUrl, queryConfig));
  }
}
