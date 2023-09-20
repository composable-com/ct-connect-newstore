import { Order as CommercetoolsOrder } from '@commercetools/platform-sdk';

export const checkAllProductsHaveSkus = (order: CommercetoolsOrder) => {
  return order.lineItems.every((item) => item.variant.sku);
};
