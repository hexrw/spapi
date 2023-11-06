/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
    "/products/fees/v0/listings/{SellerSKU}/feesEstimate": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** @description Returns the estimated fees for the item indicated by the specified seller SKU in the marketplace specified in the request body.
         *
         *     **Note:** The parameters associated with this operation may contain special characters that require URL encoding to call the API. To avoid errors with SKUs when encoding URLs, refer to [URL Encoding](https://developer-docs.amazon.com/sp-api/docs/url-encoding).
         *
         *     You can call `getMyFeesEstimateForSKU` for an item on behalf of a selling partner before the selling partner sets the item's price. The selling partner can then take any estimated fees into account. Each fees estimate request must include an original identifier. This identifier is included in the fees estimate so that you can correlate a fees estimate with the original request.
         *
         *     **Note:** This identifier value is used to identify an estimate. Actual costs may vary. Search "fees" in [Seller Central](https://sellercentral.amazon.com/) and consult the store-specific fee schedule for the most up-to-date information.
         *
         *     **Usage Plan:**
         *
         *     | Rate (requests per second) | Burst |
         *     | ---- | ---- |
         *     | 1 | 2 |
         *
         *     The `x-amzn-RateLimit-Limit` response header returns the usage plan rate limits that were applied to the requested operation, when available. The table above indicates the default rate and burst values for this operation. Selling partners whose business demands require higher throughput may see higher rate and burst values than those shown here. For more information, see [Usage Plans and Rate Limits in the Selling Partner API](doc:usage-plans-and-rate-limits-in-the-sp-api). */
        post: operations["getMyFeesEstimateForSKU"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/products/fees/v0/items/{Asin}/feesEstimate": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** @description Returns the estimated fees for the item indicated by the specified ASIN in the marketplace specified in the request body.
         *
         *     You can call `getMyFeesEstimateForASIN` for an item on behalf of a selling partner before the selling partner sets the item's price. The selling partner can then take estimated fees into account. Each fees request must include an original identifier. This identifier is included in the fees estimate so you can correlate a fees estimate with the original request.
         *
         *     **Note:** This identifier value is used to identify an estimate. Actual costs may vary. Search "fees" in [Seller Central](https://sellercentral.amazon.com/) and consult the store-specific fee schedule for the most up-to-date information.
         *
         *     **Usage Plan:**
         *
         *     | Rate (requests per second) | Burst |
         *     | ---- | ---- |
         *     | 1 | 2 |
         *
         *     The `x-amzn-RateLimit-Limit` response header returns the usage plan rate limits that were applied to the requested operation, when available. The table above indicates the default rate and burst values for this operation. Selling partners whose business demands require higher throughput may see higher rate and burst values than those shown here. For more information, see [Usage Plans and Rate Limits in the Selling Partner API](doc:usage-plans-and-rate-limits-in-the-sp-api). */
        post: operations["getMyFeesEstimateForASIN"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/products/fees/v0/feesEstimate": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** @description Returns the estimated fees for a list of products.
         *
         *     **Usage Plan:**
         *
         *     | Rate (requests per second) | Burst |
         *     | ---- | ---- |
         *     | 0.5 | 1 |
         *
         *     The `x-amzn-RateLimit-Limit` response header returns the usage plan rate limits that were applied to the requested operation, when available. The table above indicates the default rate and burst values for this operation. Selling partners whose business demands require higher throughput may see higher rate and burst values than those shown here. For more information, see [Usage Plans and Rate Limits in the Selling Partner API](doc:usage-plans-and-rate-limits-in-the-sp-api). */
        post: operations["getMyFeesEstimates"];
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
        /** @description Request schema. */
        GetMyFeesEstimateRequest: {
            FeesEstimateRequest?: components["schemas"]["FeesEstimateRequest"];
        };
        /** @description Request for estimated fees for a list of products. */
        GetMyFeesEstimatesRequest: components["schemas"]["FeesEstimateByIdRequest"][];
        /** @description A product, marketplace, and proposed price used to request estimated fees. */
        FeesEstimateByIdRequest: {
            FeesEstimateRequest?: components["schemas"]["FeesEstimateRequest"];
            IdType: components["schemas"]["IdType"];
            /** @description The item identifier. */
            IdValue: string;
        };
        /** @description A product, marketplace, and proposed price used to request estimated fees. */
        FeesEstimateRequest: {
            /** @description A marketplace identifier. */
            MarketplaceId: string;
            /** @description When true, the offer is fulfilled by Amazon. */
            IsAmazonFulfilled?: boolean;
            PriceToEstimateFees: components["schemas"]["PriceToEstimateFees"];
            /** @description A unique identifier provided by the caller to track this request. */
            Identifier: string;
            OptionalFulfillmentProgram?: components["schemas"]["OptionalFulfillmentProgram"];
        };
        GetMyFeesEstimateResponse: {
            payload?: components["schemas"]["GetMyFeesEstimateResult"];
            errors?: components["schemas"]["ErrorList"];
        };
        /** @description Response schema. */
        GetMyFeesEstimateResult: {
            FeesEstimateResult?: components["schemas"]["FeesEstimateResult"];
        };
        /** @description Estimated fees for a list of products. */
        GetMyFeesEstimatesResponse: components["schemas"]["FeesEstimateResult"][];
        Points: {
            /** Format: int32 */
            PointsNumber?: number;
            PointsMonetaryValue?: components["schemas"]["MoneyType"];
        };
        /** @description A list of error responses returned when a request is unsuccessful. */
        GetMyFeesEstimatesErrorList: {
            errors: components["schemas"]["Error"][];
        };
        /** @description A list of error responses returned when a request is unsuccessful. */
        ErrorList: components["schemas"]["Error"][];
        Error: {
            /** @description An error code that identifies the type of error that occurred. */
            code: string;
            /** @description A message that describes the error condition. */
            message: string;
            /** @description Additional information that can help the caller understand or fix the issue. */
            details?: string;
        };
        /** @description An item identifier and the estimated fees for the item. */
        FeesEstimateResult: {
            /** @description The status of the fee request. Possible values: Success, ClientError, ServiceError. */
            Status?: string;
            FeesEstimateIdentifier?: components["schemas"]["FeesEstimateIdentifier"];
            FeesEstimate?: components["schemas"]["FeesEstimate"];
            Error?: components["schemas"]["FeesEstimateError"];
        };
        /** @description An item identifier, marketplace, time of request, and other details that identify an estimate. */
        FeesEstimateIdentifier: {
            /** @description A marketplace identifier. */
            MarketplaceId?: string;
            /** @description The seller identifier. */
            SellerId?: string;
            IdType?: components["schemas"]["IdType"];
            /** @description The item identifier. */
            IdValue?: string;
            /** @description When true, the offer is fulfilled by Amazon. */
            IsAmazonFulfilled?: boolean;
            PriceToEstimateFees?: components["schemas"]["PriceToEstimateFees"];
            /** @description A unique identifier provided by the caller to track this request. */
            SellerInputIdentifier?: string;
            OptionalFulfillmentProgram?: components["schemas"]["OptionalFulfillmentProgram"];
        };
        /** @description Price information for an item, used to estimate fees. */
        PriceToEstimateFees: {
            ListingPrice: components["schemas"]["MoneyType"];
            Shipping?: components["schemas"]["MoneyType"];
            Points?: components["schemas"]["Points"];
        };
        /** @description The total estimated fees for an item and a list of details. */
        FeesEstimate: {
            /**
             * Format: date-time
             * @description The time at which the fees were estimated. This defaults to the time the request is made.
             */
            TimeOfFeesEstimation: string;
            TotalFeesEstimate?: components["schemas"]["MoneyType"];
            FeeDetailList?: components["schemas"]["FeeDetailList"];
        };
        /** @description A list of other fees that contribute to a given fee. */
        FeeDetailList: components["schemas"]["FeeDetail"][];
        /** @description An unexpected error occurred during this operation. */
        FeesEstimateError: {
            /** @description An error type, identifying either the receiver or the sender as the originator of the error. */
            Type: string;
            /** @description An error code that identifies the type of error that occurred. */
            Code: string;
            /** @description A message that describes the error condition. */
            Message: string;
            Detail: components["schemas"]["FeesEstimateErrorDetail"];
        };
        /** @description Additional information that can help the caller understand or fix the issue. */
        FeesEstimateErrorDetail: Record<string, never>[];
        /** @description The type of fee, fee amount, and other details. */
        FeeDetail: {
            /** @description The type of fee charged to a seller. */
            FeeType: string;
            FeeAmount: components["schemas"]["MoneyType"];
            FeePromotion?: components["schemas"]["MoneyType"];
            TaxAmount?: components["schemas"]["MoneyType"];
            FinalFee: components["schemas"]["MoneyType"];
            IncludedFeeDetailList?: components["schemas"]["IncludedFeeDetailList"];
        };
        /** @description A list of other fees that contribute to a given fee. */
        IncludedFeeDetailList: components["schemas"]["IncludedFeeDetail"][];
        /** @description The type of fee, fee amount, and other details. */
        IncludedFeeDetail: {
            /** @description The type of fee charged to a seller. */
            FeeType: string;
            FeeAmount: components["schemas"]["MoneyType"];
            FeePromotion?: components["schemas"]["MoneyType"];
            TaxAmount?: components["schemas"]["MoneyType"];
            FinalFee: components["schemas"]["MoneyType"];
        };
        MoneyType: {
            /** @description The currency code in ISO 4217 format. */
            CurrencyCode?: string;
            /** @description The monetary value. */
            Amount?: number;
        };
        /**
         * @description An optional enrollment program to return the estimated fees when the offer is fulfilled by Amazon (IsAmazonFulfilled is set to true).
         * @enum {string}
         */
        OptionalFulfillmentProgram: "FBA_CORE" | "FBA_SNL" | "FBA_EFN";
        /**
         * @description The type of product identifier used in a `FeesEstimateByIdRequest`.
         * @enum {string}
         */
        IdType: "ASIN" | "SellerSKU";
    };
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
    getMyFeesEstimateForSKU: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Used to identify an item in the given marketplace. SellerSKU is qualified by the seller's SellerId, which is included with every operation that you submit. */
                SellerSKU: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["GetMyFeesEstimateRequest"];
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
                    "application/json": components["schemas"]["GetMyFeesEstimateResponse"];
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
                    "application/json": components["schemas"]["GetMyFeesEstimateResponse"];
                };
            };
            /** @description The request's Authorization header is not formatted correctly or does not contain a valid token. */
            401: {
                headers: {
                    /** @description Unique request reference identifier. */
                    "x-amzn-RequestId"?: string;
                    /** @description Your rate limit (requests per second) for this operation.
                     *     _Note:_ For this status code, the rate limit header is deprecated and no longer returned. */
                    "x-amzn-RateLimit-Limit"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["GetMyFeesEstimateResponse"];
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
                    "application/json": components["schemas"]["GetMyFeesEstimateResponse"];
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
                    "application/json": components["schemas"]["GetMyFeesEstimateResponse"];
                };
            };
            /** @description The frequency of requests was greater than allowed. */
            429: {
                headers: {
                    /** @description Unique request reference identifier. */
                    "x-amzn-RequestId"?: string;
                    /** @description Your rate limit (requests per second) for this operation.
                     *     _Note:_ For this status code, the rate limit header is deprecated and no longer returned. */
                    "x-amzn-RateLimit-Limit"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["GetMyFeesEstimateResponse"];
                };
            };
            /** @description An unexpected condition occurred that prevented the server from fulfilling the request. */
            500: {
                headers: {
                    /** @description Unique request reference identifier. */
                    "x-amzn-RequestId"?: string;
                    /** @description Your rate limit (requests per second) for this operation.
                     *     _Note:_ For this status code, the rate limit header is deprecated and no longer returned. */
                    "x-amzn-RateLimit-Limit"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["GetMyFeesEstimateResponse"];
                };
            };
            /** @description Temporary overloading or maintenance of the server. */
            503: {
                headers: {
                    /** @description Unique request reference identifier. */
                    "x-amzn-RequestId"?: string;
                    /** @description Your rate limit (requests per second) for this operation.
                     *     _Note:_ For this status code, the rate limit header is deprecated and no longer returned. */
                    "x-amzn-RateLimit-Limit"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["GetMyFeesEstimateResponse"];
                };
            };
        };
    };
    getMyFeesEstimateForASIN: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description The Amazon Standard Identification Number (ASIN) of the item. */
                Asin: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["GetMyFeesEstimateRequest"];
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
                    "application/json": components["schemas"]["GetMyFeesEstimateResponse"];
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
                    "application/json": components["schemas"]["GetMyFeesEstimateResponse"];
                };
            };
            /** @description The request's Authorization header is not formatted correctly or does not contain a valid token. */
            401: {
                headers: {
                    /** @description Unique request reference identifier. */
                    "x-amzn-RequestId"?: string;
                    /** @description Your rate limit (requests per second) for this operation.
                     *     _Note:_ For this status code, the rate limit header is deprecated and no longer returned. */
                    "x-amzn-RateLimit-Limit"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["GetMyFeesEstimateResponse"];
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
                    "application/json": components["schemas"]["GetMyFeesEstimateResponse"];
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
                    "application/json": components["schemas"]["GetMyFeesEstimateResponse"];
                };
            };
            /** @description The frequency of requests was greater than allowed. */
            429: {
                headers: {
                    /** @description Unique request reference identifier. */
                    "x-amzn-RequestId"?: string;
                    /** @description Your rate limit (requests per second) for this operation.
                     *     _Note:_ For this status code, the rate limit header is deprecated and no longer returned. */
                    "x-amzn-RateLimit-Limit"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["GetMyFeesEstimateResponse"];
                };
            };
            /** @description An unexpected condition occurred that prevented the server from fulfilling the request. */
            500: {
                headers: {
                    /** @description Unique request reference identifier. */
                    "x-amzn-RequestId"?: string;
                    /** @description Your rate limit (requests per second) for this operation.
                     *     _Note:_ For this status code, the rate limit header is deprecated and no longer returned. */
                    "x-amzn-RateLimit-Limit"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["GetMyFeesEstimateResponse"];
                };
            };
            /** @description Temporary overloading or maintenance of the server. */
            503: {
                headers: {
                    /** @description Unique request reference identifier. */
                    "x-amzn-RequestId"?: string;
                    /** @description Your rate limit (requests per second) for this operation.
                     *     _Note:_ For this status code, the rate limit header is deprecated and no longer returned. */
                    "x-amzn-RateLimit-Limit"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["GetMyFeesEstimateResponse"];
                };
            };
        };
    };
    getMyFeesEstimates: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["GetMyFeesEstimatesRequest"];
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
                    "application/json": components["schemas"]["GetMyFeesEstimatesResponse"];
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
                    "application/json": components["schemas"]["GetMyFeesEstimatesErrorList"];
                };
            };
            /** @description The request's Authorization header is not formatted correctly or does not contain a valid token. */
            401: {
                headers: {
                    /** @description Unique request reference identifier. */
                    "x-amzn-RequestId"?: string;
                    /** @description Your rate limit (requests per second) for this operation.
                     *     _Note:_ For this status code, the rate limit header is deprecated and no longer returned. */
                    "x-amzn-RateLimit-Limit"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["GetMyFeesEstimatesErrorList"];
                };
            };
            /** @description Indicates access to the resource is forbidden. Possible reasons include **Access Denied**, **Unauthorized**, **Expired Token**, or **Invalid Signature**. */
            403: {
                headers: {
                    /** @description Unique request reference identifier. */
                    "x-amzn-RequestId"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["GetMyFeesEstimatesErrorList"];
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
                    "application/json": components["schemas"]["GetMyFeesEstimatesErrorList"];
                };
            };
            /** @description The frequency of requests was greater than allowed. */
            429: {
                headers: {
                    /** @description Unique request reference identifier. */
                    "x-amzn-RequestId"?: string;
                    /** @description Your rate limit (requests per second) for this operation.
                     *     _Note:_ For this status code, the rate limit header is deprecated and no longer returned. */
                    "x-amzn-RateLimit-Limit"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["GetMyFeesEstimatesErrorList"];
                };
            };
            /** @description An unexpected condition occurred that prevented the server from fulfilling the request. */
            500: {
                headers: {
                    /** @description Unique request reference identifier. */
                    "x-amzn-RequestId"?: string;
                    /** @description Your rate limit (requests per second) for this operation.
                     *     _Note:_ For this status code, the rate limit header is deprecated and no longer returned. */
                    "x-amzn-RateLimit-Limit"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["GetMyFeesEstimatesErrorList"];
                };
            };
            /** @description Temporary overloading or maintenance of the server. */
            503: {
                headers: {
                    /** @description Unique request reference identifier. */
                    "x-amzn-RequestId"?: string;
                    /** @description Your rate limit (requests per second) for this operation.
                     *     _Note:_ For this status code, the rate limit header is deprecated and no longer returned. */
                    "x-amzn-RateLimit-Limit"?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["GetMyFeesEstimatesErrorList"];
                };
            };
        };
    };
}