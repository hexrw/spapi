import type { Endpoint } from "../types"

export const endpoints: Map<string, Endpoint> = new Map([
    [ "listings", {
        name: "listings",
        displayName: "Listings API",
        path: "/listings",
        versions: [ "2021-08-01" ],
        consumes: "application/json",
    } ],
    [ "orders", {
        name: "orders",
        displayName: "Orders API",
        path: "/orders",
        versions: [ "v0" ],
        consumes: "application/json",
    } ],
    [ "reports", {
        name: "reports",
        displayName: "Reports API",
        path: "/reports",
        versions: [ "2021-06-30", "2020-09-04" ],
        consumes: "application/json",
    } ],
])
