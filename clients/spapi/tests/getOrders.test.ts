import createClient from "../src/index"
// @ts-ignore
import dotenv from "dotenv"
import { paths } from "../src/schemas"

dotenv.config({ path: ".env.test" })

//const baseUrl = process.env.BASE_URL
//const clientId = process.env.CLIENT_ID
//const clientSecret = process.env.CLIENT_SECRET
//const refreshToken = process.env.REFRESH_TOKEN

const baseUrl = "https://sellingpartnerapi-eu.amazon.com"

const client = createClient<paths>({
    region: "eu",
    sandbox: false,
    headers: {
        "x-amz-access-token": "Atza|IwEBIN02m-pEFYSmnwI9PsFtSgvRthGrwo8JPYSSX1SEtu89APXrCc_D5XH-3HXN6MzHgtkkec9czteKuJmxovFrV1ozglVGuJ8-CJDxlT70uPJ1fgq1CX1JwBfwgSmErTGXYoNbCDdY4d0ihsS17ayhTg3A-9J1RiVDCYfHE3Sw_Mik9XkVs4uBH-jKTlb_TyyNbwspOKsjgOrgOEBzC1fO2B7BhoDyu4CB1fReVAbS8PZVyGcghKfBhDuQ2_uOkAAKFk1KZ6Y_l4jHHpe6Sroa32yiQf5Wq6Y0-SxJn1P3nowk5VJt7hyZRNqec_gC9KQ5D4Ado0G9FW8biwKDZhliBG7sfigqXSPTWyK3VxBHvPXQWfsySQ8NVx-_tLrnMaogkTg",
    },
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
