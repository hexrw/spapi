import createClient from "openapi-fetch"
// @ts-ignore
import dotenv from "dotenv"

dotenv.config({ path: ".env.test" })

const baseUrl = process.env.BASE_URL
const clientId = process.env.CLIENT_ID
const clientSecret = process.env.CLIENT_SECRET
const refreshToken = process.env.REFRESH_TOKEN

const client = createClient({
    baseUrl,
    headers: {
        "x-amz-access-token": "Atza|IwEBIIhBe1vU9_IaG15iBh0vkPV3_Ai1dv2wozeKO1tuEkORUYdCk4FECsRWODBddPRmyCpRZ7RAW-ycMjoRUXv_ELlDGc7YKg1m1SooMlkIJ4MunRwWCPMlaD2Sb7YBBANPvfjMkW2Uq8wHVoMfl7Pc5t82lUxHKGYWq1Pmvi3LG5BVZa_j-2NWFEbDKeoiPyO0gou6sLmww9NC15-AlZTh-FJyULDXvsigulaFEGnJJhITw9RVhgCMbY983bXYLRuCwt6jLkEME3I5o0XsFXYyom4VwOxkPUv0SZAeTHqueGm_nzj8i0U358nyYld4TIbIEsRO35YRRjI_SDIg9hmnVELlQK668Mktncvp4sGvwyhKWb6F1gbaLPje-Iu6bDfC3dc",
    },
})

client.GET("/orders/v0/orders", {
    params: {
        query: {
            MarketplaceIds: ["A1PA6795UKMFR9"]
        },
    }
})
