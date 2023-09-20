import { describe, expect, jest, test } from '@jest/globals';
import axios from 'axios';
import { accessTokenFetchService } from '../../src';

jest.mock('axios');

const MOCK_TOKEN_RESPONSE = {
  access_token: 'access_token',
  refresh_token: 'refresh_token',
  expires_in: 100,
  scope: 'scope',
  token_type: 'Bearer',
};

describe('Token service', () => {
  test('accessTokenFetchService should return a response', async () => {
    (axios.post as jest.MockedFunction<typeof axios.post>).mockResolvedValueOnce({
      data: MOCK_TOKEN_RESPONSE,
    });
    const token = await accessTokenFetchService({ client: axios, username: 'username', password: 'password' });
    expect(token).toBe(MOCK_TOKEN_RESPONSE);
  });
});
