import { ofetch } from "ofetch"
import config from "./config"

export interface ClientOptions {
    baseUrl: string
    clientId: string
    clientSecret: string
    refreshToken: string
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
 * Construct URL string from baseUrl and handle path and query params
 * @type {import("./index.js").createFinalURL}
 */
export function createFinalURL(pathname, options) {
    let finalURL = `${options.baseUrl}${pathname}`
    if (options.params.path) {
        for (const [k, v] of Object.entries(options.params.path)) {
            finalURL = finalURL.replace(`{${k}}`, encodeURIComponent(String(v)))
        }
    }
    const search = options.querySerializer(options.params.query ?? {})
    if (search) {
        finalURL += `?${search}`
    }
    return finalURL
}

/**
 * Retrieve an access token from the refresh token
 */
async function getAccessToken(
    { clientId, clientSecret, refreshToken }: ClientOptions
) {
    const startTime = new Date()

    const json = await fetch(config.authTokenEndpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
        body: new URLSearchParams({
            grant_type: "refresh_token",
            client_id: clientId,
            client_secret: clientSecret,
            refresh_token: refreshToken,
        }),
    }).then(res => res.json())

    const { access_token, token_type, expires_in } = json
    this._accessToken = access_token
    startTime.setSeconds(startTime.getSeconds() + expires_in)  // add seconds to start time to get expiration time
    this._accessTokenExpiresAt = startTime  // set expiration time
}

/**
 * Merge headers a and b, with b taking priority
 * @type {import("./index.js").mergeHeaders}
 */
export function mergeHeaders(...allHeaders) {
    const headers = new Headers()
    for (const headerSet of allHeaders) {
        if (!headerSet || typeof headerSet !== "object") {
            continue
        }
        const iterator =
            headerSet instanceof Headers
                ? headerSet.entries()
                : Object.entries(headerSet)
        for (const [k, v] of iterator) {
            if (v === null) {
                headers.delete(k)
            } else if (v !== undefined) {
                // @ts-ignore
                headers.set(k, v)
            }
        }
    }
    return headers
}

/**
 * Create a fully-typed API client based on the OpenAPI specification.
 */
export default function createClient(clientOptions: ClientOptions) {
    let _accessToken: string
    let _accessTokenExpiresAt: Date

    const {
        ...baseOptions
    } = clientOptions ?? {}
    let baseUrl = baseOptions.baseUrl ?? ""
    if (baseUrl.endsWith("/")) {
        baseUrl = baseUrl.slice(0, -1) // remove trailing slash
    }

    /**
     * Per-request fetch (keeps settings created in createClient()
     * @param {string} url
     */
    async function coreFetch(url, fetchOptions) {
        if (!_accessToken || _accessTokenExpiresAt < new Date()) {
            // @ts-ignore
            const { access_token, expires_in } = await getAccessToken(clientOptions)
            _accessToken = access_token
            _accessTokenExpiresAt = new Date(Date.now() + expires_in * 1000)
        }

        const {
            headers,
            body: requestBody,
            params = {},
            parseAs = "json",
            ...init
        } = fetchOptions || {}

        // URL
        const finalURL = createFinalURL(url, {
            baseUrl,
            params,
        })
        const finalHeaders = mergeHeaders(
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

        const response = await ofetch(finalURL, requestInit)
    }

    return {
        /** Call a GET endpoint */
        async get(url, init) {
            return coreFetch(url, { ...init, method: "GET" })
        },
        /** Call a PUT endpoint */
        async put(url, init) {
            return coreFetch(url, { ...init, method: "PUT" })
        },
        /** Call a POST endpoint */
        async post(url, init) {
            return coreFetch(url, { ...init, method: "POST" })
        },
        /** Call a DELETE endpoint */
        async delete(url, init) {
            return coreFetch(url, { ...init, method: "DELETE" })
        },
        /** Call a OPTIONS endpoint */
        async options(url, init) {
            return coreFetch(url, { ...init, method: "OPTIONS" })
        },
        /** Call a HEAD endpoint */
        async head(url, init) {
            return coreFetch(url, { ...init, method: "HEAD" })
        },
        /** Call a PATCH endpoint */
        async patch(url, init) {
            return coreFetch(url, { ...init, method: "PATCH" })
        },
        /** Call a TRACE endpoint */
        async trace(url, init) {
            return coreFetch(url, { ...init, method: "TRACE" })
        },
    }
}
