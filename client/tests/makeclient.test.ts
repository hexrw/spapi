import createClient from "openapi-fetch"
import { paths } from "../src/schemas"
// @ts-ignore
import dotenv from "dotenv"

dotenv.config({ path: ".env.test" })

//const baseUrl = process.env.BASE_URL
//const clientId = process.env.CLIENT_ID
//const clientSecret = process.env.CLIENT_SECRET
//const refreshToken = process.env.REFRESH_TOKEN

const baseUrl = "https://sellingpartnerapi-eu.amazon.com"

const client = createClient<paths>({
    baseUrl,
})

const res = await client.GET("/orders/v0/orders", {
    params: {
        query: {
            MarketplaceIds: ["A1PA6795UKMFR9"],
            CreatedAfter: "2021-01-01T00:00:00.000Z",
        },
    },
    headers: {
        "x-amz-access-token": "Atza|IwEBICbzk4p7NSiYvP46B6Sj9c-4_dAyYlE23PIar5v3jtap0JFbPTvDgqmCv2u2d8NSQM-Asnji0lruWdeJ2RP44z9rtbNtSsS_qcKqwTM-9wcGODoc2_Q8O_eXgV2KYECeyYFTb7vAdln2Ljk5BAaSzNlkkSoTj1Ekpk8m86c97ZC-8EeWmb6tGmQ9d949ixYNgFXhrL0T2voNjMcsbEUR9VIiNrfNXU4K1sDEOB7U0LAaIsBN_o8zrC6PxiDuJaINFYVHyTLemMFoJBgGE02n1dfMJaWAViPsACzcWatPpFRbG7URGav2rHW7P3kZk0r3Ux06VSnqjMfVmkKkxe_jiiZ3nvs53wqNKLgU9f5MHgpFWmMllBHhxsOVSgesZCbSe7w",
    },
})

console.log(res)
