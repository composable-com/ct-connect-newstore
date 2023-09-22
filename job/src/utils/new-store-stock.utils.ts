import { NewStoreStockEntry } from 'common-new-store';

export const getAggregateStock = (stockEntries: NewStoreStockEntry[]) => {
  const aggregateStockEntriesMap: { [sku: string]: number } = {};

  stockEntries.forEach((entry) => {
    const { atp, sku } = entry;
    if (aggregateStockEntriesMap[sku]) {
      aggregateStockEntriesMap[sku] += atp;
    } else {
      aggregateStockEntriesMap[sku] = atp;
    }
  });

  const aggregateStockEntries = Object.entries(aggregateStockEntriesMap).map(([sku, atp]) => ({
    sku,
    atp,
  }));

  return aggregateStockEntries;
};
