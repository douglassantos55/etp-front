import { makeAuthGet } from "$lib/api";

export async function getCompanyInventory(fetch: Function): Promise<Inventory> {
    return makeAuthGet('warehouse/me', fetch);
}

export async function getInventoryItem(resourceId: string, quality: string, fetch: Function): Promise<InventoryItem> {
    return makeAuthGet(`warehouse/me/${resourceId}?quality=${quality}`, fetch);
}

export function getCategories(fetch: Function): Promise<Category[]> {
    return makeAuthGet<Category[]>(`resources/categories`, fetch);
}

export function getResource(id: number | string, fetch: Function): Promise<Resource> {
    return makeAuthGet<Resource>(`resources/${id}`, fetch);
}
