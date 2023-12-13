import { createClient } from "../src/index"
import { Marketplaces } from "../src/enums"

const client = createClient({
    region: "eu",
    sandbox: false,
    clientId: process.env.CLIENT_ID as string,
    clientSecret: process.env.CLIENT_SECRET as string,
    refreshToken: process.env.REFRESH_TOKEN as string,
})

const orders = client.getOrders({
    marketplaces: [ Marketplaces.DE ],
    time: {
        from: "2023-06-01T00:00:00.000Z",
        to: "2023-12-01T00:00:00.000Z",
    }, pageSize: 5,
})

console.log(orders)

for await (const chunk of orders) {
    console.log(JSON.stringify((chunk ?? {}), null, 4).slice(0, 300) + "...")
    //console.log(chunk)
}

console.log("done")
