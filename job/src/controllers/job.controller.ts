import { Request, Response } from 'express';
import CustomError from '../errors/custom.error';
import { createInventory } from '../inventory/create.inventory';
import { allInventory } from '../inventory/fetch.inventory';
import { updateInventoryById } from '../inventory/update.inventory';
import { getProductBySku } from '../products/search.products';
import { logger } from '../utils/logger.utils';
import { ResultsTracker } from '../utils/results.utils';
import { getAuthenticatedNewStoreClient, stockPageFetchService, getAllItems } from 'common-new-store';
import { readConfiguration } from '../utils/config.utils';
import { getAggregateStock } from '../utils/new-store-stock.utils';

/**
 * Exposed job endpoint.
 *
 * @param {Request} _request The express request
 * @param {Response} response The express response
 * @returns
 */
export const post = async (_request: Request, response: Response) => {
  const newStoreClient = await getAuthenticatedNewStoreClient({
    baseUrl: readConfiguration().newStoreBaseUrl,
    username: readConfiguration().newStoreUsername,
    password: readConfiguration().newStorePassword,
  }).catch((err) => {
    throw new CustomError(err.response?.status ?? 500, 'error getting NewStore client: ' + err.message);
  });

  const fullNewStoreInventory = await getAllItems((params) =>
    stockPageFetchService({ client: newStoreClient, ...params })
  ).catch((err) => {
    throw new CustomError(err.response?.status ?? 500, 'error getting NewStore inventory: ' + err.message);
  });

  // Get all commercetools inventory without a channel
  const fullCommercetoolsInventory = await allInventory({ where: 'supplyChannel is not defined' }).catch((err) => {
    throw new CustomError(err.body?.statusCode ?? 500, 'error getting commercetools inventory: ' + err.message);
  });

  const aggregateNewStoreStock = getAggregateStock(fullNewStoreInventory)

  const results = new ResultsTracker();

  for (const { sku, atp: newStoreStockAmount } of aggregateNewStoreStock) {
    if (!sku) continue;
    try {
      const commercetoolsInventoryEntry = fullCommercetoolsInventory.results.find((ctStock) => ctStock.sku === sku);
      if (!commercetoolsInventoryEntry) {
        // there's no stock set for this item - create the entry (if the product exists in commercetools)
        const commercetoolsProduct = await getProductBySku(sku);
        if (commercetoolsProduct) {
          await createInventory({ sku, availableQuantity: newStoreStockAmount });
          results.trackResult(sku, 'created');
        }
        continue;
      }

      // there's already stock for this item - update it if needed
      if (newStoreStockAmount !== commercetoolsInventoryEntry.availableQuantity) {
        await updateInventoryById({
          id: commercetoolsInventoryEntry.id,
          version: commercetoolsInventoryEntry.version,
          newAvailableQuantity: newStoreStockAmount,
        });
        results.trackResult(sku, 'updated');
      }
    } catch (err: any) {
      results.trackResult(sku, 'error');
      logger.error(err.message);
    }
  }

  const finalResults = results.getResults();
  logger.info(
    `Finished job run - results: updated: ${finalResults.updated.length} | created: ${finalResults.created.length} | error: ${finalResults.error.length}`
  );

  response.status(200).send(results.getResults());
};
