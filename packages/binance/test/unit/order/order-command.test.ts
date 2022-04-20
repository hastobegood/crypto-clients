import { AxiosInstance } from 'axios';
import MockDate from 'mockdate';
import { mocked } from 'ts-jest/utils';

import { ApiInfoProvider } from '../../../src/client.js';
import { CommandError } from '../../../src/command.js';
import { getQueryParameters } from '../../../src/common/http.js';
import { sign } from '../../../src/common/signature.js';
import {
  CancelOrderCommand,
  CancelOrderCommandOutput,
  GetAllOrdersListCommand,
  GetAllOrdersListCommandOutput,
  GetOpenOrdersListCommand,
  GetOpenOrdersListCommandOutput,
  GetOrderCommand,
  GetOrderCommandOutput,
  GetOrderCountUsageCommand,
  GetOrderCountUsageCommandOutput,
  SendOrderCommand,
  SendOrderCommandOutput,
} from '../../../src/order/order-command.js';
import { CancelOrderInput, GetAllOrdersListInput, GetOpenOrdersListInput, GetOrderInput, SendOrderInput } from '../../../src/order/order.js';
import { buildDefaultCommandOutput } from '../../builders/common/command-test-builder.js';
import {
  buildDefaultCancelOrderInput,
  buildDefaultCancelOrderOutput,
  buildDefaultGetAllOrdersListInput,
  buildDefaultGetAllOrdersListOutput,
  buildDefaultGetOpenOrdersListInput,
  buildDefaultGetOpenOrdersListOutput,
  buildDefaultGetOrderCountUsageOutput,
  buildDefaultGetOrderInput,
  buildDefaultGetOrderOutput,
  buildDefaultSendOrderInput,
  buildDefaultSendOrderOutput,
} from '../../builders/order/order-test-builder.js';

const apiInfoProviderMock = mocked(jest.genMockFromModule<ApiInfoProvider>('../../../src/client.js'), true);
const axiosInstanceMock = mocked(jest.genMockFromModule<AxiosInstance>('axios'), true);

