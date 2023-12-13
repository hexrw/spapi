import FetchClient from "./fetchClient"
import { Marketplaces } from "./enums"
import type { paths } from "./paths"

export default class SpapiClient extends FetchClient<paths> {
    /**
     * Get orders from the Orders API.
     *
     * @param opts - Options for the request.
     * @param opts.marketplaces - The marketplaces from which to get orders.
     * @param opts.time - The time range for which to get orders.
     * @param opts.pageSize - The number of orders per page.
     * @returns An async iterator that yields pages of orders.
     * @example
     * ```ts
     * const orders = client.getOrders({
     *     marketplaces: [ Marketplaces.DE ],
     *     time: {
     *         from: "2023-06-01T00:00:00.000Z",
     *         to: "2023-12-01T00:00:00.000Z",
     *     }, pageSize: 5,
     * })
     * ```
     */
    async *getOrders (opts: {
        marketplaces: Marketplaces[]
            | `${Marketplaces}`[],  // enum to union conversion using template literal type
        time: { from: Date | string, to: Date | string },
        pageSize?: number,
    }) {
        // Desired behavior: yield chunks until there is not a NextToken anymore or the `errors` array is not empty.

        const query = {
            MarketplaceIds: [...opts.marketplaces],
            CreatedAfter: new Date(opts.time.from).toISOString(),
            CreatedBefore: new Date(opts.time.to).toISOString(),
            MaxResultsPerPage: opts.pageSize ?? 20,
        }

        let chunkNumber = 1

        console.debug("[spapi] [getOrders] Params:", query)

        console.debug("[spapi] Get first chunk")
        let res = await this.get("/orders/v0/orders", { params: { query } })
        // error thrown automatically if response status is not 2xx
        console.debug(`[spapi] 1. chunk received (next chunk: ${res?.payload?.NextToken?.slice(0, 10)}...)`)

        chunkNumber++
        yield res

        while (res?.payload?.NextToken && !res?.errors) {
            console.debug(`[spapi] Get ${chunkNumber}. chunk (${res.payload?.NextToken.slice(0, 10)}...)`)

            // For some reason, NextToken is not properly URL-encoded by ofetch,
            // thus I made this workaround
            console.log(res.payload.NextToken)
            res = await this.get("/orders/v0/orders", {
                params: {
                    //query: Object.assign({}, query, { NextToken: res.payload?.NextToken }), // shallow copy, new object, not mutating
                    query: {
                        ...query,
                        NextToken: res.payload.NextToken,
                    },
                },
            })

            // error thrown automatically if response status is not 2xx
            console.debug(`[spapi] ${chunkNumber}. chunk received (next chunk: ${res?.payload?.NextToken?.slice(0, 10)}...)`)
            chunkNumber++
            yield res
        }
    }
}

export const createClient = (opts: ConstructorParameters<typeof SpapiClient>[0]) =>
    new SpapiClient(opts)
