/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
    "/sellers/v1/marketplaceParticipations": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Returns a list of marketplaces that the seller submitting the request can sell in and information about the seller's participation in those marketplaces.
         *
         *     **Usage Plan:**
         *
         *     | Rate (requests per second) | Burst |
         *     | ---- | ---- |
         *     | 0.016 | 15 |
         *
         *     The `x-amzn-RateLimit-Limit` response header returns the usage plan rate limits that were applied to the requested operation, when available. The table above indicates the default rate and burst values for this operation. Selling partners whose business demands require higher throughput may see higher rate and burst values than those shown here. For more information, see [Usage Plans and Rate Limits in the Selling Partner API](https://developer-docs.amazon.com/sp-api/docs/usage-plans-and-rate-limits-in-the-sp-api). */
        get: operations["getMarketplaceParticipations"];
        put?: never;
        post?: never;
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
        /** @description Error response returned when the request is unsuccessful. */
        Error: {
            /** @description An error code that identifies the type of error that occured. */
            code: string;
            /** @description A message that describes the error condition in a human-readable form. */
            message: string;
            /** @description Additional details that can help the caller understand or fix the issue. */
            details?: string;
        };
        /** @description A list of error responses returned when a request is unsuccessful. */
        ErrorList: components["schemas"]["Error"][];
        MarketplaceParticipation: {
            marketplace: components["schemas"]["Marketplace"];
            participation: components["schemas"]["Participation"];
        };
        /** @description List of marketplace participations. */
        MarketplaceParticipationList: components["schemas"]["MarketplaceParticipation"][];
        /** @description The response schema for the getMarketplaceParticipations operation. */
        GetMarketplaceParticipationsResponse: {
            payload?: components["schemas"]["MarketplaceParticipationList"];
            errors?: components["schemas"]["ErrorList"];
        };
        /** @description Detailed information about an Amazon market where a seller can list items for sale and customers can view and purchase items. */
        Marketplace: {
            /** @description The encrypted marketplace value. */
            id: string;
            /** @description Marketplace name. */
            name: string;
            /** @description The ISO 3166-1 alpha-2 format country code of the marketplace. */
            countryCode: string;
            /** @description The ISO 4217 format currency code of the marketplace. */
            defaultCurrencyCode: string;
            /** @description The ISO 639-1 format language code of the marketplace. */
            defaultLanguageCode: string;
            /** @description The domain name of the marketplace. */
            domainName: string;
        };
        /** @description Detailed information that is specific to a seller in a Marketplace. */
        Participation: {
            isParticipating: boolean;
            /** @description Specifies if the seller has suspended listings. True if the seller Listing Status is set to Inactive, otherwise False. */
            hasSuspendedListings: boolean;
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
    getMarketplaceParticipations: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Marketplace participations successfully retrieved. */
            200: {
                headers: {
                    /** @description unique request reference id. */
                    "x-amzn-RequestId"?: string;
                    /** @description Your rate limit (requests per second) for this operation. */
                    "x-amzn-RateLimit-Limit"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["GetMarketplaceParticipationsResponse"];
                    payload: unknown;
                };
            };
            /** @description Request has missing or invalid parameters and cannot be parsed. */
            400: {
                headers: {
                    /** @description Unique request reference id. */
                    "x-amzn-RequestId"?: string;
                    /** @description Your rate limit (requests per second) for this operation. */
                    "x-amzn-RateLimit-Limit"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["GetMarketplaceParticipationsResponse"];
                };
            };
            /** @description 403 can be caused for reasons like Access Denied, Unauthorized, Expired Token, Invalid Signature or Resource Not Found. */
            403: {
                headers: {
                    /** @description Unique request reference id. */
                    "x-amzn-RequestId"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["GetMarketplaceParticipationsResponse"];
                };
            };
            /** @description The resource specified does not exist. */
            404: {
                headers: {
                    /** @description Unique request reference id. */
                    "x-amzn-RequestId"?: string;
                    /** @description Your rate limit (requests per second) for this operation. */
                    "x-amzn-RateLimit-Limit"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["GetMarketplaceParticipationsResponse"];
                };
            };
            /** @description The request size exceeded the maximum accepted size. */
            413: {
                headers: {
                    /** @description Unique request reference id. */
                    "x-amzn-RequestId"?: string;
                    /** @description Your rate limit (requests per second) for this operation.
                     *     _Note:_ For this status code, the rate limit header is deprecated and no longer returned. */
                    "x-amzn-RateLimit-Limit"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["GetMarketplaceParticipationsResponse"];
                };
            };
            /** @description The entity of the request is in a format not supported by the requested resource. */
            415: {
                headers: {
                    /** @description Unique request reference id. */
                    "x-amzn-RequestId"?: string;
                    /** @description Your rate limit (requests per second) for this operation.
                     *     _Note:_ For this status code, the rate limit header is deprecated and no longer returned. */
                    "x-amzn-RateLimit-Limit"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["GetMarketplaceParticipationsResponse"];
                };
            };
            /** @description The frequency of requests was greater than allowed. */
            429: {
                headers: {
                    /** @description Unique request reference id. */
                    "x-amzn-RequestId"?: string;
                    /** @description Your rate limit (requests per second) for this operation.
                     *     _Note:_ For this status code, the rate limit header is deprecated and no longer returned. */
                    "x-amzn-RateLimit-Limit"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["GetMarketplaceParticipationsResponse"];
                };
            };
            /** @description Encountered an unexpected condition which prevented the server from fulfilling the request. */
            500: {
                headers: {
                    /** @description Unique request reference id. */
                    "x-amzn-RequestId"?: string;
                    /** @description Your rate limit (requests per second) for this operation.
                     *     _Note:_ For this status code, the rate limit header is deprecated and no longer returned. */
                    "x-amzn-RateLimit-Limit"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["GetMarketplaceParticipationsResponse"];
                };
            };
            /** @description Temporary overloading or maintenance of the server. */
            503: {
                headers: {
                    /** @description Unique request reference id. */
                    "x-amzn-RequestId"?: string;
                    /** @description Your rate limit (requests per second) for this operation.
                     *     _Note:_ For this status code, the rate limit header is deprecated and no longer returned. */
                    "x-amzn-RateLimit-Limit"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["GetMarketplaceParticipationsResponse"];
                };
            };
        };
    };
}
