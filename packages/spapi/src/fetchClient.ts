import type {
    FilterKeys,
    HasRequiredKeys,
    MediaType,
    OperationRequestBodyContent,
    PathsWithMethod,
    ResponseObjectMap,
    SuccessResponse,
} from "openapi-typescript-helpers"

import config from "./config"
import type { FetchOptions as $FetchOptions, $Fetch } from "ofetch"
import { ofetch } from "ofetch"
import { $URL, joinURL } from "ufo"

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

// export type FetchResponse<T> =
//     | {
//         data: FilterKeys<SuccessResponse<ResponseObjectMap<T>>, MediaType>
//         error?: never
//         response: Response
//     } | {
//         data?: never
//         error: FilterKeys<ErrorResponse<ResponseObjectMap<T>>, MediaType>
//         response: Response
//     }

export type FetchResponse<T> = FilterKeys<SuccessResponse<ResponseObjectMap<T>>, MediaType> | never

export type RequestOptions<T> = ParamsOption<T> & RequestBodyOption<T>

const regions = {
    na: {
        endpoint: "https://sellingpartnerapi-na.amazon.com",
        sandboxEndpoint: "https://sandbox.sellingpartnerapi-na.amazon.com",
        authTokenEndpoint: "https://api.amazon.com/auth/o2/token",
    },
    eu: {
        endpoint: "https://sellingpartnerapi-eu.amazon.com",
        sandboxEndpoint: "https://sandbox.sellingpartnerapi-eu.amazon.com",
        authTokenEndpoint: "https://api.amazon.co.uk/auth/o2/token",
    },
    fe: {
        endpoint: "https://sellingpartnerapi-fe.amazon.com",
        sandboxEndpoint: "https://sandbox.sellingpartnerapi-fe.amazon.com",
        authTokenEndpoint: "https://api.amazon.co.jp/auth/o2/token",
    },
}

/**
 * Create an OpenAPI-spec-based fully typed client for the Amazon
 * Selling Partner API.
 */
export default class FetchClient<Paths extends {}> {
    private readonly baseUrl: string
    private readonly clientId: string
    private readonly clientSecret: string
    private readonly refreshToken: string
    private readonly fetch: $Fetch
    private accessToken: {
        value: string | undefined
        expiresAt: Date | undefined
    } = {
            value: undefined,
            expiresAt: undefined,
        }

    constructor(clientOptions: {
        region: "eu" | "fe" | "na"
        sandbox?: boolean
        defaults?: $FetchOptions
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

        const defaults: $FetchOptions = {
            method: "GET",
            redirect: "follow",
            headers: {
                "Content-Type": "application/json",
                "User-Agent": `hexrw/spapi/${config.version} (Language=JavaScript) (ClientId=${this.clientId})`,
            },
        }

        clientOptions?.defaults
            ? this.fetch = ofetch.create({ ...defaults, ...clientOptions.defaults })
            : this.fetch = ofetch.create(defaults)
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
            }
        })

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
     */
    private async coreFetch(path: string | number | symbol, args: any) {
        const accessToken = await this.getAccessToken()

        path = String(path)

        // TODO: Add types
        const opts = args[0] ?? {}

        const authHeaders = new Headers({ "x-amz-access-token": accessToken })

        if (opts?.params?.path)
            for (const [k, v] of Object.entries(opts.params.path))
                path = path.replace(`{${k}}`, encodeURIComponent(String(v)))

        // URL
        const url = new $URL(joinURL(this.baseUrl, path))
        if (opts?.params?.query) url.query = opts.params.query

        const requestOpts: $FetchOptions = {
            onRequestError: (err) => console.error(err),
            onResponseError: (ctx) => console.error(ctx),
            headers: opts?.headers
                ? mergeHeaders(opts.headers, authHeaders)
                : authHeaders,
            retry: 2,
            retryDelay: 3000,
            retryStatusCodes: [ 429 ],
        }
        if (opts?.body) requestOpts.body = opts.body

        console.debug(`[spapi] [Fetch] ${args.method} ${url.toString()}`)

        const res = await this.fetch(url.toString(), requestOpts)
            .then(res => {
                console.info(`[spapi] [Fetch] ${args.method} ${url.toString()} OK`)
                return res
            })
            .catch(err => {
                console.error(`[spapi] [Fetch] ${args.method} ${url.toString()} FAILED`)
                throw err
            })

        return res
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
    > { return this.coreFetch(url, { ...init, method: "GET" }) }

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
    > { return this.coreFetch(url, { ...init, method: "PUT" }) }

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
    > { return this.coreFetch(url, { ...init, method: "POST" }) }

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
    > { return this.coreFetch(url, { ...init, method: "DELETE" }) }

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
    > { return this.coreFetch(url, { ...init, method: "OPTIONS" }) }

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
    > { return this.coreFetch(url, { ...init, method: "HEAD" }) }

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
    > { return this.coreFetch(url, { ...init, method: "PATCH" }) }

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
    > { return this.coreFetch(url, { ...init, method: "TRACE" }) }

}

/**
 * Merge headers a and b, with b taking priority
 */
export function mergeHeaders(
    ...allHeaders: (HeadersOptions | undefined)[]
): Headers {
    const headers = new Headers()
    for (const headerSet of allHeaders) {
        if (!headerSet || typeof headerSet !== "object") continue; // skip empty headers
        const iterator = headerSet instanceof Headers
            // @ts-ignore: TS doesn't know that Headers implements entries() and values()
            ? headerSet.entries()
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
