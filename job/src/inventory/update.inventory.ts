import { createApiRoot } from '../client/create.client';

export const updateInventoryById = async ({
  id,
  version,
  newAvailableQuantity,
}: {
  id: string;
  version: number;
  newAvailableQuantity: number;
}) => {
  const { body } = await createApiRoot()
    .inventory()
    .withId({ ID: id })
    .post({
      body: {
        actions: [
          {
            action: 'changeQuantity',
            quantity: newAvailableQuantity,
          },
        ],
        version,
      },
    })
    .execute();
  return body;
};
