import { getInventoryItem } from "$lib/api/inventory";
import { getOrders } from "$lib/api/market";
import type { LayoutLoad } from "./$types";

export const load: LayoutLoad = async function({ fetch, params, url }) {
    const quality = url.searchParams.get('quality') || '0';
    const item = await getInventoryItem(params.id, quality, fetch);

    const orders = getOrders(+params.id, +quality, fetch);

    //const contracts = await fetch(`http://localhost:3000/contracts?resourceId=${params.id}&senderId=${user.id}&_expand=user`);

    return { item, streamed: { orders: orders, contracts: Promise.resolve([]) } };
}
