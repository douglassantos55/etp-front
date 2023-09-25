import type { PageLoad } from "./$types";

export const load: PageLoad = async function({ fetch, params, url, parent }) {
    const { user } = await parent()
    const quality = url.searchParams.get("quality") || 0;

    const response = await fetch(`http://localhost:3000/orders?resourceId=${params.id}&quality=${quality}&_expand=resource&_expand=user&_sort=price`);
    const recent = await fetch(`http://localhost:3000/purchases?userId=${user.id}&resourceId=${params.id}&_expand=order&_limit=5`);

    return { orders: response.json(), recent: recent.json() };
}
