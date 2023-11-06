export type RegionCode = "na" | "eu" | "fe"

export interface Region {
    name: string
    code: RegionCode
    description: string
    endpoint: string
    sandboxEndpoint: string
    awsRegion: string
}
