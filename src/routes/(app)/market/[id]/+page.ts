import { getResource } from "$lib/api/inventory";
import { getOrders, getRecentPurchases } from "$lib/api/market";
import type { PageLoad } from "./$types";

export const load: PageLoad = async function({ fetch, params, url }) {
    const resourceId = parseInt(params.id);
    const quality = parseInt(url.searchParams.get("quality") || '0');

    return {
        recent: await getRecentPurchases(resourceId),
        orders: await getOrders(resourceId, quality),
        resource: await getResource(resourceId, fetch),
    };
}
