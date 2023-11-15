import type {
    ErrorResponse,
    FilterKeys,
    HasRequiredKeys,
    MediaType,
    OperationRequestBodyContent,
    PathsWithMethod,
    ResponseObjectMap,
    SuccessResponse,
} from "openapi-typescript-helpers"

import config from "./config"
import { ofetch } from "ofetch"

/**
 * NOTE: Though "any" is considered bad practice in general, this library relies
 * NOTE: on "any" for type inference only it can give. Same goes for the "{}" type.
 **/
/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types */

/** Options for each client instance */
export interface ClientOptions extends Omit<RequestInit, "headers"> {
    region: "eu" | "fe" | "na"
    sandbox?: boolean
    headers?: HeadersOptions
}

export type HeadersOptions =
    | HeadersInit
    | Record<string, string | number | boolean | null | undefined>

export interface DefaultParamsOption {
    params?: {
        query?: Record<string, unknown>
    }
}

export type ParamsOption<T> = T extends {
    parameters: any
}
    ? HasRequiredKeys<T["parameters"]> extends never
        ? { params?: T["parameters"] }
        : { params: T["parameters"] }
    : DefaultParamsOption

export type RequestBodyOption<T> = OperationRequestBodyContent<T> extends never
    ? { body?: never }
    : undefined extends OperationRequestBodyContent<T>
        ? { body?: OperationRequestBodyContent<T> }
        : { body: OperationRequestBodyContent<T> }

export type FetchOptions<T> = RequestOptions<T> & Omit<RequestInit, "body">

export type FetchResponse<T> =
    | {
        data: FilterKeys<SuccessResponse<ResponseObjectMap<T>>, MediaType>
        error?: never
        response: Response
    } | {
        data?: never
        error: FilterKeys<ErrorResponse<ResponseObjectMap<T>>, MediaType>
        response: Response
    }

export type RequestOptions<T> = ParamsOption<T> & RequestBodyOption<T>

const regions = {
    na: {
        endpoint: "https://sellingpartnerapi-na.amazon.com",
        sandboxEndpoint: "https://sandbox.sellingpartnerapi-na.amazon.com",
    },
    eu: {
        endpoint: "https://sellingpartnerapi-eu.amazon.com",
        sandboxEndpoint: "https://sandbox.sellingpartnerapi-eu.amazon.com",
    },
    fe: {
        endpoint: "https://sellingpartnerapi-fe.amazon.com",
        sandboxEndpoint: "https://sandbox.sellingpartnerapi-fe.amazon.com",
    },
}

/**
 * Create an OpenAPI-spec-based fully typed client for the Amazon
 * Selling Partner API.
 */
export default class SpapiClient<Paths extends {}> {
    private readonly baseUrl: string
    private readonly clientId: string
    private readonly clientSecret: string
    private readonly refreshToken: string
    private readonly headers: HeadersOptions = {}
    private accessToken: {
        value: string | undefined
        expiresAt: Date | undefined
    } = {} as any

    constructor(clientOptions: {
        region: "eu" | "fe" | "na"
        sandbox?: boolean
        headers?: HeadersOptions
        clientId: string
        clientSecret: string
        refreshToken: string
    }) {
        this.clientId = clientOptions.clientId
        this.clientSecret = clientOptions.clientSecret
        this.refreshToken = clientOptions.refreshToken
        this.baseUrl = clientOptions?.sandbox
            ? regions[clientOptions.region].sandboxEndpoint
            : regions[clientOptions.region].endpoint
        this.headers = clientOptions?.headers || {}
    }

    /**
     * Retrieve an access token from the refresh token
     */
    private async refreshAccessToken() {
        console.debug("[spapi] [Auth] Refreshing access token")
        const date = new Date()

        const { access_token, expires_in } = await ofetch(config.authTokenEndpoint, {
            method: "POST",
            query: {
                grant_type: "refresh_token", refresh_token: this.refreshToken,
                client_id: this.clientId, client_secret: this.clientSecret,
            } })

        date.setSeconds(date.getSeconds() + expires_in)  // add seconds to start time to get expiration time

        console.debug(
            `[spapi] [Auth] New access token: ${truncToken(access_token)}, expires at ${date.toISOString()}`,
        )
        return { accessToken: access_token, accessTokenExpiresAt: date }
    }

