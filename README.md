# commercetools NewStore connector

![commercetools NewStore connector](./_logos.jpeg)

## Overview
This connector syncs commercetools and NewStore data. Supports 1 commercetools project and 1 NewStore shop.

### Inventory / Stock
NewStore inventory will be synced into commercetools periodically.
- The sync period can be configured in connect.yaml file (by default its set to run every 5 minutes).
- commercetools and NewStore products are matched based on `sku`.
- NewStore [ATP](https://docs.newstore.net/product/glossary/#glossary-ATP) is used to set commercetools's [available quantity](https://docs.commercetools.com/api/projects/inventory).
- Inventory is aggregate, not store/channnel specific.

### Orders
commercetools orders will be synced into NewStore.
- A subscription is created in commercetools listening to “[Order Created](https://docs.commercetools.com/api/projects/messages#order-created)” [messages](https://docs.commercetools.com/api/projects/messages). Each time an order is created in commercetools, it will be imported to NewStore, using the [Order Injection API](https://docs.newstore.net/api/integration/order-management/order_injection_api/).
- Shipping options: by default, commercetools shipping method's `key`s are used as NewStore's `service_level_identifier`s. You can customize this in the `event/src/utils/new-store.utils.ts` file.
- Payments: you will need to customize the `castToNewStorePayment` function in the `event/src/utils/new-store.utils.ts` file to correctly map commercetools and NewStore payments, based on the PSPs (payment service provider) that you have configured. For more information see "[Integrating a payment service provider](https://docs.newstore.net/developers/guides/payments/psp/)".

## Pre-requisites
- commercetools Account
- [commercetools API keys](https://docs.commercetools.com/getting-started/create-api-client) (“Admin client”)
- NewStore Account (username and password)
- commercetools products data should have been imported into NewStore
- commercetools products must have `sku`s and they should match NewStore's `product_id`
- commercetools's shipping method `key`s should match NewStore's `service_level_identifier`s


## Installing the connector

In order to install the connector in your commercetools project, you'll need to deploy it. Refer to the the [commercetools connect deployment documentation](https://docs.commercetools.com/connect/concepts#deployments).

Setup the required environment variables when you [create the deployment](https://docs.commercetools.com/connect/getting-started#create-a-deployment):
- `CTP_CLIENT_ID`
- `CTP_CLIENT_SECRET`
- `CTP_PROJECT_KEY`
- `CTP_SCOPE`
- `CTP_REGION`
- `NEW_STORE_BASE_URL`
- `NEW_STORE_USERNAME`
- `NEW_STORE_PASSWORD`
- `NEW_STORE_SHOP`

Once the connector is deployed, it should trigger the [`postDeploy` script](https://docs.commercetools.com/connect/convert-existing-integration#postdeploy).

The `postDeploy` script will create a subscription listening to “[Order Created](https://docs.commercetools.com/api/projects/messages#order-created)” [messages](https://docs.commercetools.com/api/projects/messages). Each time an order is created in commercetools, it will be imported to NewStore, using the [Order Injection API](https://docs.newstore.net/api/integration/order-management/order_injection_api/).


## Uninstalling the connector
In order to uninstall the connector, you’ll need to [send the appropriate HTTP request and delete it](https://docs.commercetools.com/connect/deployments#delete-deployment).

This will trigger the [`preUndeploy` script](https://docs.commercetools.com/connect/convert-existing-integration#preundeploy) which will delete the messages subscription described on the “Installing the connector” section.
