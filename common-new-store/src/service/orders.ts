import { AxiosInstance } from 'axios';
import { NewStoreOrderInjectionBody, NewStoreOrderInjectionResponse } from '../types';

export const orderInjectionService = async ({
  client,
  order,
}: {
  client: AxiosInstance;
  order: NewStoreOrderInjectionBody;
}) => {
  const response = await client.post<NewStoreOrderInjectionResponse>('/v0/d/fulfill_order', order);
  return response.data;
};
