# Selling Partner API JavaScript Client

- Cross-platform
    - works in all modern browsers
    - works in Node.js, Deno and Bun
- Written in TypeScript
    - full typing coverage
    - typing based on the [OpenAPI schemas provided by Amazon](https://github.com/amzn/selling-partner-api-models)
- Lightweight
- Handles authentication
    - auto-refresh access token
- Handles rate limiting with custom backoff strategy
- Handles throttling
- Handles request signing (needs additional setup)
- Auto-retry (1 retry by default)
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

### Create a client instance

```ts
import { createClient } from "@hexrw/spapi"

const client = createClient({
    clientId: "amzn1.application-oa2-client.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    clientSecret: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    refreshToken: "Atzr|xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    region: "eu",
}
```

### Make a request

```ts
// Example request - get a list of 'GET_MERCHANT_LISTINGS_ALL_DATA' reports
import { Marketplaces } from "@hexrw/spapi"

/*
 * Response is automatically typed based on the OpenAPI schema provided by Amazon.
 * It will also be automatically parsed and destructured using the correct format
 * falling back to plain text if needed.
 */
const { reports } = await client.get("/reports/2021-06-30/reports", {
    params: {
        // Query will be automatically URL encoded, joined and appended to the final URL
        query: {
            reportTypes: [ "GET_MERCHANT_LISTINGS_ALL_DATA" ], // case-sensitive
            marketplaceIds: [ Marketplaces.UK ],
            pageSize: 10,
            createdSince: new Date("2021-01-01").toISOString(), // ISO 8601
            processingStatuses: [ "DONE" ], // case-sensitive
        }
    }
})
```

### Make a request using a helper method from the wrapper

**Note**: The wrapper doesn't offer full coverage of the SP-API. It's only meant to make common requests easier.

```ts
import { Marketplaces } from "@hexrw/spapi"

const orders = await client.getOrders({
    marketplaceIds: [ Marketplaces.UK ],
    pageSize: 10,
    createdAfter: "2021-01-01", // supports all common date formats
})
```

## Current client SP-API coverage

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

## Development

### Scripts

```json5
// package.json
{
    // ...
    "scripts": {
        "test": "jest",
        "test:ts": "tsc --noEmit",
        "schema:generate": "openapi-typescript --redoc ../api/redocly.yaml",
        "schema:generate-joined": "openapi-typescript ../api/sp-api.yaml -o ./src/schemas/index.ts",
        "publish": "pnpm publish --access public",
        "build": "tsc ./src/index.ts --outDir ./dist"
    }
    // ...
}
```

### Generate schemas

```sh
npm run schema:generate
```

### Join schemas

```sh
npm run schema:generate-joined
```

### Build

```sh
npm run build
```

### Publish

```sh
npm run publish
```

## License

[MIT](./LICENSE)
