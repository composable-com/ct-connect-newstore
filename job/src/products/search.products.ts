import { createApiRoot } from '../client/create.client';

export const getProductBySku = async (sku: string) => {
  const { body } = await createApiRoot()
    .productProjections()
    .search()
    .get({
      queryArgs: {
        filter: `variants.sku:"${sku}"`,
      },
    })
    .execute();
  return body?.results?.[0];
};
