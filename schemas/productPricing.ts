/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
    "/batches/products/pricing/2022-05-01/offer/featuredOfferExpectedPrice": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** @description Returns the set of responses that correspond to the batched list of up to 40 requests defined in the request body. The response for each successful (HTTP status code 200) request in the set includes the computed listing price at or below which a seller can expect to become the featured offer (before applicable promotions). This is called the featured offer expected price (FOEP). Featured offer is not guaranteed, because competing offers may change, and different offers may be featured based on other factors, including fulfillment capabilities to a specific customer. The response to an unsuccessful request includes the available error text.
         *
         *     **Usage Plan:**
         *
         *     | Rate (requests per second) | Burst |
         *     | ---- | ---- |
         *     | 0.033 | 1 |
         *
         *     The `x-amzn-RateLimit-Limit` response header returns the usage plan rate limits that were applied to the requested operation, when available. The table above indicates the default rate and burst values for this operation. Selling partners whose business demands require higher throughput may see higher rate and burst values than those shown here. For more information, see [Usage Plans and Rate Limits in the Selling Partner API](doc:usage-plans-and-rate-limits-in-the-sp-api). */
        post: operations["getFeaturedOfferExpectedPriceBatch"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        /** @description The request body for the getFeaturedOfferExpectedPriceBatch operation. */
        GetFeaturedOfferExpectedPriceBatchRequest: {
            requests?: components["schemas"]["FeaturedOfferExpectedPriceRequestList"];
        };
        /** @description A batched list of featured offer expected price requests. */
        FeaturedOfferExpectedPriceRequestList: components["schemas"]["FeaturedOfferExpectedPriceRequest"][];
        /** @description An individual featured offer expected price request for a particular SKU. */
        FeaturedOfferExpectedPriceRequest: components["schemas"]["BatchRequest"] & components["schemas"]["FeaturedOfferExpectedPriceRequestParams"];
        /** @description The parameters for an individual request. */
        FeaturedOfferExpectedPriceRequestParams: {
            marketplaceId: components["schemas"]["MarketplaceId"];
            sku: components["schemas"]["Sku"];
        };
        /** @description The response schema for the getFeaturedOfferExpectedPriceBatch operation. */
        GetFeaturedOfferExpectedPriceBatchResponse: {
            responses?: components["schemas"]["FeaturedOfferExpectedPriceResponseList"];
        };
        /** @description A batched list of featured offer expected price responses. */
        FeaturedOfferExpectedPriceResponseList: components["schemas"]["FeaturedOfferExpectedPriceResponse"][];
        FeaturedOfferExpectedPriceResponse: components["schemas"]["BatchResponse"] & {
            request: components["schemas"]["FeaturedOfferExpectedPriceRequestParams"];
            body?: components["schemas"]["FeaturedOfferExpectedPriceResponseBody"];
        };
        /** @description A list of error responses returned when a request is unsuccessful. */
        Errors: {
            errors: components["schemas"]["ErrorList"];
        };
        /** @description The featured offer expected price response data for a requested SKU. */
        FeaturedOfferExpectedPriceResponseBody: {
            offerIdentifier: components["schemas"]["OfferIdentifier"];
            featuredOfferExpectedPriceResults?: components["schemas"]["FeaturedOfferExpectedPriceResultList"];
            errors?: components["schemas"]["ErrorList"];
        };
        /** @description A list of featured offer expected price results for the requested offer. */
        FeaturedOfferExpectedPriceResultList: components["schemas"]["FeaturedOfferExpectedPriceResult"][];
        /** @description The featured offer expected price result data for the requested offer. */
        FeaturedOfferExpectedPriceResult: {
            featuredOfferExpectedPrice?: components["schemas"]["FeaturedOfferExpectedPrice"];
            /** @description The status of the featured offer expected price computation. Possible values include VALID_FOEP, NO_COMPETING_OFFER, OFFER_NOT_ELIGIBLE, OFFER_NOT_FOUND. */
            resultStatus: string;
            competingFeaturedOffer?: components["schemas"]["FeaturedOffer"];
            currentFeaturedOffer?: components["schemas"]["FeaturedOffer"];
        };
        /** @description The item price at or below which the target offer may be featured. */
        FeaturedOfferExpectedPrice: {
            listingPrice: components["schemas"]["MoneyType"];
            points?: components["schemas"]["Points"];
        };
        FeaturedOffer: {
            offerIdentifier: components["schemas"]["OfferIdentifier"];
            condition?: components["schemas"]["Condition"];
            price?: components["schemas"]["Price"];
        };
        /** @description A mapping of additional HTTP headers to send/receive for an individual request within a batch. */
        HttpHeaders: {
            [key: string]: string | undefined;
        };
        /** @description The HTTP status line associated with the response to an individual request within a batch. For more information, consult [RFC 2616](https://www.w3.org/Protocols/rfc2616/rfc2616-sec6.html). */
        HttpStatusLine: {
            /** @description The HTTP response Status-Code. */
            statusCode?: number;
            /** @description The HTTP response Reason-Phase. */
            reasonPhrase?: string;
        };
        /** @description Additional HTTP body information associated with an individual request within a batch. */
        HttpBody: {
            [key: string]: Record<string, never> | undefined;
        };
        /**
         * @description The HTTP method associated with an individual request within a batch.
         * @enum {string}
         */
        HttpMethod: "GET" | "PUT" | "PATCH" | "DELETE" | "POST";
        /** @description The common properties for individual requests within a batch. */
        BatchRequest: {
            /** @description The URI associated with an individual request within a batch. For FeaturedOfferExpectedPrice, this should be '/products/pricing/2022-05-01/offer/featuredOfferExpectedPrice'. */
            uri: string;
            method: components["schemas"]["HttpMethod"];
            body?: components["schemas"]["HttpBody"];
            headers?: components["schemas"]["HttpHeaders"];
        };
        /** @description The common properties for responses to individual requests within a batch. */
        BatchResponse: {
            headers: components["schemas"]["HttpHeaders"];
            status: components["schemas"]["HttpStatusLine"];
        };
        /** @description Identifies an offer from a particular seller on an ASIN. */
        OfferIdentifier: {
            marketplaceId: components["schemas"]["MarketplaceId"];
            /** @description The seller identifier for the offer. */
            sellerId?: string;
            /** @description The seller stock keeping unit (SKU) of the item. This will only be present for the target offer, which belongs to the requesting seller. */
            sku?: string;
            asin: components["schemas"]["Asin"];
            fulfillmentType?: components["schemas"]["FulfillmentType"];
        };
        MoneyType: {
            /** @description The currency code in ISO 4217 format. */
            currencyCode?: string;
            /** @description The monetary value. */
            amount?: number;
        };
        Price: {
            listingPrice: components["schemas"]["MoneyType"];
            shippingPrice?: components["schemas"]["MoneyType"];
            points?: components["schemas"]["Points"];
        };
        Points: {
            /**
             * Format: int32
             * @description The number of points.
             */
            pointsNumber?: number;
            pointsMonetaryValue?: components["schemas"]["MoneyType"];
        };
        /**
         * @description Indicates whether the item is fulfilled by Amazon or by the seller (merchant).
         * @enum {string}
         */
        FulfillmentType: "AFN" | "MFN";
        /** @description A marketplace identifier. Specifies the marketplace for which data is returned. */
        MarketplaceId: string;
        /** @description The seller SKU of the item. */
        Sku: string;
        /**
         * @description The condition of the item.
         * @enum {string}
         */
        Condition: "New" | "Used" | "Collectible" | "Refurbished" | "Club";
        /** @description The Amazon Standard Identification Number (ASIN) of the item. */
        Asin: string;
        /** @description A list of error responses returned when a request is unsuccessful. */
        ErrorList: components["schemas"]["Error"][];
        /** @description Error response returned when the request is unsuccessful. */
        Error: {
            /** @description An error code that identifies the type of error that occurred. */
            code: string;
            /** @description A message that describes the error condition. */
            message: string;
            /** @description Additional information that can help the caller understand or fix the issue. */
            details?: string;
        };
    };
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
    getFeaturedOfferExpectedPriceBatch: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["GetFeaturedOfferExpectedPriceBatchRequest"];
            };
        };
        responses: {
            /** @description Success. */
            200: {
                headers: {
                    /** @description Unique request reference identifier. */
                    "x-amzn-RequestId"?: string;
                    /** @description Your rate limit (requests per second) for this operation. */
                    "x-amzn-RateLimit-Limit"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["GetFeaturedOfferExpectedPriceBatchResponse"];
                };
            };
            /** @description Request has missing or invalid parameters and cannot be parsed. */
            400: {
                headers: {
                    /** @description Unique request reference identifier. */
                    "x-amzn-RequestId"?: string;
                    /** @description Your rate limit (requests per second) for this operation. */
                    "x-amzn-RateLimit-Limit"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Errors"];
                };
            };
            /** @description The request's Authorization header is not formatted correctly or does not contain a valid token. */
            401: {
                headers: {
                    /** @description Unique request reference identifier. */
                    "x-amzn-RequestId"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Errors"];
                };
            };
            /** @description Indicates access to the resource is forbidden. Possible reasons include Access Denied, Unauthorized, Expired Token, or Invalid Signature. */
            403: {
                headers: {
                    /** @description Unique request reference identifier. */
                    "x-amzn-RequestId"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Errors"];
                };
            };
            /** @description The specified resource does not exist. */
            404: {
                headers: {
                    /** @description Unique request reference identifier. */
                    "x-amzn-RequestId"?: string;
                    /** @description Your rate limit (requests per second) for this operation. */
                    "x-amzn-RateLimit-Limit"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Errors"];
                };
            };
            /** @description The frequency of requests was greater than allowed. */
            429: {
                headers: {
                    /** @description Unique request reference identifier. */
                    "x-amzn-RequestId"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Errors"];
                };
            };
            /** @description An unexpected condition occurred that prevented the server from fulfilling the request. */
            500: {
                headers: {
                    /** @description Unique request reference identifier. */
                    "x-amzn-RequestId"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Errors"];
                };
            };
            /** @description Temporary overloading or maintenance of the server. */
            503: {
                headers: {
                    /** @description Unique request reference identifier. */
                    "x-amzn-RequestId"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Errors"];
                };
            };
        };
    };
}