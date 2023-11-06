import type { Issue, Money, Points } from "./common"

type Condition = "new_new" | "new_open_box" | "new_oem" | "refurbished_refurbished"
    | "used_like_new" | "used_very_good" | "used_good" | "used_acceptable" | "collectible_like_new"
    | "collectible_very_good" | "collectible_good" | "collectible_acceptable" | "club_club"

type Status = "buyable" | "discoverable"

interface ItemImage {
    link: string
    height: number
    width: number
}

interface ItemSummaryByMarketplace {
    marketplaceId: string
    asin: string
    productType: string
    conditionType?: Condition
    status: Status
    fnSku?: string
    itemName: string
    createdDate: string
    lastUpdatedDate: string
    mainImage?: ItemImage
}

type ItemSummary = ItemSummaryByMarketplace

interface ItemOfferByMarketplace {
    marketplaceId: string
    offerType: "B2C" | "B2B"
    price: Money
    points?: Points
}

type ItemOffer = ItemOfferByMarketplace

export default interface Item {
    sku: string
    summaries?: ItemSummary[]
    attributes?: Record<string, unknown>
    issues?: Issue[]
    offers?: ItemOffer[]
    fulfillmentAvailability?: any[]
    procurement?: any[]
}