    /**
     * Get the access token, refreshing it if necessary
     */
    private async getAccessToken() {
        // if we don't have an access token or it's expired, refresh it
        if (
            !this.accessToken ||
            !this.accessToken.value ||
            !this.accessToken.expiresAt ||
            this.accessToken.expiresAt < new Date()
        ) {
            const {
                accessToken,
                accessTokenExpiresAt,
            } = await this.refreshAccessToken()

            this.accessToken = {
                value: accessToken,
                expiresAt: accessTokenExpiresAt,
            }
        } else console.debug(`[spapi] [Auth] Reusing cached access token ${truncToken(this.accessToken.value)}`)

        return this.accessToken.value
    }

    /**
     * Per-request fetch logic
     * @param {string} url
     */
    private async coreFetch(url, fetchOptions) {
        const accessToken = await this.getAccessToken()

        const {
            headers,
            body: requestBody,
            params = {},
            ...init
        } = fetchOptions || {}

        const authHeaders = new Headers({ "x-amz-access-token": accessToken })

        // URL
        const finalURL = buildUrl(url, {
            baseUrl: this.baseUrl,
            params,
        })
        const finalHeaders = mergeHeaders(
            this.headers,
            headers,
            params.header,
            authHeaders,
        )

        // fetch!
        const requestInit = {
            redirect: "follow",
            ...init,
            headers: finalHeaders,
        }

        // TODO: Refactor
        requestInit.query = requestInit["0"].params.query
        if (requestBody) requestInit.body = requestBody

        console.debug(`[spapi] [Fetch] Init ${requestInit.method} ${finalURL}`)

        const response = await ofetch(finalURL, requestInit)
            .then(res => {
                console.info(`[spapi] [Fetch] ${requestInit.method} ${finalURL} OK`)
                return res
            })
            .catch(err => {
                console.error(`[spapi] [Fetch] ${requestInit.method} ${finalURL} FAILED`)
                console.error(err.data)
            })
        console.debug(response)
        return response
    }

