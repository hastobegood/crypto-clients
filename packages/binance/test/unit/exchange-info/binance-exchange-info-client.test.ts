import { mocked } from 'ts-jest/utils';
import { axiosInstance } from '../../../src/common/axios-instance';
import { BinanceExchangeInfo, BinanceExchangeInfoClient, BinancePublicApiProvider } from '../../../src';
import { buildDefaultBinanceExchangeInfo } from '../../builders/exchange-info/binance-exchange-info-test-builder';
import { BinanceError } from '../../../src/api/binance-api-response';

const axiosInstanceMock = mocked(axiosInstance, true);
const binancePublicApiProviderMock = mocked(jest.genMockFromModule<BinancePublicApiProvider>('../../../src'), true);

let binanceExchangeInfoClient: BinanceExchangeInfoClient;
beforeEach(() => {
  axiosInstanceMock.get = jest.fn();
  binancePublicApiProviderMock.getApiUrl = jest.fn();

  binanceExchangeInfoClient = new BinanceExchangeInfoClient(binancePublicApiProviderMock);
});

describe('BinanceExchangeInfoClient', () => {
  describe('Given exchange info to retrieve by its symbol', () => {
    describe('When success', () => {
      let binanceExchangeInfo: BinanceExchangeInfo;

      beforeEach(() => {
        binanceExchangeInfo = buildDefaultBinanceExchangeInfo();

        binancePublicApiProviderMock.getApiUrl.mockResolvedValueOnce('my-url');
        axiosInstanceMock.get.mockResolvedValueOnce({
          status: 200,
          headers: {
            limit: 666,
            time: 1,
          },
          request: {
            whatever: 'hello',
          },
          data: binanceExchangeInfo,
        });
      });

      it('Then exchange info is returned', async () => {
        const result = await binanceExchangeInfoClient.getExchangeInfoBySymbol('ABCDEF');
        expect(result).toEqual({
          status: 200,
          headers: {
            limit: 666,
            time: 1,
          },
          data: binanceExchangeInfo,
        });

        expect(binancePublicApiProviderMock.getApiUrl).toHaveBeenCalledTimes(1);
        const getApiUrlParams = binancePublicApiProviderMock.getApiUrl.mock.calls[0];
        expect(getApiUrlParams.length).toEqual(0);

        expect(axiosInstanceMock.get).toHaveBeenCalledTimes(1);
        const getParams = axiosInstanceMock.get.mock.calls[0];
        expect(getParams.length).toEqual(2);
        expect(getParams[0]).toEqual('/v3/exchangeInfo?symbol=ABCDEF');
        expect(getParams[1]).toEqual({
          baseURL: 'my-url',
        });
      });
    });
  });

  describe('When error', () => {
    beforeEach(() => {
      binancePublicApiProviderMock.getApiUrl.mockResolvedValueOnce('my-url');
      axiosInstanceMock.get.mockRejectedValueOnce(new Error('Error occured!'));
    });

    it('Then error is thrown', async () => {
      try {
        await binanceExchangeInfoClient.getExchangeInfoBySymbol('ABCDEF');
        fail();
      } catch (error) {
        expect(error).toBeDefined();
        expect((error as BinanceError).message).toEqual('Error when calling Binance API');
      }

      expect(binancePublicApiProviderMock.getApiUrl).toHaveBeenCalledTimes(1);
      const getApiUrlParams = binancePublicApiProviderMock.getApiUrl.mock.calls[0];
      expect(getApiUrlParams.length).toEqual(0);

      expect(axiosInstanceMock.get).toHaveBeenCalledTimes(1);
      const getParams = axiosInstanceMock.get.mock.calls[0];
      expect(getParams.length).toEqual(2);
      expect(getParams[0]).toEqual('/v3/exchangeInfo?symbol=ABCDEF');
      expect(getParams[1]).toEqual({
        baseURL: 'my-url',
      });
    });
  });
});
