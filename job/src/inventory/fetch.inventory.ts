import { InventoryPagedQueryResponse } from '@commercetools/platform-sdk';
import { createApiRoot } from '../client/create.client';
import { GetFunction } from '../types/index.types';
import { getAll } from '../utils/getAll.collection';

export const getInventoryPage: GetFunction<InventoryPagedQueryResponse> = async (queryArgs) => {
  const { body } = await createApiRoot().inventory().get({ queryArgs }).execute();
  return body;
};

export const allInventory: GetFunction<InventoryPagedQueryResponse> = getAll(getInventoryPage);
