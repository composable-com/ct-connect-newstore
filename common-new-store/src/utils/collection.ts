export const DEFAULT_LIMIT = 100;

type PaginatedFunction<T> = (params?: { limit?: number; offset?: number }) => Promise<{
  items: T[];
  pagination_info: {
    count: number;
    total: number;
    offset: number;
  };
}>;

export const getAllItems = async <T>(fn: PaginatedFunction<T>, results: T[] = []): Promise<T[]> => {
  const response = await fn();
  const { count, offset, total } = response.pagination_info;
  const nextOffset = count + offset;
  if (total > nextOffset) {
    return getAllItems(() => fn({ limit: DEFAULT_LIMIT, offset: nextOffset }), response.items);
  }
  return [...results, ...response.items];
};
