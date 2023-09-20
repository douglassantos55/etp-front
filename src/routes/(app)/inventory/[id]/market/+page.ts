import type { PageLoad } from "./$types";

export const load: PageLoad = async function({ fetch, params }) {
    const response = await fetch(`http://localhost:3000/orders?resourceId=${params.id}&_expand=user&_limit=10&_sort=price`);
    return { orders: await response.json() };
}