describe('OrderCommand', () => {
  let date: Date;

  beforeEach(() => {
    date = new Date();
    MockDate.set(date);

    apiInfoProviderMock.getApiUrl = jest.fn();
    apiInfoProviderMock.getApiUrl.mockResolvedValueOnce('api-url');
    apiInfoProviderMock.getApiKey = jest.fn();
    apiInfoProviderMock.getApiKey.mockResolvedValueOnce('api-key');
    apiInfoProviderMock.getSecretKey = jest.fn();
    apiInfoProviderMock.getSecretKey.mockResolvedValueOnce('secret-key');

    axiosInstanceMock.post = jest.fn();
    axiosInstanceMock.get = jest.fn();
    axiosInstanceMock.delete = jest.fn();
  });

  describe('Given a SendOrderCommand to execute', () => {
    let input: SendOrderInput;
    let queryParameters: string;

    beforeEach(() => {
      input = buildDefaultSendOrderInput();
      queryParameters = `newOrderRespType=FULL&${getQueryParameters(input, true)}`;
      queryParameters = `${queryParameters}&${sign(queryParameters, 'secret-key')}`;
    });

    afterEach(() => {
      expect(apiInfoProviderMock.getApiUrl).toHaveBeenCalledTimes(1);
      expect(apiInfoProviderMock.getApiKey).toHaveBeenCalledTimes(1);
      expect(apiInfoProviderMock.getSecretKey).toHaveBeenCalledTimes(1);

      expect(axiosInstanceMock.post).toHaveBeenCalledTimes(1);
      const postParams = axiosInstanceMock.post.mock.calls[0];
      expect(postParams.length).toEqual(3);
      expect(postParams[0]).toEqual(`/v3/order?${queryParameters}`);
      expect(postParams[1]).toBeNull();
      expect(postParams[2]).toEqual({
        baseURL: 'api-url',
        headers: { 'X-MBX-APIKEY': 'api-key' },
      });
    });

    describe('When success', () => {
      let output: SendOrderCommandOutput;

      beforeEach(() => {
        output = buildDefaultCommandOutput(buildDefaultSendOrderOutput());

        axiosInstanceMock.post.mockResolvedValueOnce(output);
      });

      it('Then execution result is returned', async () => {
        const result = await new SendOrderCommand(input).execute(axiosInstanceMock, apiInfoProviderMock);
        expect(result).toEqual(output);
      });
    });

    describe('When error', () => {
      beforeEach(() => {
        axiosInstanceMock.post.mockRejectedValueOnce(new Error('Error!'));
      });

      it('Then error is thrown', async () => {
        try {
          await new SendOrderCommand(input).execute(axiosInstanceMock, apiInfoProviderMock);
          fail();
        } catch (error) {
          expect(error).toBeDefined();
          expect((error as CommandError).message).toEqual('Unable to execute command: Error: Error!');
        }
      });
    });
  });

  describe('Given a GetOrderCommand to execute', () => {
    let input: GetOrderInput;
    let queryParameters: string;

    beforeEach(() => {
      input = buildDefaultGetOrderInput();
      queryParameters = getQueryParameters(input, true);
      queryParameters = `${queryParameters}&${sign(queryParameters, 'secret-key')}`;
    });

    afterEach(() => {
      expect(apiInfoProviderMock.getApiUrl).toHaveBeenCalledTimes(1);
      expect(apiInfoProviderMock.getApiKey).toHaveBeenCalledTimes(1);
      expect(apiInfoProviderMock.getSecretKey).toHaveBeenCalledTimes(1);

      expect(axiosInstanceMock.get).toHaveBeenCalledTimes(1);
      const getParams = axiosInstanceMock.get.mock.calls[0];
      expect(getParams.length).toEqual(2);
      expect(getParams[0]).toEqual(`/v3/order?${queryParameters}`);
      expect(getParams[1]).toEqual({
        baseURL: 'api-url',
        headers: { 'X-MBX-APIKEY': 'api-key' },
      });
    });

    describe('When success', () => {
      let output: GetOrderCommandOutput;

      beforeEach(() => {
        output = buildDefaultCommandOutput(buildDefaultGetOrderOutput());

        axiosInstanceMock.get.mockResolvedValueOnce(output);
      });

      it('Then execution result is returned', async () => {
        const result = await new GetOrderCommand(input).execute(axiosInstanceMock, apiInfoProviderMock);
        expect(result).toEqual(output);
      });
    });

    describe('When error', () => {
      beforeEach(() => {
        axiosInstanceMock.get.mockRejectedValueOnce(new Error('Error!'));
      });

      it('Then error is thrown', async () => {
        try {
          await new GetOrderCommand(input).execute(axiosInstanceMock, apiInfoProviderMock);
          fail();
        } catch (error) {
          expect(error).toBeDefined();
          expect((error as CommandError).message).toEqual('Unable to execute command: Error: Error!');
        }
      });
    });
  });

  describe('Given a GetOpenOrdersListCommand with symbol to execute', () => {
    let input: GetOpenOrdersListInput;
    let queryParameters: string;

    beforeEach(() => {
      input = buildDefaultGetOpenOrdersListInput();
      queryParameters = getQueryParameters(input, true);
      queryParameters = `${queryParameters}&${sign(queryParameters, 'secret-key')}`;
    });

    afterEach(() => {
      expect(apiInfoProviderMock.getApiUrl).toHaveBeenCalledTimes(1);
      expect(apiInfoProviderMock.getApiKey).toHaveBeenCalledTimes(1);
      expect(apiInfoProviderMock.getSecretKey).toHaveBeenCalledTimes(1);

      expect(axiosInstanceMock.get).toHaveBeenCalledTimes(1);
      const getParams = axiosInstanceMock.get.mock.calls[0];
      expect(getParams.length).toEqual(2);
      expect(getParams[0]).toEqual(`/v3/openOrders?${queryParameters}`);
      expect(getParams[1]).toEqual({
        baseURL: 'api-url',
        headers: { 'X-MBX-APIKEY': 'api-key' },
      });
    });

    describe('When success', () => {
      let output: GetOpenOrdersListCommandOutput;

      beforeEach(() => {
        output = buildDefaultCommandOutput(buildDefaultGetOpenOrdersListOutput());

        axiosInstanceMock.get.mockResolvedValueOnce(output);
      });

      it('Then execution result is returned', async () => {
        const result = await new GetOpenOrdersListCommand(input).execute(axiosInstanceMock, apiInfoProviderMock);
        expect(result).toEqual(output);
      });
    });

    describe('When error', () => {
      beforeEach(() => {
        axiosInstanceMock.get.mockRejectedValueOnce(new Error('Error!'));
      });

      it('Then error is thrown', async () => {
        try {
          await new GetOpenOrdersListCommand(input).execute(axiosInstanceMock, apiInfoProviderMock);
          fail();
        } catch (error) {
          expect(error).toBeDefined();
          expect((error as CommandError).message).toEqual('Unable to execute command: Error: Error!');
        }
      });
    });
  });

  describe('Given a GetOpenOrdersListCommand without symbol to execute', () => {
    let queryParameters: string;

    beforeEach(() => {
      queryParameters = getQueryParameters(null, true);
      queryParameters = `${queryParameters}&${sign(queryParameters, 'secret-key')}`;
    });

    afterEach(() => {
      expect(apiInfoProviderMock.getApiUrl).toHaveBeenCalledTimes(1);
      expect(apiInfoProviderMock.getApiKey).toHaveBeenCalledTimes(1);
      expect(apiInfoProviderMock.getSecretKey).toHaveBeenCalledTimes(1);

      expect(axiosInstanceMock.get).toHaveBeenCalledTimes(1);
      const getParams = axiosInstanceMock.get.mock.calls[0];
      expect(getParams.length).toEqual(2);
      expect(getParams[0]).toEqual(`/v3/openOrders?${queryParameters}`);
      expect(getParams[1]).toEqual({
        baseURL: 'api-url',
        headers: { 'X-MBX-APIKEY': 'api-key' },
      });
    });

    describe('When success', () => {
      let output: GetOpenOrdersListCommandOutput;

      beforeEach(() => {
        output = buildDefaultCommandOutput(buildDefaultGetOpenOrdersListOutput());

        axiosInstanceMock.get.mockResolvedValueOnce(output);
      });

      it('Then execution result is returned', async () => {
        const result = await new GetOpenOrdersListCommand().execute(axiosInstanceMock, apiInfoProviderMock);
        expect(result).toEqual(output);
      });
    });

    describe('When error', () => {
      beforeEach(() => {
        axiosInstanceMock.get.mockRejectedValueOnce(new Error('Error!'));
      });

      it('Then error is thrown', async () => {
        try {
          await new GetOpenOrdersListCommand().execute(axiosInstanceMock, apiInfoProviderMock);
          fail();
        } catch (error) {
          expect(error).toBeDefined();
          expect((error as CommandError).message).toEqual('Unable to execute command: Error: Error!');
        }
      });
    });
  });

  describe('Given a GetAllOrdersListCommand to execute', () => {
    let input: GetAllOrdersListInput;
    let queryParameters: string;

    beforeEach(() => {
      input = buildDefaultGetAllOrdersListInput();
      queryParameters = getQueryParameters(input, true);
      queryParameters = `${queryParameters}&${sign(queryParameters, 'secret-key')}`;
    });

    afterEach(() => {
      expect(apiInfoProviderMock.getApiUrl).toHaveBeenCalledTimes(1);
      expect(apiInfoProviderMock.getApiKey).toHaveBeenCalledTimes(1);
      expect(apiInfoProviderMock.getSecretKey).toHaveBeenCalledTimes(1);

      expect(axiosInstanceMock.get).toHaveBeenCalledTimes(1);
      const getParams = axiosInstanceMock.get.mock.calls[0];
      expect(getParams.length).toEqual(2);
      expect(getParams[0]).toEqual(`/v3/allOrders?${queryParameters}`);
      expect(getParams[1]).toEqual({
        baseURL: 'api-url',
        headers: { 'X-MBX-APIKEY': 'api-key' },
      });
    });

    describe('When success', () => {
      let output: GetAllOrdersListCommandOutput;

      beforeEach(() => {
        output = buildDefaultCommandOutput(buildDefaultGetAllOrdersListOutput());

        axiosInstanceMock.get.mockResolvedValueOnce(output);
      });

      it('Then execution result is returned', async () => {
        const result = await new GetAllOrdersListCommand(input).execute(axiosInstanceMock, apiInfoProviderMock);
        expect(result).toEqual(output);
      });
    });

    describe('When error', () => {
      beforeEach(() => {
        axiosInstanceMock.get.mockRejectedValueOnce(new Error('Error!'));
      });

      it('Then error is thrown', async () => {
        try {
          await new GetAllOrdersListCommand(input).execute(axiosInstanceMock, apiInfoProviderMock);
          fail();
        } catch (error) {
          expect(error).toBeDefined();
          expect((error as CommandError).message).toEqual('Unable to execute command: Error: Error!');
        }
      });
    });
  });

  describe('Given a CancelOrderCommand to execute', () => {
    let input: CancelOrderInput;
    let queryParameters: string;

    beforeEach(() => {
      input = buildDefaultCancelOrderInput();
      queryParameters = getQueryParameters(input, true);
      queryParameters = `${queryParameters}&${sign(queryParameters, 'secret-key')}`;
    });

    afterEach(() => {
      expect(apiInfoProviderMock.getApiUrl).toHaveBeenCalledTimes(1);
      expect(apiInfoProviderMock.getApiKey).toHaveBeenCalledTimes(1);
      expect(apiInfoProviderMock.getSecretKey).toHaveBeenCalledTimes(1);

      expect(axiosInstanceMock.delete).toHaveBeenCalledTimes(1);
      const deleteParams = axiosInstanceMock.delete.mock.calls[0];
      expect(deleteParams.length).toEqual(2);
      expect(deleteParams[0]).toEqual(`/v3/order?${queryParameters}`);
      expect(deleteParams[1]).toEqual({
        baseURL: 'api-url',
        headers: { 'X-MBX-APIKEY': 'api-key' },
      });
    });

    describe('When success', () => {
      let output: CancelOrderCommandOutput;

      beforeEach(() => {
        output = buildDefaultCommandOutput(buildDefaultCancelOrderOutput());

        axiosInstanceMock.delete.mockResolvedValueOnce(output);
      });

      it('Then execution result is returned', async () => {
        const result = await new CancelOrderCommand(input).execute(axiosInstanceMock, apiInfoProviderMock);
        expect(result).toEqual(output);
      });
    });

    describe('When error', () => {
      beforeEach(() => {
        axiosInstanceMock.delete.mockRejectedValueOnce(new Error('Error!'));
      });

      it('Then error is thrown', async () => {
        try {
          await new CancelOrderCommand(input).execute(axiosInstanceMock, apiInfoProviderMock);
          fail();
        } catch (error) {
          expect(error).toBeDefined();
          expect((error as CommandError).message).toEqual('Unable to execute command: Error: Error!');
        }
      });
    });
  });

  describe('Given a GetOrderCountUsageCommand to execute', () => {
    let queryParameters: string;

    beforeEach(() => {
      queryParameters = getQueryParameters(null, true);
      queryParameters = `${queryParameters}&${sign(queryParameters, 'secret-key')}`;
    });

    afterEach(() => {
      expect(apiInfoProviderMock.getApiUrl).toHaveBeenCalledTimes(1);
      expect(apiInfoProviderMock.getApiKey).toHaveBeenCalledTimes(1);
      expect(apiInfoProviderMock.getSecretKey).toHaveBeenCalledTimes(1);

      expect(axiosInstanceMock.get).toHaveBeenCalledTimes(1);
      const getParams = axiosInstanceMock.get.mock.calls[0];
      expect(getParams.length).toEqual(2);
      expect(getParams[0]).toEqual(`/v3/rateLimit/order?${queryParameters}`);
      expect(getParams[1]).toEqual({
        baseURL: 'api-url',
        headers: { 'X-MBX-APIKEY': 'api-key' },
      });
    });

    describe('When success', () => {
      let output: GetOrderCountUsageCommandOutput;

      beforeEach(() => {
        output = buildDefaultCommandOutput(buildDefaultGetOrderCountUsageOutput());

        axiosInstanceMock.get.mockResolvedValueOnce(output);
      });

      it('Then execution result is returned', async () => {
        const result = await new GetOrderCountUsageCommand().execute(axiosInstanceMock, apiInfoProviderMock);
        expect(result).toEqual(output);
      });
    });

    describe('When error', () => {
      beforeEach(() => {
        axiosInstanceMock.get.mockRejectedValueOnce(new Error('Error!'));
      });

      it('Then error is thrown', async () => {
        try {
          await new GetOrderCountUsageCommand().execute(axiosInstanceMock, apiInfoProviderMock);
          fail();
        } catch (error) {
          expect(error).toBeDefined();
          expect((error as CommandError).message).toEqual('Unable to execute command: Error: Error!');
        }
      });
    });
  });
});
