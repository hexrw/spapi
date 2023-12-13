import config from "../src/config"
import dotenv from "dotenv"

dotenv.config({ path: ".env.test" })

const baseUrl = process.env.BASE_URL
const clientId = process.env.CLIENT_ID
const clientSecret = process.env.CLIENT_SECRET
const refreshToken = process.env.REFRESH_TOKEN

export interface ClientOptions {
    baseUrl: string
    clientId: string
    clientSecret: string
    refreshToken: string
}

/**
 * Retrieve an access token from the refresh token
 */
async function getAccessToken(
    { clientId, clientSecret, refreshToken }: ClientOptions
) {
    const startTime = new Date()

    const json = await fetch(config.authTokenEndpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
        body: new URLSearchParams({
            grant_type: "refresh_token",
            client_id: clientId,
            client_secret: clientSecret,
            refresh_token: refreshToken,
        }),
    }).then(res => res.json())

    const { access_token, token_type, expires_in } = json
    this._accessToken = access_token
    startTime.setSeconds(startTime.getSeconds() + expires_in)  // add seconds to start time to get expiration time
    this._accessTokenExpiresAt = startTime  // set expiration time
}


