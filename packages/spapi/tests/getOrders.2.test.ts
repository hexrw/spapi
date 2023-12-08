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

let pageNumber = 1

console.log(orders)

for await (const page of orders) {
    console.log("\n", "_".repeat(50))
    console.log(`Page ${pageNumber++}, ${(() => page.data?.payload?.Orders || []).length} items`)
    console.log("_".repeat(50), "\n")
}

console.log(`Total pages: ${pageNumber}`)
