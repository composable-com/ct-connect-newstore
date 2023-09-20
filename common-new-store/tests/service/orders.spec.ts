import { describe, expect, jest, test } from '@jest/globals';
import axios from 'axios';
import { NewStoreOrderInjectionBody, orderInjectionService } from '../../src';

jest.mock('axios');

const MOCK_ORDER: NewStoreOrderInjectionBody = {
  external_id: 'external_id',
  shop: 'shop',
  channel_type: 'channel_type',
  channel_name: 'channel_name',
  currency: 'currency',
  shop_locale: 'shop_locale',
  shipments: [
    {
      items: [
        {
          external_item_id: 'external_item_id',
          product_id: 'product_id',
          price: {
            item_price: 0,
            item_list_price: 0,
            item_tax_lines: [],
          },
        },
      ],
      shipping_option: {
        service_level_identifier: 'service_level_identifier',
        price: 0,
        tax: 0,
      },
    },
  ],
};

describe('Order service', () => {
  test('orderInjectionService should return a response', async () => {
    (axios.post as jest.MockedFunction<typeof axios.post>).mockResolvedValueOnce({
      data: MOCK_ORDER,
    });
    const token = await orderInjectionService({ client: axios, order: MOCK_ORDER });
    expect(token).toBe(MOCK_ORDER);
  });
});
