import Client from "../src/index"
// @ts-ignore
import { paths } from "../src/schemas"

const region = process.env.REGION as "eu" | "na" | "fe"
const sandbox = process.env.SANDBOX as unknown as boolean
const clientId = process.env.CLIENT_ID as string
const clientSecret = process.env.CLIENT_SECRET as string
const refreshToken = process.env.REFRESH_TOKEN as string

console.log("region:", region)
console.log("sandbox:", sandbox)
console.log("clientId:", clientId)
console.log("clientSecret:", clientSecret)
console.log("refreshToken:", refreshToken)

const client = new Client<paths>({
    region,
    sandbox: false,
    clientId,
    clientSecret,
    refreshToken,
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
