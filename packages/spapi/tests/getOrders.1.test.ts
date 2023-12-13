import { createClient } from "../src/index"

const client = createClient({
    region: "eu",
    sandbox: false,
    clientId: process.env.CLIENT_ID as string,
    clientSecret: process.env.CLIENT_SECRET as string,
    refreshToken: process.env.REFRESH_TOKEN as string,
})

const res = await client.get("/orders/v0/orders", {
    params: {
        query: {
            MarketplaceIds: [ "A1PA6795UKMFR9" ],
            CreatedAfter: "2021-01-01T00:00:00.000Z",
        },
    },
})

console.log(res)
