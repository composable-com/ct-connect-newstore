import axios from 'axios';
import { accessTokenFetchService } from './token';

export const getAuthenticatedNewStoreClient = async ({
  baseUrl,
  username,
  password,
}: {
  baseUrl: string;
  username: string;
  password: string;
}) => {
  const client = axios.create({ baseURL: baseUrl });
  const token = await accessTokenFetchService({
    client,
    username,
    password,
  });
  client.defaults.headers.common['Authorization'] = `${token.token_type} ${token.access_token}`;
  return client;
};
