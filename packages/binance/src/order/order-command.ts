import { AxiosInstance } from 'axios';
import { getQueryConfig, getQueryParameters } from '../common/http.js';
import { ApiInfoProvider } from '../client.js';
import { sign } from '../common/signature.js';
import { Command, CommandOutput } from '../command.js';
import {
  CancelOrderInput,
  CancelOrderOutput,
  GetAllOrdersListInput,
  GetAllOrdersListOutput,
  GetOpenOrdersListInput,
  GetOpenOrdersListOutput,
  GetOrderCountUsageOutput,
  GetOrderInput,
  GetOrderOutput,
  SendOrderInput,
  SendOrderOutput,
} from './order.js';

export type SendOrderCommandOutput = CommandOutput<SendOrderOutput>;

export class SendOrderCommand extends Command<SendOrderCommandOutput> {
  constructor(private readonly input: SendOrderInput) {
    super();
  }

  async execute(axiosInstance: AxiosInstance, apiInfoProvider: ApiInfoProvider): Promise<SendOrderCommandOutput> {
    const [apiUrl, apiKey, secretKey] = await Promise.all([apiInfoProvider.getApiUrl(), apiInfoProvider.getApiKey(), apiInfoProvider.getSecretKey()]);

    const queryParameters = `newOrderRespType=FULL&${getQueryParameters(this.input, true)}`;
    const querySignature = sign(queryParameters, secretKey);
    const queryUrl = `/v3/order?${queryParameters}&${querySignature}`;
    const queryConfig = getQueryConfig(apiUrl, apiKey);

    return this.handle(() => axiosInstance.post<SendOrderOutput>(queryUrl, null, queryConfig));
  }
}

export type GetOrderCommandOutput = CommandOutput<GetOrderOutput>;

export class GetOrderCommand extends Command<GetOrderCommandOutput> {
  constructor(private readonly input: GetOrderInput) {
    super();
  }

  async execute(axiosInstance: AxiosInstance, apiInfoProvider: ApiInfoProvider): Promise<GetOrderCommandOutput> {
    const [apiUrl, apiKey, secretKey] = await Promise.all([apiInfoProvider.getApiUrl(), apiInfoProvider.getApiKey(), apiInfoProvider.getSecretKey()]);

    const queryParameters = getQueryParameters(this.input, true);
    const querySignature = sign(queryParameters, secretKey);
    const queryUrl = `/v3/order?${queryParameters}&${querySignature}`;
    const queryConfig = getQueryConfig(apiUrl, apiKey);

    return this.handle(() => axiosInstance.get<GetOrderOutput>(queryUrl, queryConfig));
  }
}

export type GetOpenOrdersListCommandOutput = CommandOutput<GetOpenOrdersListOutput>;

export class GetOpenOrdersListCommand extends Command<GetOpenOrdersListCommandOutput> {
  constructor(private readonly input?: GetOpenOrdersListInput) {
    super();
  }

  async execute(axiosInstance: AxiosInstance, apiInfoProvider: ApiInfoProvider): Promise<GetOpenOrdersListCommandOutput> {
    const [apiUrl, apiKey, secretKey] = await Promise.all([apiInfoProvider.getApiUrl(), apiInfoProvider.getApiKey(), apiInfoProvider.getSecretKey()]);

    const queryParameters = getQueryParameters(this.input, true);
    const querySignature = sign(queryParameters, secretKey);
    const queryUrl = `/v3/openOrders?${queryParameters}&${querySignature}`;
    const queryConfig = getQueryConfig(apiUrl, apiKey);

    return this.handle(() => axiosInstance.get<GetOpenOrdersListOutput>(queryUrl, queryConfig));
  }
}

export type GetAllOrdersListCommandOutput = CommandOutput<GetAllOrdersListOutput>;

export class GetAllOrdersListCommand extends Command<GetAllOrdersListCommandOutput> {
  constructor(private readonly input: GetAllOrdersListInput) {
    super();
  }

  async execute(axiosInstance: AxiosInstance, apiInfoProvider: ApiInfoProvider): Promise<GetAllOrdersListCommandOutput> {
    const [apiUrl, apiKey, secretKey] = await Promise.all([apiInfoProvider.getApiUrl(), apiInfoProvider.getApiKey(), apiInfoProvider.getSecretKey()]);

    const queryParameters = getQueryParameters(this.input, true);
    const querySignature = sign(queryParameters, secretKey);
    const queryUrl = `/v3/allOrders?${queryParameters}&${querySignature}`;
    const queryConfig = getQueryConfig(apiUrl, apiKey);

    return this.handle(() => axiosInstance.get<GetAllOrdersListOutput>(queryUrl, queryConfig));
  }
}

export type CancelOrderCommandOutput = CommandOutput<CancelOrderOutput>;

export class CancelOrderCommand extends Command<CancelOrderCommandOutput> {
  constructor(private readonly input: CancelOrderInput) {
    super();
  }

  async execute(axiosInstance: AxiosInstance, apiInfoProvider: ApiInfoProvider): Promise<CancelOrderCommandOutput> {
    const [apiUrl, apiKey, secretKey] = await Promise.all([apiInfoProvider.getApiUrl(), apiInfoProvider.getApiKey(), apiInfoProvider.getSecretKey()]);

    const queryParameters = getQueryParameters(this.input, true);
    const querySignature = sign(queryParameters, secretKey);
    const queryUrl = `/v3/order?${queryParameters}&${querySignature}`;
    const queryConfig = getQueryConfig(apiUrl, apiKey);

    return this.handle(() => axiosInstance.delete<CancelOrderOutput>(queryUrl, queryConfig));
  }
}

export type GetOrderCountUsageCommandOutput = CommandOutput<GetOrderCountUsageOutput>;

export class GetOrderCountUsageCommand extends Command<GetOrderCountUsageCommandOutput> {
  async execute(axiosInstance: AxiosInstance, apiInfoProvider: ApiInfoProvider): Promise<GetOrderCountUsageCommandOutput> {
    const [apiUrl, apiKey, secretKey] = await Promise.all([apiInfoProvider.getApiUrl(), apiInfoProvider.getApiKey(), apiInfoProvider.getSecretKey()]);

    const queryParameters = getQueryParameters(null, true);
    const querySignature = sign(queryParameters, secretKey);
    const queryUrl = `/v3/rateLimit/order?${queryParameters}&${querySignature}`;
    const queryConfig = getQueryConfig(apiUrl, apiKey);

    return this.handle(() => axiosInstance.get<GetOrderCountUsageOutput>(queryUrl, queryConfig));
  }
}
