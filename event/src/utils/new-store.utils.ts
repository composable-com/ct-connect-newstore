import {
  Address as CommercetoolsAddress,
  Order as CommercetoolsOrder,
  PaymentReference as CommercetoolsPayment,
} from '@commercetools/platform-sdk';
import { NewStoreAddress, NewStoreOrderInjectionBody, NewStorePayment } from 'common-new-store';
import { readConfiguration } from './config.utils';
import { formatCommercetoolsMoney } from './money.utils';

export const castToNewStoreOrder = (order: CommercetoolsOrder): NewStoreOrderInjectionBody => {
  const { shippingAddress, billingAddress } = order;
  return {
    external_id: order.id,
    shop: readConfiguration().newStoreShop,
    channel_type: 'web',
    channel_name: 'commercetools',
    shop_locale: order.locale || 'en-US',
    currency: order.totalPrice.currencyCode,
    shipments: [
      {
        items: order.lineItems.reduce<NewStoreOrderInjectionBody['shipments'][number]['items']>((acc, item) => {
          return [
            ...acc,
            // repeat every item n times (n = quantity)
            ...new Array(item.quantity).fill({
              external_item_id: item.id,
              product_id: item.variant.sku!,
              price: {
                item_price: formatCommercetoolsMoney(item.price.value),
                item_list_price: formatCommercetoolsMoney(item.price.value),
                item_tax_lines: [
                  {
                    amount: formatCommercetoolsMoney(item.taxedPrice?.totalTax) / item.quantity,
                    rate: item.taxRate?.amount ?? 0,
                    name: item.taxRate?.name ?? 'tax',
                  },
                ],
              },
            }),
          ];
        }, []),
        shipping_option: {
          service_level_identifier: order.shippingInfo?.shippingMethod?.obj?.key!,
          price: formatCommercetoolsMoney(order.shippingInfo?.price),
          tax: formatCommercetoolsMoney(order.shippingInfo?.taxedPrice?.totalTax),
        },
      },
    ],
    payments: order.paymentInfo?.payments.map(castToNewStorePayment),
    shipping_address: shippingAddress ? castToNewStoreAddress(shippingAddress) : undefined,
    billing_address: billingAddress ? castToNewStoreAddress(billingAddress) : undefined,
  };
};

const castToNewStoreAddress = (address: CommercetoolsAddress): NewStoreAddress => {
  return {
    country: address.country,
    address_line_1: `${address.streetNumber ?? ''} ${address.streetName ?? ''}`,
    city: address.city,
    state: address.state,
    province: address.state,
    zip_code: address.postalCode,
    phone: address.phone,
    first_name: address.firstName,
    last_name: address.lastName,
    salutation: address.salutation,
  };
};

const castToNewStorePayment = (payment: CommercetoolsPayment): NewStorePayment => {
  // sample function to map commercetools payments to NewStore payments
  switch (payment.obj?.paymentMethodInfo.paymentInterface) {
    case 'STRIPE':
      return {
        type: 'captured',
        amount: formatCommercetoolsMoney(payment.obj?.amountPlanned),
        method: payment.obj?.paymentMethodInfo.method || 'credit_card',
        processed_at: payment.obj?.createdAt || payment.obj?.lastModifiedAt || '',
        processor: 'stripe',
        correlation_ref: payment.id,
        metadata: {
          // add payment method metadata here
        },
      };
  }

  // default
  return {
    type: 'authorized',
    amount: formatCommercetoolsMoney(payment.obj?.amountPlanned),
    method: payment.obj?.paymentMethodInfo.method || 'credit_card',
    processed_at: payment.obj?.createdAt || payment.obj?.lastModifiedAt || '',
    processor: payment.obj?.paymentMethodInfo.paymentInterface || '',
    correlation_ref: payment.id,
  };
};
