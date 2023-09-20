import { AxiosInstance } from 'axios';
import { DEFAULT_LIMIT } from '../utils';
import { StockPageFetchServiceResponse } from '../types';

export const stockPageFetchService = async ({
  client,
  limit = DEFAULT_LIMIT,
  offset = 0,
}: {
  client: AxiosInstance;
  limit?: number;
  offset?: number;
}) => {
  const response = await client.get<StockPageFetchServiceResponse>('/_/v0/hq/stocked_products', {
    params: {
      limit,
      offset,
    },
  });
  return response.data;
};
