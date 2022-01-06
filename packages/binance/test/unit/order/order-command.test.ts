import { mocked } from 'ts-jest/utils';
import MockDate from 'mockdate';
import { axiosInstance, getQueryParameters } from '../../../src/common/axios-instance.js';
import { sign } from '../../../src/common/signature.js';
import { SecuredApiInfoProvider } from '../../../src/client.js';
import { CommandError } from '../../../src/command.js';
import {
  CancelOrderCommand,
  CancelOrderCommandInput,
  CancelOrderCommandOutput,
  QueryOrderCommand,
  QueryOrderCommandInput,
  QueryOrderCommandOutput,
  SendOrderCommand,
  SendOrderCommandInput,
  SendOrderCommandOutput,
} from '../../../src/order/order-command.js';
import { CancelOrderOutput, QueryOrderOutput, SendOrderOutput } from '../../../src/order/order.js';
import { buildDefaultCommandInput, buildDefaultCommandOutput } from '../../builders/common/command-test-builder.js';
import { buildDefaultCancelOrderInput, buildDefaultQueryOrderInput, buildDefaultSendOrderInput } from '../../builders/order/order-test-builder.js';

const apiInfoProviderMock = mocked(jest.genMockFromModule<SecuredApiInfoProvider>('../../../src/client.js'), true);
const axiosInstanceMock = mocked(axiosInstance, true);

describe('OrderCommand', () => {
  let date: Date;

  beforeEach(() => {
    date = new Date();
    MockDate.set(date);

    apiInfoProviderMock.getApiUrl = jest.fn();
    apiInfoProviderMock.getApiKey = jest.fn();
    apiInfoProviderMock.getSecretKey = jest.fn();

    axiosInstanceMock.post = jest.fn();
    axiosInstanceMock.get = jest.fn();
    axiosInstanceMock.delete = jest.fn();
  });

  describe('Given a SendOrderCommand to execute', () => {
    let input: SendOrderCommandInput;
    let queryParameters: string;

    beforeEach(() => {
      input = buildDefaultCommandInput(buildDefaultSendOrderInput());
      queryParameters = `newOrderRespType=FULL&${getQueryParameters(input.data, true)}`;
      queryParameters = `${queryParameters}&${sign(queryParameters, 'secret-key')}`;

      apiInfoProviderMock.getApiUrl.mockResolvedValueOnce('api-url');
      apiInfoProviderMock.getApiKey.mockResolvedValueOnce('api-key');
      apiInfoProviderMock.getSecretKey.mockResolvedValueOnce('secret-key');
    });

    afterEach(() => {
      expect(apiInfoProviderMock.getApiUrl).toHaveBeenCalledTimes(1);
      expect(apiInfoProviderMock.getApiKey).toHaveBeenCalledTimes(1);
      expect(apiInfoProviderMock.getSecretKey).toHaveBeenCalledTimes(1);

      expect(axiosInstanceMock.post).toHaveBeenCalledTimes(1);
      const postParams = axiosInstanceMock.post.mock.calls[0];
      expect(postParams.length).toEqual(2);
      expect(postParams[0]).toEqual(`/v3/order?${queryParameters}`);
      expect(postParams[1]).toEqual({
        baseURL: 'api-url',
        headers: { 'X-MBX-APIKEY': 'api-key' },
      });
    });

    describe('When success', () => {
      let output: SendOrderCommandOutput;

      beforeEach(() => {
        output = buildDefaultCommandOutput({} as SendOrderOutput);

        axiosInstanceMock.post.mockResolvedValueOnce(output);
      });

      it('Then execution result is returned', async () => {
        const result = await new SendOrderCommand(input).execute(apiInfoProviderMock);
        expect(result).toEqual(output);
      });
    });

    describe('When error', () => {
      beforeEach(() => {
        axiosInstanceMock.post.mockRejectedValueOnce(new Error('Error!'));
      });

      it('Then error is thrown', async () => {
        try {
          await new SendOrderCommand(input).execute(apiInfoProviderMock);
          fail();
        } catch (error) {
          expect(error).toBeDefined();
          expect((error as CommandError).message).toEqual('Unable to execute command: Error: Error!');
        }
      });
    });
  });

  describe('Given a QueryOrderCommand to execute', () => {
    let input: QueryOrderCommandInput;
    let queryParameters: string;

    beforeEach(() => {
      input = buildDefaultCommandInput(buildDefaultQueryOrderInput());
      queryParameters = `${getQueryParameters(input.data, true)}`;
      queryParameters = `${queryParameters}&${sign(queryParameters, 'secret-key')}`;

      apiInfoProviderMock.getApiUrl.mockResolvedValueOnce('api-url');
      apiInfoProviderMock.getApiKey.mockResolvedValueOnce('api-key');
      apiInfoProviderMock.getSecretKey.mockResolvedValueOnce('secret-key');
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
      let output: QueryOrderCommandOutput;

      beforeEach(() => {
        output = buildDefaultCommandOutput({} as QueryOrderOutput);

        axiosInstanceMock.get.mockResolvedValueOnce(output);
      });

      it('Then execution result is returned', async () => {
        const result = await new QueryOrderCommand(input).execute(apiInfoProviderMock);
        expect(result).toEqual(output);
      });
    });

    describe('When error', () => {
      beforeEach(() => {
        axiosInstanceMock.get.mockRejectedValueOnce(new Error('Error!'));
      });

      it('Then error is thrown', async () => {
        try {
          await new QueryOrderCommand(input).execute(apiInfoProviderMock);
          fail();
        } catch (error) {
          expect(error).toBeDefined();
          expect((error as CommandError).message).toEqual('Unable to execute command: Error: Error!');
        }
      });
    });
  });

  describe('Given a CancelOrderCommand to execute', () => {
    let input: CancelOrderCommandInput;
    let queryParameters: string;

    beforeEach(() => {
      input = buildDefaultCommandInput(buildDefaultCancelOrderInput());
      queryParameters = `${getQueryParameters(input.data, true)}`;
      queryParameters = `${queryParameters}&${sign(queryParameters, 'secret-key')}`;

      apiInfoProviderMock.getApiUrl.mockResolvedValueOnce('api-url');
      apiInfoProviderMock.getApiKey.mockResolvedValueOnce('api-key');
      apiInfoProviderMock.getSecretKey.mockResolvedValueOnce('secret-key');
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
        output = buildDefaultCommandOutput({} as CancelOrderOutput);

        axiosInstanceMock.delete.mockResolvedValueOnce(output);
      });

      it('Then execution result is returned', async () => {
        const result = await new CancelOrderCommand(input).execute(apiInfoProviderMock);
        expect(result).toEqual(output);
      });
    });

    describe('When error', () => {
      beforeEach(() => {
        axiosInstanceMock.delete.mockRejectedValueOnce(new Error('Error!'));
      });

      it('Then error is thrown', async () => {
        try {
          await new CancelOrderCommand(input).execute(apiInfoProviderMock);
          fail();
        } catch (error) {
          expect(error).toBeDefined();
          expect((error as CommandError).message).toEqual('Unable to execute command: Error: Error!');
        }
      });
    });
  });
});
