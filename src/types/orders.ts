export type OrderStatus = "PendingAvailability" | "Pending" | "Unshipped" | "PartiallyShipped" | "Shipped" | "InvoiceUnconfirmed" | "Canceled" | "Unfulfillable"
export type PaymentMethod = "COD" | "CVS" | "Other"

/**
 * The request schema for the getOrders operation.
 * 
 * @see {@link https://developer-docs.amazon.com/sp-api/docs/orders-api-v0-reference#get-ordersv0orders | Orders API Reference}
 * 
 * @export
 * @interface OrdersGetOrdersQueryParams
 * @property {string} [CreatedAfter] - A date used for selecting orders created after (or at) a specified time. Only orders placed after the specified time are returned. Either the CreatedAfter parameter or the LastUpdatedAfter parameter is required. Both cannot be empty. The date must be in ISO 8601 format.
 * @property {string} [CreatedBefore] - A date used for selecting orders created before (or at) a specified time. Only orders placed before the specified time are returned. The date must be in ISO 8601 format.
 * @property {string} [LastUpdatedAfter] - A date used for selecting orders that were last updated after (or at) a specified time. The date must be in ISO 8601 format.
 * @property {string} [LastUpdatedBefore] - A date used for selecting orders that were last updated before (or at) a specified time. The date must be in ISO 8601 format.
 * @property {OrderStatus[]} [OrderStatuses] - A list of OrderStatus values used to filter the results.
 * @property {string[]} MarketplaceIds - A list of MarketplaceId values. Used to select orders that were placed in the specified marketplaces. Max count: 50
 * @property {string[]} [FulfillmentChannels] - A list that indicates how an order was fulfilled. Filters the results by fulfillment channel, such as SellerFulfilled or Amazon fulfillment. Possible values: SellerFulfilled or Amazon.
 * @property {PaymentMethod[]} [PaymentMethods] - A list that indicates how the buyer paid for their order. Used to select only orders paid for using the specified payment methods. Possible values: COD, CVS, Other.
 * @property {string} [BuyerEmail] - The email address of a buyer. Used to select only the orders that contain the specified email address.
 * @property {string} [SellerOrderId] - A seller-specific order identifier. The identifier must be unique for each seller in an Amazon marketplace.
 * @property {number} [MaxResultsPerPage] - The maximum number of results to return per page. Used for pagination when there is more results than the specified max per page value. Defaults to max = 100.
 * @property {string[]} [EasyShipShipmentStatuses] - A list of EasyShipShipmentStatus values. Used to select orders with a specific Easy Ship status. Possible values: PendingPickUp, LabelCanceled, PickedUp, OutForDelivery, Damaged, Delivered, RejectedByBuyer, Undeliverable, ReturnedToSeller, ReturningToSeller.
 * @property {string[]} [ElectronicInvoiceStatuses] - A list of ElectronicInvoiceStatus values. Used to select orders with a specific electronic invoice status. Possible values: NotApplicable, Ready, Pending, Rejected, DocumentUnavailable, Generated, ReadyForDownload, Downloaded, Failed.
 * @property {string} [NextToken] - A string token returned in the response of your previous request.
 * @property {string[]} [AmazonOrderIds] - A list of AmazonOrderId values. An AmazonOrderId is an Amazon-defined order identifier, in 3-7-7 format. Used to select multiple orders. Maximum: 50 order identifiers.
 * @property {string} [ActualFulfillmentSupplySourceId] - The actualFulfillmentSupplySourceId of the order. Used to select only the orders that are sourced from a specific fulfillment center.
 * @property {boolean} [IsISPU] - When true, indicates that the order is an In-Store Pickup (ISPU) order. Default: false.
 * @property {string} [StoreChainStoreId] - The store chain store identifier. Used to select only the orders that were placed at the specified store. Required when IsISPU = true.
 * @property {string} [EarliestDeliveryDateBefore] - A date used for selecting orders that were delivered before (or at) a specified time. The date must be in ISO 8601 format.
 * @property {string} [EarliestDeliveryDateAfter] - A date used for selecting orders that were delivered after (or at) a specified time. The date must be in ISO 8601 format.
 * @property {string} [LatestDeliveryDateBefore] - A date used for selecting orders that were delivered before (or at) a specified time. The date must be in ISO 8601 format.
 * @property {string} [LatestDeliveryDateAfter] - A date used for selecting orders that were delivered after (or at) a specified time. The date must be in ISO 8601 format.
 */
export interface OrdersGetOrdersQueryParams {
    CreatedAfter?: string
    CreatedBefore?: string
    LastUpdatedAfter?: string
    LastUpdatedBefore?: string
    OrderStatuses?: OrderStatus[]
    MarketplaceIds: string[]
    FulfillmentChannels?: string[]
    PaymentMethods?: PaymentMethod[]
    BuyerEmail?: string
    SellerOrderId?: string
    MaxResultsPerPage?: number
    EasyShipShipmentStatuses?: string[]
    ElectronicInvoiceStatuses?: string[]
    NextToken?: string
    AmazonOrderIds?: string[]
    ActualFulfillmentSupplySourceId?: string
    IsISPU?: boolean
    StoreChainStoreId?: string
    EarliestDeliveryDateBefore?: string
    EarliestDeliveryDateAfter?: string
    LatestDeliveryDateBefore?: string
    LatestDeliveryDateAfter?: string
}

export interface OrdersGetOrderPathParams { orderId: string }
export interface OrdersGetOrderBuyerInfoPathParams { orderId: string }
