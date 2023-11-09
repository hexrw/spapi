import createClient from "../src/index"
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
    region: "eu",
    sandbox: false,
    headers: {
        "x-amz-access-token": "Atza|IwEBIOpb8oicLeJZ5BLTrcdNkRU8yavLL6e7F3De1U960udKZuH4yLR5ngomCUiRH6GlCBJtl3czd4_0IFDlp17l1MgIXgy-nrq8SSDCEnFieha7259mxcg1ELNDCZEZ-HKZWzTd-DFUC-5j7GXcD1f-q0LyoEAdT3GBvJrJ6ggmz5v9oLQ7LdELx8_Xro0ZG1J28gmukT4t8rTLTXayWURB2mxWzjkps2EFNkcHHlVFe2tCqMlnWiZwxjQGPjccQqsdmtX3vP9_dINJJNMVDnXovjqmKXVrgC7XMbqhIZEFdZ1SiSEGTFOfCOslGe3HlPelxPOuVmm2i7EzxQJF_EzttqwwD4oPL7ThJpxfnnuDj58b-tOL0v_5ZiezgEEFspVFplg",
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
