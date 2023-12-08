import FetchClient from "./fetchClient"
import { Marketplaces } from "./enums"
import type { paths } from "./paths"

export default class SpapiClient extends FetchClient<paths> {
    async *getOrders (opts: {
        marketplaces: Marketplaces[]
            | `${Marketplaces}`[],  // enum to union conversion using template literal type
        time: { from: Date | string, to: Date | string },
        pageSize?: number,
    }) {
        console.debug("[spapi] Get first chunk")
        let res = await this.get("/orders/v0/orders", {
            params: {
                query: {
                    MarketplaceIds: [...opts.marketplaces],
                    CreatedAfter: new Date(opts.time.from).toISOString(),
                    CreatedBefore: new Date(opts.time.to).toISOString(),
                    MaxResultsPerPage: opts.pageSize ?? 50,
                },
            },
        })
        // error thrown automatically if response status is not 2xx
        console.debug("[spapi] First chunk received", res)
        yield res

        while (res?.payload?.NextToken && !res.data?.errors) {
            console.debug("[spapi] Get next chunk", res.payload?.NextToken.slice(0, 10) + "...")
            res = await this.get("/orders/v0/orders", {
                params: {
                    query: {
                        MarketplaceIds: [...opts.marketplaces],
                        CreatedAfter: new Date(opts.time.from).toISOString(),
                        CreatedBefore: new Date(opts.time.to).toISOString(),
                        MaxResultsPerPage: opts.pageSize ?? 20,
                        NextToken: res.data?.payload?.NextToken,
                    },
                },
            })
            yield res
        }
    }
}

export const createClient = (opts: ConstructorParameters<typeof SpapiClient>[0]) =>
    new SpapiClient(opts)
