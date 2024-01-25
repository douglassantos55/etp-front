import { makeAuthRequest } from "$lib/api";

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
