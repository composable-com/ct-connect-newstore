export const COMMERCETOOLS_ORDER_MOCK = {
  type: 'Order',
  id: 'orderId',
  version: 2,
  versionModifiedAt: '2023-09-15T20:33:22.737Z',
  lastMessageSequenceNumber: 2,
  createdAt: '2023-09-15T20:33:21.106Z',
  lastModifiedAt: '2023-09-15T20:33:22.737Z',
  lastModifiedBy: {
    clientId: 'VeosrWZD4VO9IvBKtkrW9Csw',
    isPlatformClient: false,
    anonymousId: '6179eb51-a236-4437-8e89-f9c5db4b37b3',
  },
  createdBy: {
    clientId: 'VeosrWZD4VO9IvBKtkrW9Csw',
    isPlatformClient: false,
    anonymousId: 'de6d9992-4376-4bab-ba28-3fe7e4d4d5a5',
  },
  customerEmail: 'test@test.com',
  anonymousId: '9919c09f-78e3-4e9e-b387-49a6be9b3136',
  totalPrice: {
    type: 'centPrecision',
    currencyCode: 'USD',
    centAmount: 9600,
    fractionDigits: 2,
  },
  taxedPrice: {
    totalNet: {
      type: 'centPrecision',
      currencyCode: 'USD',
      centAmount: 9600,
      fractionDigits: 2,
    },
    totalGross: {
      type: 'centPrecision',
      currencyCode: 'USD',
      centAmount: 10560,
      fractionDigits: 2,
    },
    taxPortions: [
      {
        rate: 0.1,
        amount: {
          type: 'centPrecision',
          currencyCode: 'USD',
          centAmount: 960,
          fractionDigits: 2,
        },
        name: 'Sales',
      },
    ],
    totalTax: {
      type: 'centPrecision',
      currencyCode: 'USD',
      centAmount: 960,
      fractionDigits: 2,
    },
  },
  orderState: 'Open',
  paymentState: 'Paid',
  syncInfo: [],
  returnInfo: [],
  taxMode: 'Platform',
  inventoryMode: 'None',
  taxRoundingMode: 'HalfEven',
  taxCalculationMode: 'LineItemLevel',
  origin: 'Customer',
  shippingMode: 'Single',
  shippingInfo: {
    shippingMethodName: 'Standard Shipping',
    price: {
      type: 'centPrecision',
      currencyCode: 'USD',
      centAmount: 0,
      fractionDigits: 2,
    },
    shippingRate: {
      price: {
        type: 'centPrecision',
        currencyCode: 'USD',
        centAmount: 0,
        fractionDigits: 2,
      },
      tiers: [],
    },
    taxRate: {
      name: 'Sales',
      amount: 0.1,
      includedInPrice: false,
      country: 'US',
      id: '_0x6AfpB',
      subRates: [],
    },
    taxCategory: {
      typeId: 'tax-category',
      id: 'aff4fe6e-acf2-4230-83fd-932e19fb9afa',
    },
    deliveries: [],
    shippingMethod: {
      typeId: 'shipping-method',
      id: 'c27aed0b-e334-4edc-b416-aece8c84e6e8',
    },
    taxedPrice: {
      totalNet: {
        type: 'centPrecision',
        currencyCode: 'USD',
        centAmount: 0,
        fractionDigits: 2,
      },
      totalGross: {
        type: 'centPrecision',
        currencyCode: 'USD',
        centAmount: 0,
        fractionDigits: 2,
      },
      totalTax: {
        type: 'centPrecision',
        currencyCode: 'USD',
        centAmount: 0,
        fractionDigits: 2,
      },
    },
    shippingMethodState: 'MatchesCart',
  },
  shippingAddress: {
    id: 'new',
    firstName: 'Test',
    lastName: 'Test',
    streetName: 'Street',
    streetNumber: '111',
    postalCode: '222',
    city: 'My City',
    state: 'My State',
    country: 'US',
    phone: '3794292255',
    email: 'test@test.com',
  },
  shipping: [],
  lineItems: [
    {
      id: '8788513b-68fa-4467-bd25-dc478eff4e6f',
      productId: 'faa36e85-c4e5-469e-b1c8-5242e46111aa',
      productKey: '2018-frichette-red-mountain-merlot',
      name: {
        'en-US': '2018 Frichette Red Mountain Merlot',
        'en-CA': '2018 Frichette Red Mountain Merlot',
        'fr-CA': '2018 Frichette Red Mountain Merlot',
      },
      productType: {
        typeId: 'product-type',
        id: 'db80d2b2-9958-4f32-ab32-6a2a4a561e85',
      },
      productSlug: {
        'en-US': '2018-frichette-red-mountain-merlot',
        'en-CA': '2018-frichette-red-mountain-merlot',
        'fr-CA': '2018-frichette-red-mountain-merlot',
      },
      variant: {
        id: 1,
        sku: 'CV-18FRMERRM',
        prices: [
          {
            id: 'fe30ef14-0453-4702-be91-81f45cd9a07c',
            value: {
              type: 'centPrecision',
              currencyCode: 'USD',
              centAmount: 4800,
              fractionDigits: 2,
            },
          },
          {
            id: '390ee7eb-75e7-449f-9263-69e1d36bc464',
            value: {
              type: 'centPrecision',
              currencyCode: 'CAD',
              centAmount: 3700,
              fractionDigits: 2,
            },
          },
          {
            id: '373b041a-be65-46db-bd0d-b89d458ce842',
            value: {
              type: 'centPrecision',
              currencyCode: 'USD',
              centAmount: 4800,
              fractionDigits: 2,
            },
            customerGroup: {
              typeId: 'customer-group',
              id: 'b2b659fa-3b1a-4706-ab87-2576702bba6c',
            },
          },
        ],
        images: [
          {
            url: 'https://c23c9c4c143c1c375d5d-3d93e6675d449a0d12d77053fbd688dd.ssl.cf1.rackcdn.com/2018-red-mountain-me-Q1HzsQeM.jpg',
            dimensions: {
              w: 500,
              h: 500,
            },
          },
          {
            url: 'https://c23c9c4c143c1c375d5d-3d93e6675d449a0d12d77053fbd688dd.ssl.cf1.rackcdn.com/shaeheadshotpckimfet-329H6tAN.jpg',
            dimensions: {
              w: 700,
              h: 467,
            },
          },
          {
            url: 'https://c23c9c4c143c1c375d5d-3d93e6675d449a0d12d77053fbd688dd.ssl.cf1.rackcdn.com/gregheadshotpckimfet-t9SLofWh.jpg',
            dimensions: {
              w: 700,
              h: 467,
            },
          },
        ],
        attributes: [
          {
            name: 'seller',
            value: 'splash',
          },
          {
            name: 'type',
            value: 'wine',
          },
          {
            name: 'brand',
            value: 'Frichette',
          },
          {
            name: 'terroir',
            value: 'Washington, USA',
          },
          {
            name: 'producer_bio',
            value:
              'Frichette Winery\nRed Mountain, Washington\n\nHusband & wife run winery making wines he loves and wine experiences she dreams of. Their expression of flavorful and smooth red wines and "be in the moment" vibes carry through in every sip of wine and in every second of delightfulness in the winery. Greg is from Pasco, Shea from South Carolina. Both were living in Southern California when they met, married, and had their son Jayden. They wanted to move closer to family in either South Carolina or Washington. With a flip of a coin, the coin toss determined they would relocate to Washington. Both agreed when they moved, they wanted to create a business that would give them goosebumps. With a little research and cheerleading from friends, they decided to go into wine, opening their tasting room in 2013 and offering their first vintage of 2011 with 650 cases of wine. Today, Greg and Shea produce nearly 3000 cases and enjoy hosting events for wine club members and guests from all over the world.',
          },
          {
            name: 'classification',
            value: 'Red Wine',
          },
          {
            name: 'varietals',
            value: 'Merlot',
          },
          {
            name: 'region',
            value: 'United States',
          },
          {
            name: 'rating',
            value: 1.7,
          },
        ],
        assets: [],
        availability: {
          isOnStock: true,
          availableQuantity: 125,
          version: 13,
          id: '0cef3970-5e6e-40a9-a16e-7db5a32e2e77',
        },
      },
      price: {
        id: 'fe30ef14-0453-4702-be91-81f45cd9a07c',
        value: {
          type: 'centPrecision',
          currencyCode: 'USD',
          centAmount: 4800,
          fractionDigits: 2,
        },
      },
      quantity: 2,
      discountedPricePerQuantity: [],
      taxRate: {
        name: 'Sales',
        amount: 0.1,
        includedInPrice: false,
        country: 'US',
        id: '_0x6AfpB',
        subRates: [],
      },
      perMethodTaxRate: [],
      addedAt: '2023-09-15T20:32:15.859Z',
      lastModifiedAt: '2023-09-15T20:32:17.900Z',
      state: [
        {
          quantity: 2,
          state: {
            typeId: 'state',
            id: '9eb8a63f-3aac-4ffc-b502-a43fbe00fe13',
          },
        },
      ],
      priceMode: 'Platform',
      lineItemMode: 'Standard',
      totalPrice: {
        type: 'centPrecision',
        currencyCode: 'USD',
        centAmount: 9600,
        fractionDigits: 2,
      },
      taxedPrice: {
        totalNet: {
          type: 'centPrecision',
          currencyCode: 'USD',
          centAmount: 9600,
          fractionDigits: 2,
        },
        totalGross: {
          type: 'centPrecision',
          currencyCode: 'USD',
          centAmount: 10560,
          fractionDigits: 2,
        },
        totalTax: {
          type: 'centPrecision',
          currencyCode: 'USD',
          centAmount: 960,
          fractionDigits: 2,
        },
      },
      taxedPricePortions: [],
    },
  ],
  customLineItems: [],
  transactionFee: true,
  discountCodes: [],
  directDiscounts: [],
  cart: {
    typeId: 'cart',
    id: 'a6a1c681-69ba-49dc-b29b-b51364aa5d64',
  },
  paymentInfo: {
    payments: [
      {
        typeId: 'payment',
        id: '6198b82c-aa45-4aea-a165-2c7fbb492b47',
        obj: {
          id: '6198b82c-aa45-4aea-a165-2c7fbb492b47',
          version: 1,
          versionModifiedAt: '2023-09-15T20:33:20.892Z',
          lastMessageSequenceNumber: 1,
          createdAt: '2023-09-15T20:33:20.892Z',
          lastModifiedAt: '2023-09-15T20:33:20.892Z',
          lastModifiedBy: {
            clientId: 'VeosrWZD4VO9IvBKtkrW9Csw',
            isPlatformClient: false,
            anonymousId: 'de6d9992-4376-4bab-ba28-3fe7e4d4d5a5',
          },
          createdBy: {
            clientId: 'VeosrWZD4VO9IvBKtkrW9Csw',
            isPlatformClient: false,
            anonymousId: 'de6d9992-4376-4bab-ba28-3fe7e4d4d5a5',
          },
          amountPlanned: {
            type: 'centPrecision',
            currencyCode: 'USD',
            centAmount: 10560,
            fractionDigits: 2,
          },
          paymentMethodInfo: {
            paymentInterface: 'STRIPE',
            method: 'CARD',
            name: {
              'en-US': 'Stripe',
            },
          },
          paymentStatus: {},
          transactions: [
            {
              id: 'd8bbc153-3dcb-4d78-b332-0aec43c2a147',
              type: 'Charge',
              amount: {
                type: 'centPrecision',
                currencyCode: 'USD',
                centAmount: 10560,
                fractionDigits: 2,
              },
              interactionId: 'pi_3NqihXGbAqzjPJ8X00JDvnJC',
              state: 'Initial',
            },
          ],
          interfaceInteractions: [],
          anonymousId: 'de6d9992-4376-4bab-ba28-3fe7e4d4d5a5',
        },
      },
    ],
  },
  billingAddress: {
    firstName: 'Test',
    lastName: 'Test',
    streetName: 'Street',
    streetNumber: '111',
    postalCode: '222',
    city: 'My City',
    state: 'My State',
    country: 'US',
    email: 'test@test.com',
  },
  itemShippingAddresses: [],
  refusedGifts: [],
};
