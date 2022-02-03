import { getQueryParameters } from '../../../src/common/http';

describe('Http', () => {
  describe('Given a query parameters to generate', () => {
    describe('When data is undefined', () => {
      it('Then empty query parameters is returned', async () => {
        const result = getQueryParameters(undefined, false);
        expect(result).toEqual('');
      });
    });

    describe('When data is null', () => {
      it('Then empty query parameters is returned', async () => {
        const result = getQueryParameters(undefined, false);
        expect(result).toEqual('');
      });
    });

    describe('When data is empty', () => {
      it('Then empty query parameters is returned', async () => {
        const result = getQueryParameters({}, false);
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
