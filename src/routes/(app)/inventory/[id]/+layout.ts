import type { LayoutLoad } from "./$types";

export const load: LayoutLoad = async function({ fetch, params, parent }) {
    const { user } = await parent();

    const item = await fetch(`http://localhost:3000/users/${user.id}/inventories?resourceId=${params.id}&_expand=resource&_limit=1`);
    const items = await item.json();

    const orders = await fetch(`http://localhost:3000/orders?resourceId=${params.id}&_expand=user&_limit=10&_sort=price`);

    return { item: items[0], streamed: { orders: orders.json() } };
}
