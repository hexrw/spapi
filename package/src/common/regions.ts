import { Region } from "../types"

export const regions: Map<string, Region> = new Map([
    ["na", {
        name: "North America",
        code: "na",
        description: "Canada, US, Mexico, and Brazil marketplaces",
        endpoint: "https://sellingpartnerapi-na.amazon.com",
        sandboxEndpoint: "https://sandbox.sellingpartnerapi-na.amazon.com",
        awsRegion: "us-east-1",
    }],
    ["eu", {
        name: "Europe",
        code: "eu",
        description: "Spain, UK, France, Belgium, Netherlands, Germany, Italy, Sweden, South Africa, Poland, Saudi Arabia, Egypt, Turkey, United Arab Emirates, and India marketplaces",
        endpoint: "https://sellingpartnerapi-eu.amazon.com",
        sandboxEndpoint: "https://sandbox.sellingpartnerapi-eu.amazon.com",
        awsRegion: "eu-west-1",
    }],
    ["fe", {
        name: "Far East",
        code: "fe",
        description: "Singapore, Australia, and Japan marketplaces",
        endpoint: "https://sellingpartnerapi-fe.amazon.com",
        sandboxEndpoint: "https://sandbox.sellingpartnerapi-fe.amazon.com",
        awsRegion: "us-west-2",
    }],
])

export const regionCodes: string[] = Array.from(regions.keys())
