export interface Endpoint {
    name: string
    displayName: string
    path: string
    consumes: "application/json" | "text/csv"
    versions: string[] // list of supported versions in descending order (latest first, important!)
}
