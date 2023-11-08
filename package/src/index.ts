import createOpenapiClient from "openapi-fetch"
import { destr } from "destr"
import ApiClient from "./lib/ApiClient"
import { paths } from "./schemas"

type RegionCode = "eu" | "na" | "fe"

export interface ClientOptions {
    region?: RegionCode  // region code (e.g. "na") but labeled "region" for simplicity ease of use in constructor
    sandbox?: boolean
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

export default function createClient (opts: ClientOptions) {
    if (!opts?.region) opts.region = "na"  // default to `na` region
    const baseUrl = opts?.sandbox
        ? regions[opts.region].sandboxEndpoint
        : regions[opts.region].endpoint

    return new ApiClient({
        baseUrl,
        clientId: opts.clientId,
        clientSecret: opts.clientSecret,
        refreshToken: opts.refreshToken,
    })
}