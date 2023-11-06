import type {
    Region, RegionCode, ApiEndpoint, ApiRequestOptions,
    ListingsItemQueryParams, ListingItemPutRequest,
    OrdersGetOrdersQueryParams,
} from "../types"
import { ofetch } from "ofetch"
import { regions, endpoints, authTokenEndpoint, schemas } from "../api"
import config from "../config"


interface ApiClientOptions {
    region?: RegionCode  // region code (e.g. "na") but labeled "region" for simplicity ease of use in constructor
    sandbox?: boolean
    clientId: string
    clientSecret: string
    refreshToken: string
}

/**
 * Represents an API client that can make requests to the Selling Partner API.
 */
export default class SellingPartnerApiClient {
    region: Region
    sandbox: boolean = false
    clientId: string
    clientSecret: string
    refreshToken: string
    _accessToken: string
    _accessTokenType: string = "bearer"
    _accessTokenExpiresAt: Date

    /**
     * Creates a new instance of the ApiClient class.
     * @param opts - The options to use when creating the client.
     */
    constructor(opts: ApiClientOptions) {
        const { region: regionCode, sandbox, clientId, clientSecret, refreshToken } = opts
        if (regionCode) this.region = regions.get(regionCode.toLowerCase() as RegionCode)  // toLowerCase() to handle case-insensitive input
        if (sandbox) this.sandbox = sandbox
        if (clientId) this.clientId = clientId
        if (clientSecret) this.clientSecret = clientSecret
        if (refreshToken) this.refreshToken = refreshToken

        if (!this.region) throw new Error(`Region '${regionCode}' not found.`)
        if (!this.clientId) throw new Error(`Missing client ID.`)
        if (!this.clientSecret) throw new Error(`Missing client secret.`)
        if (!this.refreshToken) throw new Error(`Missing refresh token.`)
    }

    private async _getAccessToken () {
        const startTime = new Date()

        const json = await ofetch(authTokenEndpoint, {
            method: "POST",
            responseType: "json",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
            },
            body: new URLSearchParams({
                grant_type: "refresh_token",
                client_id: this.clientId,
                client_secret: this.clientSecret,
                refresh_token: this.refreshToken,
            }),
        })

        schemas.AuthTokenResponse.parse(json)  // throws an error if the response is invalid

        const { access_token, token_type, expires_in } = json
        this._accessToken = access_token
        this._accessTokenType = token_type
        startTime.setSeconds(startTime.getSeconds() + expires_in)  // add seconds to start time to get expiration time
        this._accessTokenExpiresAt = startTime  // set expiration time
    }

    async call(
        endpoint: ApiEndpoint,
        opts: ApiRequestOptions & { version: string, path: string, query?: Record<string, string> }
    ) {
        if (!this._accessToken || new Date() > this._accessTokenExpiresAt)
            await this._getAccessToken()

        const { method, path } = opts
        const query = opts?.query ? opts.query : {}  // default to empty object
        const headers = opts?.headers ? opts.headers : {}  // default to empty object
        const body = opts?.body ? opts.body : undefined  // default to undefined (no body)

        return await ofetch(`${this.region.endpoint}/${endpoint}/${opts.version}/${path}`, {
            method, query,
            headers: {
                "Content-Type": "application/json",
                "User-Agent": `hexrw-spapi/${config.version}; Language=JavaScript; ClientId=${this.clientId};`,
                "x-amz-access-token": this._accessToken,
                ...headers
            },
            body,
        })
    }

    listings = {
        getListingsItem(sellerId: string, sku: string, query: ListingsItemQueryParams, opts?: ApiRequestOptions) {
            return this.call("listings", {
                method: opts?.method ? opts.method : "GET",
                version: opts?.version ? opts.version : "2021-08-01",
                path: `/items/${sellerId}/${sku}`,
                query,
            })
        },
        putListingsItem(sellerId: string, sku: string, body: ListingItemPutRequest, opts?: ApiRequestOptions) {
            return this.call("listings", {
                method: opts?.method ? opts.method : "PUT",
                version: opts?.version ? opts.version : "2021-08-01",
                path: `/items/${sellerId}/${sku}`,
                body,
            })
        }
    }

    orders = {
        getOrders(query: OrdersGetOrdersQueryParams, opts?: ApiRequestOptions) {
            return this.call("orders", {
                method: opts?.method ? opts.method : "GET",
                version: opts?.version ? opts.version : "v0",
                path: `/orders`,
                query,
            })
        },
        getOrder(orderId: string, opts?: ApiRequestOptions) {
            return this.call("orders", {
                method: opts?.method ? opts.method : "GET",
                version: opts?.version ? opts.version : "v0",
                path: `/orders/${orderId}`,
            })
        },
        getOrderBuyerInfo(orderId: string, opts?: ApiRequestOptions) {
            return this.call("orders", {
                method: opts?.method ? opts.method : "GET",
                version: opts?.version ? opts.version : "v0",
                path: `/orders/${orderId}/buyerInfo`,
            })
        },
        getOrderAddress(orderId: string, addressType: "Shipping" | "Billing", opts?: ApiRequestOptions) {
            return this.call("orders", {
                method: opts?.method ? opts.method : "GET",
                version: opts?.version ? opts.version : "v0",
                path: `/orders/${orderId}/addresses/${addressType}`,
            })
        },
        async *getOrderItems(orderId: string, opts?: ApiRequestOptions) {
            let nextToken: string | undefined = undefined
            const getResult = this.call("orders", {
                method: opts?.method ? opts.method : "GET",
                version: opts?.version ? opts.version : "v0",
                path: `/orders/${orderId}/orderItems`,
            })
            do {
                const result = await getResult
                nextToken = result.NextToken
                yield result
            } while (nextToken)
        },
        getOrderRegulatedInfo(orderId: string, opts?: ApiRequestOptions) {
            return this.call("orders", {
                method: opts?.method ? opts.method : "GET",
                version: opts?.version ? opts.version : "v0",
                path: `/orders/${orderId}/regulatedData`,
            })
        },
    }

}

export const createApiClient = (opts: ApiClientOptions) => new SellingPartnerApiClient(opts)
