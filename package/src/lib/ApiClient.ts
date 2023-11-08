import createClient from "openapi-fetch"

const authTokenEndpoint = "https://api.amazon.com/auth/o2/token"

export interface ApiClientOptions {
    baseUrl: string
    clientId: string
    clientSecret: string
    refreshToken: string
}

const regions = {
    na: {
        endpoint: "https://sellingpartnerapi-na.amazon.com",
        sandboxEndpoint: "https://sandbox.sellingpartnerapi-na.amazon.com",
    },
    eu: {
        endpoint: "https://sellingpartnerapi-eu.amazon.com",
        sandboxEndpoint: "https://sandbox.sellingpartnerapi-eu.amazon.com",
    },
    fe: {
        endpoint: "https://sellingpartnerapi-fe.amazon.com",
        sandboxEndpoint: "https://sandbox.sellingpartnerapi-fe.amazon.com",
    },
}

export default class ApiClient {
    private _client: ReturnType<typeof createClient>
    private _clientId: string
    private _clientSecret: string
    private _refreshToken: string
    private _baseUrl: string
    private _accessToken: string
    private _accessTokenExpiresAt: Date

    private async _getAccessToken() {
        const startTime = new Date()

        const json = await fetch(authTokenEndpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
            },
            body: new URLSearchParams({
                grant_type: "refresh_token",
                client_id: this._clientId,
                client_secret: this._clientSecret,
                refresh_token: this._refreshToken,
            }),
        }).then(res => res.json())

        const { access_token, token_type, expires_in } = json
        this._accessToken = access_token
        startTime.setSeconds(startTime.getSeconds() + expires_in)  // add seconds to start time to get expiration time
        this._accessTokenExpiresAt = startTime  // set expiration time
    }

    private async _call(...args: Parameters<typeof createClient>) {
        if (!this._accessToken || this._accessTokenExpiresAt < new Date()) {
            await this._getAccessToken()
        }

        if (args?.headers) {
            args.headers = {
                Authorization: `${this._accessTokenType} ${this._accessToken}`,
                ...args.headers,
            }
        }

        const res = await this._client[method](path, {
            method,
            body,
            headers: {
                Authorization: `${this._accessTokenType} ${this._accessToken}`,
                ...headers,
            },
        })

        if (res.error) throw new Error(res.error)
        else return destr(res.data)
    }
}
