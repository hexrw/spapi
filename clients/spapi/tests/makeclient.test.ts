import createClient from "openapi-fetch"
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
        "x-amz-access-token": "Atza|IwEBILB-_PRoyk5-rPkArXG4s0vcVk-bKYQeF7oozXYr5Dz_Iv3ZYKn9TCsHi0w3xI7unA7IQZVj21w3yey_3PenX_fYTv7VbDfxKbha9pEakM6lCJCdcIMyJgVcPw7NW8Bs3PZVtvsuYXWr1wgb1wg2JJUWxEbQZrErGZBd-pLNkYDyV5vNsnbw-dtzUndn8hmmUTRciufPG5x2QLh2rAPvlhAknigV8H2xuxST4DyvBjd4u_iFs-CMQVSIGWXLq1hTKg5V0P5Jz1Ky8ytD92yl22JLZox2hfk2Xue_joJVvAsbBJvrhCW6EvGQCUdHH3dJJxHvKihUktJfYWFlsNDn_hoqPMrYOEwLOcmFgz9nrBkaxwkVIMeh-J_MtDY6F1IA8oI",
    },
})

console.log(res)
