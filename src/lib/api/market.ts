import { makeAuthPost, makeAuthRequest, type Response } from "$lib/api";

export async function getResourcePrice(resourceId: number, quality: number): Promise<number> {
    const orders = await getOrders(resourceId, quality);
    if (orders.length === 0) {
        return 0;
    }
    return orders[0].price;
}

export function getOrders(resourceId: number, quality: number): Promise<Order[]> {
    return makeAuthRequest<Order[]>(`market/orders?resource=${resourceId}&quality=${quality}`, fetch);
}

type PurchaseOrder = {
    resource_id: number;
    quality: number;
    quantity: number;
}

export function savePurchase(order: PurchaseOrder): Promise<Response<Order>> {
    return makeAuthPost<Response<Order>>('market/orders/purchase', order, fetch);
}
