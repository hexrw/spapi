import { z } from "zod"

const TokenType = z.enum([ "bearer" ])

export const AuthTokenResponse = z.object({
    access_token: z.string(),
    refresh_token: z.string(),
    token_type: TokenType,
    expires_in: z.number().min(1).max(86400),  // 1 second to 1 day
})
