import { getQueryParameters } from '../../../src/common/axios-instance.js';

describe('AxiosInstance', () => {
  describe('Given a query parameters to generate', () => {
    describe('When empty data', () => {
      it('Then empty query parameters is returned', async () => {
        const data = {};

        const result = getQueryParameters(data, false);
        expect(result).toEqual('');
      });
    });

    describe('When data has multiple attributes', () => {
      it('Then query parameters with non null attributes is returned', async () => {
        const data = {
          code: 'ABC',
          label: undefined,
          whatever: 666,
          awesome: true,
          age: 0,
          ttl: null,
          email: 'toto/@test.com',
        };

        const result = getQueryParameters(data, false);
        expect(result).toEqual('code=ABC&whatever=666&awesome=true&age=0&email=toto%2F%40test.com');
      });
    });
  });
});
