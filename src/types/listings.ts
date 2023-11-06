/**
 * The request schema for the getListing operation.
 * @see {@link https://developer-docs.amazon.com/sp-api/docs/listings-items-api-v2021-08-01-reference | Listings Items API Reference}
 */
export interface ListingsItemQueryParams {
    marketplaceIds: string  // comma-delimited list of marketplace IDs
    issueLocale?: string  // locale to use when returning localized issues (e.g. "en_US")
    includedData?: string  // comma-delimited list of additional data to include in the response. Default: "summaries"
}

export interface ListingItemPutRequest {
    productType: string
    requirements?: "LISTINGS" | "LISTINGS_PRODUCT_ONLY" | "LISTINGS_OFFER_ONLY"
    attributes: Record<string, unknown> | unknown[]
}
