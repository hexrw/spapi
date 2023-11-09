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
    /** custom fetch (defaults to globalThis.fetch) */
    fetch?: typeof fetch
    /** global querySerializer */
    querySerializer?: QuerySerializer<unknown>
    /** global bodySerializer */
    bodySerializer?: BodySerializer<unknown>
    headers?: HeadersOptions
}

export type HeadersOptions =
    | HeadersInit
    | Record<string, string | number | boolean | null | undefined>

export type QuerySerializer<T> = (
    query: T extends { parameters: any }
        ? NonNullable<T["parameters"]["query"]>
        : Record<string, unknown>,
) => string

export type BodySerializer<T> = (body: OperationRequestBodyContent<T>) => any

export type ParseAs = "json" | "text" | "blob" | "arrayBuffer" | "stream"

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
    }
    | {
        data?: never
        error: FilterKeys<ErrorResponse<ResponseObjectMap<T>>, MediaType>
        response: Response
    }

export type RequestOptions<T> = ParamsOption<T> &
    RequestBodyOption<T> & {
        querySerializer?: QuerySerializer<T>
        bodySerializer?: BodySerializer<T>
        parseAs?: ParseAs
        fetch?: ClientOptions["fetch"]
    }

// settings & const
const defaultHeaders = {
    "Content-Type": "application/json",
}

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
export default function createClient<Paths extends {}>(clientOptions: ClientOptions) {
    const {
        fetch: baseFetch = ofetch,
        querySerializer: globalQuerySerializer,
        bodySerializer: globalBodySerializer,
        ...baseOptions
    } = clientOptions ?? {}

    const baseUrl = clientOptions?.sandbox
        ? regions[clientOptions.region].sandboxEndpoint
        : regions[clientOptions.region].endpoint

    /**
     * Per-request fetch (keeps settings created in createClient()
     * @param {string} url
     */
    async function coreFetch(url, fetchOptions) {
        const {
            fetch = baseFetch,
            headers,
            body: requestBody,
            params = {},
            parseAs = "json",
            querySerializer = globalQuerySerializer ?? defaultQuerySerializer,
            bodySerializer = globalBodySerializer ?? defaultBodySerializer,
            ...init
        } = fetchOptions || {}

        // URL
        const finalURL = createFinalURL(url, {
            baseUrl,
            params,
            querySerializer,
        })
        const finalHeaders = mergeHeaders(
            defaultHeaders,
            clientOptions?.headers,
            headers,
            params.header,
        )

        // fetch!
        const requestInit = {
            redirect: "follow",
            ...baseOptions,
            ...init,
            headers: finalHeaders,
        }

        // TODO: Refactor internal logic, delete these
        // Transformation
        delete requestInit.region
        delete requestInit.sandbox
        requestInit.query = requestInit["0"].params.query

        if (requestBody) {
            requestInit.body = bodySerializer(requestBody)
        }
        // remove `Content-Type` if serialized body is FormData; browser will correctly set Content-Type & boundary expression
        if (requestInit.body instanceof FormData) {
            finalHeaders.delete("Content-Type")
        }
        console.log(`[coreFetch] finalUrl: '${finalURL}'`, requestInit)

        const response = await ofetch(finalURL, requestInit)
            .catch(err => err.data)
        console.log(response)
        console.log(response.raw)
        return response
    }

    return {
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
            return coreFetch(url, { ...init, method: "GET" })
        },
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
            return coreFetch(url, { ...init, method: "PUT" })
        },
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
            return coreFetch(url, { ...init, method: "POST" })
        },
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
            return coreFetch(url, { ...init, method: "DELETE" })
        },
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
            return coreFetch(url, { ...init, method: "OPTIONS" })
        },
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
            return coreFetch(url, { ...init, method: "HEAD" })
        },
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
            return coreFetch(url, { ...init, method: "PATCH" })
        },
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
            return coreFetch(url, { ...init, method: "TRACE" })
        },
    }
}

/* utils */

// Serialize query params to string
export function defaultQuerySerializer<T = unknown>(q: T): string {
    const search = []
    if (q && typeof q === "object") {
        // @ts-expect-error - TS doesn't understand Object entries
        for (const [k, v] of Object.entries(q)) {
            const value = defaultQueryParamSerializer([k], v)
            if (value) {
                search.push(value)
            }
        }
    }
    return search.join("&")
}

// Serialize query param schema types according to expected default OpenAPI 3.x behavior
export function defaultQueryParamSerializer<T = unknown>(
    key: string[],
    value: T,
): string | undefined {
    if (value === null || value === undefined) {
        return undefined
    }
    if (typeof value === "string") {
        return `${deepObjectPath(key)}=${encodeURIComponent(value)}`
    }
    if (typeof value === "number" || typeof value === "boolean") {
        return `${deepObjectPath(key)}=${String(value)}`
    }
    if (Array.isArray(value)) {
        if (!value.length) {
            return undefined
        }
        const nextValue = []
        for (const item of value) {
            const next = defaultQueryParamSerializer(key, item)
            if (next !== undefined) {
                nextValue.push(next)
            }
        }
        return nextValue.join(`&`)
    }
    if (typeof value === "object") {
        if (!Object.keys(value).length) {
            return undefined
        }
        const nextValue = []
        // @ts-expect-error
        for (const [k, v] of Object.entries(value)) {
            if (v !== undefined && v !== null) {
                const next = defaultQueryParamSerializer([...key, k], v)
                if (next !== undefined) {
                    nextValue.push(next)
                }
            }
        }
        return nextValue.join("&")
    }
    return encodeURIComponent(`${deepObjectPath(key)}=${String(value)}`)
}

// Flatten a node path into a deepObject string
function deepObjectPath(path: any | any[]) {
    let output = path[0]
    for (const k of path.slice(1)) {
        output += `[${k}]`
    }
    return output
}

// Serialize body object to string
export function defaultBodySerializer<T>(body: T): string {
    return JSON.stringify(body)
}

/**
 * Construct URL string from baseUrl and handle path and query params
 */
export function createFinalURL<O>(
    pathname: string,
    options: {
        baseUrl: string
        params: {
            query?: Record<string, unknown>
            path?: Record<string, unknown>
        }
        querySerializer: QuerySerializer<O>
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
    // @ts-expect-error - idk
    const search = options.querySerializer(options.params.query ?? {})
    if (search) {
        finalURL += `?${search}`
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
