# Selling Partner API JavaScript Client

- Written in TypeScript
    - full typing coverage
    - typing based on the [OpenAPI schemas provided by Amazon](https://github.com/amzn/selling-partner-api-models)
- Lightweight
- Handles authentication
    - auto-refresh access token
- Handles rate limiting with custom backoff strategy
- Handles throttling
- Handles request signing
- Auto-retry
- Automatic response destructuring using [destr](https://github.com/unjs/destr)
    - no need to manually parse response
    - falls back to raw response

## Install

NPM:

```bash
npm install spapi
```

PNPM:

```bash
pnpm add spapi
```

Yarn:

```bash
yarn add spapi
```

## Usage

```ts
import { createClient } from "spapi"

const client = createClient({
    clientId: "amzn1.application-oa2-client.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    clientSecret: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    refreshToken: "Atzr|IwEBIxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
}
```

## Current SP-API Coverage

| API Reference                                               | Version    | Status |
|-------------------------------------------------------------|------------|--------|
| A+ Content Management API v2020-11-01                       | 2020-11-01 | 🚧     |
| Authorization API v1                                        | v1         | ✅     |
| Catalog Items API v2022-04-01                               | 2022-04-01 | ✅     |
| Catalog Items API v2020-12-01                               | 2020-12-01 | ❌     |
| Catalog Items API v0                                        | v0         | ❌     |
| Easy Ship API v2022-03-23                                   | 2022-03-23 | 🚧     |
| FBA Inbound Eligibility API v1                              | V1         | 🚧     |
| FBA Inventory API v1                                        | V1         | 🚧     |
| FBA Small and Light API v1                                  | v1         | 🚧     |
| Feeds API v2021-06-30                                       | 2021-06-30 | 🚧     |
| Feeds API v2020-09-04                                       | 2020-09-04 | ❌     |
| Finances API v0                                             | v0         | ✅     |
| Fulfillment Inbound API v0                                  | v0         | 🚧     |
| Fulfillment Outbound API v2020-07-01                        | 2020-07-01 | 🚧     |
| Listings Items API v2021-08-01                              | 2021-08-01 | ✅     |
| Listings Items API v2020-09-01                              | 2020-09-01 | ❌     |
| Listing Restrictions API v2021-08-01                        | 2021-08-01 | ✅     |
| Merchant Fulfillment API v0                                 | v0         | 🚧     |
| Messaging API v1                                            | v1         | 🚧     |
| Notifications API v1                                        | v1         | ✅     |
| Orders API v0                                               | v0         | ✅     |
| Product Fees API v0                                         | v0         | ✅     |
| Product Pricing API v0                                      | v0         | ✅     |
| Product Pricing API v2022-05-01                             | 2022-05-01 | ✅     |
| Product Type Definitions API v2020-09-01                    | 2020-09-01 | ❌     |
| Replenishment API v2022-11-07                               | 2022-11-07 | ❌     |
| Reports API v2021-06-30                                     | 2021-06-30 | ✅     |
| Reports API v2020-09-04                                     | 2020-09-04 | ❌     |
| Sales API v1                                                | v1         | ✅     |
| Sellers API v1                                              | v1         | ✅     |
| Services API v1                                             | v1         | ✅     |
| Shipment Invoicing API v0                                   | v0         | 🚧     |
| Shipping API v1                                             | v1         | 🚧     |
| Solicitations API v1                                        | v1         | 🚧     |
| Tokens API v2021-03-01                                      | 2021-03-01 | ✅     |
| Uploads API v2020-11-01                                     | 2020-11-01 | 🚧     |
| Vendor Direct Fulfillment Inventory API v1                  | v1         | 🚧     |
| Vendor Direct Fulfillment Orders API v2021-12-28            | 2021-12-28 | 🚧     |
| Vendor Direct Fulfillment Orders API v1                     | v1         | ❌     |
| Vendor Direct Fulfillment Payments API v1                   | v1         | 🚧     |
| Vendor Direct Fulfillment Sandbox Test Data API v2021-12-28 | 2021-12-28 | ❌     |
| Vendor Direct Fulfillment Shipping API v2021-12-28          | 2021-12-28 | 🚧     |
| Vendor Direct Fulfillment Shipping API v1                   | v1         | ❌     |
| Vendor Direct Fulfillment Transactions API v2021-12-28      | 2021-12-28 | 🚧     |
| Vendor Direct Fulfillment Transactions API v1               | v1         | ❌     |
| Vendor Retail Procurement Invoices API v1                   | v1         | 🚧     |
| Vendor Retail Procurement Orders API v1                     | v1         | 🚧     |
| Vendor Retail Procurement Shipments API v1                  | v1         | 🚧     |
| Vendor Retail Procurement Transaction Status API v1         | v1         | 🚧     |

