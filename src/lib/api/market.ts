import { makeAuthPost, makeAuthGet, type Result } from "$lib/api";

export async function getResourcePrice(resourceId: number, quality: number, fetch: Function): Promise<number> {
    const orders = await getOrders(resourceId, quality, fetch);
    if (orders.length === 0) {
        return 0;
    }
    return orders[0].price;
}

export function getOrders(resourceId: number, quality: number, fetch: Function): Promise<Order[]> {
    return makeAuthGet<Order[]>(`market/orders?resource=${resourceId}&quality=${quality}`, fetch);
}

type PurchaseOrder = {
    resource_id: number;
    quality: number;
    quantity: number;
}

export function savePurchase(order: PurchaseOrder): Promise<Result<InventoryItem[]>> {
    return makeAuthPost('market/orders/purchase', order, fetch);
}

export function getRecentPurchases(resourceId: number, fetch: Function): Promise<Purchase[]> {
    return makeAuthGet<Purchase[]>(`market/purchases/me?resource=${resourceId}`, fetch);
}

type PlaceOrder = {
    quantity: number;
    price: number;
    quality: number;
    resource_id: number;
}

export function placeOrder(order: PlaceOrder): Promise<Result<Order>> {
    return makeAuthPost('market/orders', order, fetch)
}
