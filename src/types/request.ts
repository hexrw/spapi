export type ApiEndpoint = "listings" | "orders" | "reports" | "auth"

export interface ApiRequestOptions {
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE"
    version?: string
    headers?: Record<string, string>
    body?: Record<string, unknown> | unknown[] | string
}
