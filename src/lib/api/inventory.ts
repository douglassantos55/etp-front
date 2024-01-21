import { makeAuthRequest } from "$lib/api";

export async function getCompanyInventory(fetch: Function): Promise<Inventory> {
    return makeAuthRequest('warehouse/me', fetch);
}
