import { makeAuthRequest } from "$lib/api";

export async function getCompanyInventory(fetch: Function): Promise<Inventory> {
    return makeAuthRequest('warehouse/me', fetch);
}

export function getCategories(fetch: Function): Promise<Category[]> {
    return makeAuthRequest<Category[]>(`resources/categories`, fetch);
}

export function getResource(id: number | string, fetch: Function): Promise<Resource> {
    return makeAuthRequest<Resource>(`resources/${id}`, fetch);
}
