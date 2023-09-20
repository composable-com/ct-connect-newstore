import { describe, expect, jest, test } from '@jest/globals';
import { getAuthenticatedNewStoreClient } from '../../src';

jest.mock('../../src/service/token', () => {
  return {
    accessTokenFetchService: jest.fn(() => ({ token_type: 'Bearer', access_token: 'access_token' })),
  };
});

describe('Service client', () => {
  test('getAuthenticatedNewStoreClient should return an Axios client with Authorization header', async () => {
    const client = await getAuthenticatedNewStoreClient({ baseUrl: '', username: 'username', password: 'password' });
    const authHeader = client.defaults.headers.common['Authorization'];
    expect(authHeader).toBe('Bearer access_token');
  });
});
