import { createApiRoot } from '../client/create.client';

export const createInventory = async ({ sku, availableQuantity }: { sku: string; availableQuantity: number }) => {
  const { body } = await createApiRoot()
    .inventory()
    .post({
      body: {
        quantityOnStock: availableQuantity,
        sku,
      },
    })
    .execute();
  return body;
};
