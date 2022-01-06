import { axiosInstance, getQueryConfig, getQueryParameters } from '../common/axios-instance.js';
import { SecuredApiInfoProvider } from '../client.js';
import { sign } from '../common/signature.js';
import { Command, CommandOutput } from '../command.js';
import { CancelOrderInput, CancelOrderOutput, GetOrderInput, GetOrderOutput, SendOrderInput, SendOrderOutput } from './order.js';

export type SendOrderCommandOutput = CommandOutput<SendOrderOutput>;

export class SendOrderCommand extends Command<SendOrderCommandOutput> {
  constructor(readonly input: SendOrderInput) {
    super();
  }

  async execute(apiInfoProvider: SecuredApiInfoProvider): Promise<SendOrderCommandOutput> {
    const [apiUrl, apiKey, secretKey] = await Promise.all([apiInfoProvider.getApiUrl(), apiInfoProvider.getApiKey(), apiInfoProvider.getSecretKey()]);

    const queryParameters = `newOrderRespType=FULL&${getQueryParameters(this.input, true)}`;
    const querySignature = sign(queryParameters, secretKey);
    const queryUrl = `/v3/order?${queryParameters}&${querySignature}`;
    const queryConfig = getQueryConfig(apiUrl, apiKey);

    return this.handle(() => axiosInstance.post<SendOrderOutput>(queryUrl, queryConfig));
  }
}

export type GetOrderCommandOutput = CommandOutput<GetOrderOutput>;

export class GetOrderCommand extends Command<GetOrderCommandOutput> {
  constructor(readonly input: GetOrderInput) {
    super();
  }

  async execute(apiInfoProvider: SecuredApiInfoProvider): Promise<GetOrderCommandOutput> {
    const [apiUrl, apiKey, secretKey] = await Promise.all([apiInfoProvider.getApiUrl(), apiInfoProvider.getApiKey(), apiInfoProvider.getSecretKey()]);

    const queryParameters = `${getQueryParameters(this.input, true)}`;
    const querySignature = sign(queryParameters, secretKey);
    const queryUrl = `/v3/order?${queryParameters}&${querySignature}`;
    const queryConfig = getQueryConfig(apiUrl, apiKey);

    return this.handle(() => axiosInstance.get<GetOrderOutput>(queryUrl, queryConfig));
  }
}

export type CancelOrderCommandOutput = CommandOutput<CancelOrderOutput>;

export class CancelOrderCommand extends Command<CancelOrderCommandOutput> {
  constructor(readonly input: CancelOrderInput) {
    super();
  }

  async execute(apiInfoProvider: SecuredApiInfoProvider): Promise<CancelOrderCommandOutput> {
    const [apiUrl, apiKey, secretKey] = await Promise.all([apiInfoProvider.getApiUrl(), apiInfoProvider.getApiKey(), apiInfoProvider.getSecretKey()]);

    const queryParameters = `${getQueryParameters(this.input, true)}`;
    const querySignature = sign(queryParameters, secretKey);
    const queryUrl = `/v3/order?${queryParameters}&${querySignature}`;
    const queryConfig = getQueryConfig(apiUrl, apiKey);

    return this.handle(() => axiosInstance.delete<CancelOrderOutput>(queryUrl, queryConfig));
  }
}
