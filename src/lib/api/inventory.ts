import { makeAuthRequest } from "$lib/api";

export async function getCompanyInventory(fetch: Function): Promise<InventoryItem[]> {
    return makeAuthRequest('warehouse/me', fetch);
}
