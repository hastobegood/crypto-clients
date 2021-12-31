import { axiosInstance, getQueryConfig, getQueryParameters } from '../common/axios-instance.js';
import { sign } from '../common/signature.js';
import { Command, CommandInput, CommandOutput } from '../common/command.js';
import { SecuredApiInfoProvider } from '../api/api-info-provider.js';
import { SendOrderInput, SendOrderOutput } from './order.js';

export type SendOrderCommandInput = CommandInput<SendOrderInput>;
export type SendOrderCommandOutput = CommandOutput<SendOrderOutput>;

export class SendOrderCommand extends Command<SendOrderCommandInput, SendOrderCommandOutput> {
  constructor(readonly input: SendOrderCommandInput) {
    super();
  }

  async execute(apiInfoProvider: SecuredApiInfoProvider): Promise<SendOrderCommandOutput> {
    const [apiUrl, apiKey, secretKey] = await Promise.all([apiInfoProvider.getApiUrl(), apiInfoProvider.getApiKey(), apiInfoProvider.getSecretKey()]);

    const queryParameters = `newOrderRespType=FULL&${getQueryParameters(this.input.data, true)}`;
    const querySignature = sign(queryParameters, secretKey);
    const queryUrl = `/v3/order?${queryParameters}&${querySignature}`;
    const queryConfig = getQueryConfig(apiUrl, apiKey);

    return this.handle(() => axiosInstance.post<SendOrderOutput>(queryUrl, queryConfig));
  }
}
