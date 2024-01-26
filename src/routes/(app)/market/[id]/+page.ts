import { getResource } from "$lib/api/inventory";
import { getOrders } from "$lib/api/market";
import type { PageLoad } from "./$types";

export const load: PageLoad = async function({ fetch, params, url, parent }) {
    const { user } = await parent()

    const resourceId = parseInt(params.id);
    const quality = parseInt(url.searchParams.get("quality") || '0');

    // const recent = await fetch(`http://localhost:3000/purchases?userId=${user.id}&resourceId=${params.id}&_expand=order&_limit=5`);
    // const resource = await fetch(`http://localhost:3000/resources/${params.id}`);

    return {
        recent: [],
        orders: await getOrders(resourceId, quality),
        resource: await getResource(resourceId, fetch),
    };
}
