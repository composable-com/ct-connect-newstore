import { AxiosInstance } from 'axios';
import { AccessTokenTokenServiceResponse } from '../types';

export const accessTokenFetchService = async ({
  client,
  username,
  password,
}: {
  client: AxiosInstance;
  username: string;
  password: string;
}) => {
  const response = await client.post<AccessTokenTokenServiceResponse>('/v0/token', {
    grant_type: 'password',
    username,
    password,
  });
  return response.data;
};
