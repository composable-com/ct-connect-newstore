export interface AccessTokenTokenServiceResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  scope: string;
  token_type: 'Bearer';
}

export interface StockPageFetchServiceResponse {
  items: NewStoreStockEntry[];
  pagination_info: {
    count: number;
    total: number;
    offset: number;
  };
}

export interface NewStoreStockEntry {
  allocations: number;
  atp: number;
  compound_id: string;
  currency: string;
  fulfillment_node_id: string;
  future_atp: number;
  on_hand: number;
  present_atp: number;
  price: number;
  product_id: string;
  safety_stock: number;
  sku: string;
  title: string;
}

export interface NewStoreOrderInjectionBody {
  external_id: string;
  shop: string;
  channel_type: string;
  channel_name: string;
  currency: string;
  shop_locale: string;
  shipments: {
    items: {
      external_item_id: string;
      product_id: string;
      price: {
        item_price: number;
        item_list_price: number;
        item_tax_lines: {
          amount: number;
          rate: number;
          name: string;
        }[];
        item_discount_info?: any[];
        item_order_discount_info?: any[];
      };
    }[];
    shipping_option: {
      service_level_identifier: string;
      price: number;
      tax: number;
    };
  }[];
  external_customer_id?: string;
  customer_name?: string;
  customer_email?: string;
  customer_locale?: string; // customer_language ?
  placed_at?: string;
  price_method?: 'tax_excluded' | 'tax_included';
  shipping_address?: NewStoreAddress;
  billing_address?: NewStoreAddress;
  payments?: NewStorePayment[];
}

export interface NewStoreOrderInjectionResponse {
  external_id: string;
  id: string;
  items: {
    external_item_id: string;
    id: string;
    product_id: string;
  }[];
}

export interface NewStoreAddress {
  country: string;
  address_line_1: string;
  address_line_2?: string;
  city?: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  province?: string;
  salutation?: string;
  second_name?: string;
  state?: string;
  suffix?: string;
  title?: string;
  zip_code?: string;
}

export interface NewStorePayment {
  type: 'authorized' | 'captured';
  amount: number;
  method: string;
  processed_at: string;
  processor: string;
  correlation_ref: string;
  wallet?: string;
  metadata?: object;
}