    /** Call a GET endpoint */
    async get<P extends PathsWithMethod<Paths, "get">>(
        url: P,
        ...init: HasRequiredKeys<
            FetchOptions<FilterKeys<Paths[P], "get">>
        > extends never
            ? [(FetchOptions<FilterKeys<Paths[P], "get">> | undefined)?]
            : [FetchOptions<FilterKeys<Paths[P], "get">>]
    ): Promise<
        FetchResponse<
            "get" extends infer T
            ? T extends "get"
            ? T extends keyof Paths[P]
            ? Paths[P][T]
            : unknown
            : never
            : never
        >
    > {
        return this.coreFetch(url, { ...init, method: "GET" })
    }
    /** Call a PUT endpoint */
    async put<P extends PathsWithMethod<Paths, "put">>(
        url: P,
        ...init: HasRequiredKeys<
            FetchOptions<FilterKeys<Paths[P], "put">>
        > extends never
            ? [(FetchOptions<FilterKeys<Paths[P], "put">> | undefined)?]
            : [FetchOptions<FilterKeys<Paths[P], "put">>]
    ): Promise<
        FetchResponse<
            "put" extends infer T
            ? T extends "put"
            ? T extends keyof Paths[P]
            ? Paths[P][T]
            : unknown
            : never
            : never
        >
    > {
        return this.coreFetch(url, { ...init, method: "PUT" })
    }
    /** Call a POST endpoint */
    async post<P extends PathsWithMethod<Paths, "post">>(
        url: P,
        ...init: HasRequiredKeys<
            FetchOptions<FilterKeys<Paths[P], "post">>
        > extends never
            ? [(FetchOptions<FilterKeys<Paths[P], "post">> | undefined)?]
            : [FetchOptions<FilterKeys<Paths[P], "post">>]
    ): Promise<
        FetchResponse<
            "post" extends infer T
            ? T extends "post"
            ? T extends keyof Paths[P]
            ? Paths[P][T]
            : unknown
            : never
            : never
        >
    > {
        return this.coreFetch(url, { ...init, method: "POST" })
    }
    /** Call a DELETE endpoint */
    async delete<P extends PathsWithMethod<Paths, "delete">>(
        url: P,
        ...init: HasRequiredKeys<
            FetchOptions<FilterKeys<Paths[P], "delete">>
        > extends never
            ? [(FetchOptions<FilterKeys<Paths[P], "delete">> | undefined)?]
            : [FetchOptions<FilterKeys<Paths[P], "delete">>]
    ): Promise<
        FetchResponse<
            "delete" extends infer T
            ? T extends "delete"
            ? T extends keyof Paths[P]
            ? Paths[P][T]
            : unknown
            : never
            : never
        >
    > {
        return this.coreFetch(url, { ...init, method: "DELETE" })
    }
    /** Call a OPTIONS endpoint */
    async options<P extends PathsWithMethod<Paths, "options">>(
        url: P,
        ...init: HasRequiredKeys<
            FetchOptions<FilterKeys<Paths[P], "options">>
        > extends never
            ? [(FetchOptions<FilterKeys<Paths[P], "options">> | undefined)?]
            : [FetchOptions<FilterKeys<Paths[P], "options">>]
    ): Promise<
        FetchResponse<
            "options" extends infer T
            ? T extends "options"
            ? T extends keyof Paths[P]
            ? Paths[P][T]
            : unknown
            : never
            : never
        >
    > {
        return this.coreFetch(url, { ...init, method: "OPTIONS" })
    }
    /** Call a HEAD endpoint */
    async head<P extends PathsWithMethod<Paths, "head">>(
        url: P,
        ...init: HasRequiredKeys<
            FetchOptions<FilterKeys<Paths[P], "head">>
        > extends never
            ? [(FetchOptions<FilterKeys<Paths[P], "head">> | undefined)?]
            : [FetchOptions<FilterKeys<Paths[P], "head">>]
    ): Promise<
        FetchResponse<
            "head" extends infer T
            ? T extends "head"
            ? T extends keyof Paths[P]
            ? Paths[P][T]
            : unknown
            : never
            : never
        >
    > {
        return this.coreFetch(url, { ...init, method: "HEAD" })
    }
    /** Call a PATCH endpoint */
    async patch<P extends PathsWithMethod<Paths, "patch">>(
        url: P,
        ...init: HasRequiredKeys<
            FetchOptions<FilterKeys<Paths[P], "patch">>
        > extends never
            ? [(FetchOptions<FilterKeys<Paths[P], "patch">> | undefined)?]
            : [FetchOptions<FilterKeys<Paths[P], "patch">>]
    ): Promise<
        FetchResponse<
            "patch" extends infer T
            ? T extends "patch"
            ? T extends keyof Paths[P]
            ? Paths[P][T]
            : unknown
            : never
            : never
        >
    > {
        return this.coreFetch(url, { ...init, method: "PATCH" })
    }
    /** Call a TRACE endpoint */
    async trace<P extends PathsWithMethod<Paths, "trace">>(
        url: P,
        ...init: HasRequiredKeys<
            FetchOptions<FilterKeys<Paths[P], "trace">>
        > extends never
            ? [(FetchOptions<FilterKeys<Paths[P], "trace">> | undefined)?]
            : [FetchOptions<FilterKeys<Paths[P], "trace">>]
    ): Promise<
        FetchResponse<
            "trace" extends infer T
            ? T extends "trace"
            ? T extends keyof Paths[P]
            ? Paths[P][T]
            : unknown
            : never
            : never
        >
    > {
        return this.coreFetch(url, { ...init, method: "TRACE" })
    }
}

/**
 * Construct URL string from baseUrl and handle path and query params
 */
export function buildUrl<O>(
    pathname: string,
    options: {
        baseUrl: string
        params: {
            query?: Record<string, unknown>
            path?: Record<string, unknown>
        }
    },
): string {
    console.log(`Building final URL from ${options.baseUrl} and ${pathname}`, options.params)
    let finalURL = `${options.baseUrl}${pathname}`
    if (options.params.path) {
        // @ts-expect-error
        for (const [k, v] of Object.entries(options.params.path)) {
            finalURL = finalURL.replace(`{${k}}`, encodeURIComponent(String(v)))
        }
    }
    return finalURL
}

/**
 * Merge headers a and b, with b taking priority
 */
export function mergeHeaders(
    ...allHeaders: (HeadersOptions | undefined)[]
): Headers {
    const headers = new Headers()
    for (const headerSet of allHeaders) {
        if (!headerSet || typeof headerSet !== "object") {
            continue
        }
        const iterator =
            headerSet instanceof Headers
                ? headerSet.entries()
                // @ts-expect-error
                : Object.entries(headerSet)
        for (const [k, v] of iterator) {
            if (v === null) {
                headers.delete(k)
            } else if (v !== undefined) {
                headers.set(k, v)
            }
        }
    }
    return headers
}

const truncToken = (str: string) => `${str.slice(0, 15)}...${str.slice(-10)}`
