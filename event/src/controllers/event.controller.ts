import { Request, Response } from 'express';
import { createApiRoot } from '../client/create.client';
import CustomError from '../errors/custom.error';
import { logger } from '../utils/logger.utils';
import { castToNewStoreOrder } from '../utils/new-store.utils';
import { getAuthenticatedNewStoreClient, orderInjectionService } from 'common-new-store';
import { readConfiguration } from '../utils/config.utils';
import { checkAllProductsHaveSkus } from '../utils/order.utils';

/**
 * Exposed event POST endpoint.
 * Receives the Pub/Sub message and works with it
 *
 * @param {Request} request The express request
 * @param {Response} response The express response
 * @returns
 */
export const post = async (request: Request, response: Response) => {
  if (!request.body?.message) {
    throw new CustomError(400, 'Bad request: Wrong No Pub/Sub message format');
  }

  const payload = JSON.parse(Buffer.from(request.body.message.data, 'base64').toString());

  if (payload?.data?.type === 'OrderCreated') {
    const orderId = payload.data.resource.id;

    if (!orderId) {
      throw new CustomError(400, 'Bad request: No order id in the Pub/Sub message');
    }

    const order = await createApiRoot()
      .orders()
      .withId({ ID: orderId })
      .get({
        queryArgs: {
          expand: [
            'lineItems[*].discountedPrice.includedDiscounts[*].discount',
            'discountCodes[*].discountCode',
            'paymentInfo.payments[*]',
            'shippingInfo.shippingMethod',
          ],
        },
      })
      .execute()
      .then((resp) => resp.body)
      .catch((error) => {
        throw new CustomError(error.body?.statusCode ?? 500, `Error getting order with id ${orderId}: ${error}`);
      });

    if (!checkAllProductsHaveSkus(order)) {
      // if any product in the order is missing sku in commercetools, throw error without creating the order in NewStore
      throw new CustomError(400, 'products are missing skus');
    }

    const newStoreClient = await getAuthenticatedNewStoreClient({
      baseUrl: readConfiguration().newStoreBaseUrl,
      username: readConfiguration().newStoreUsername,
      password: readConfiguration().newStorePassword,
    }).catch((err) => {
      throw new CustomError(err.response?.status ?? 500, 'error getting NewStore client: ' + err.message);
    });

    const newStoreOrder = await orderInjectionService({
      client: newStoreClient,
      order: castToNewStoreOrder(order),
    }).catch((err: any) => {
      throw new CustomError(err.response?.status ?? 500, 'error creating order in NewStore: ' + err.message);
    });

    logger.info(`NewStore order created with id ${newStoreOrder.id}`);

    return response.status(200).send(newStoreOrder);
  }

  response.status(204).send();
};
