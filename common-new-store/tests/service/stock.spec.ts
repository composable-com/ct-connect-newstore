import { describe, expect, jest, test } from '@jest/globals';
import axios from 'axios';
import { stockPageFetchService } from '../../src';

jest.mock('axios');

const MOCK_STOCK_RESPONSE = {
  items: [],
  pagination_info: {
    count: 0,
    total: 0,
    offset: 0,
  },
};

describe('Stock service', () => {
  test('stockPageFetchService should return a response', async () => {
    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValueOnce({
      data: MOCK_STOCK_RESPONSE,
    });
    const token = await stockPageFetchService({ client: axios });
    expect(token).toBe(MOCK_STOCK_RESPONSE);
  });
});
