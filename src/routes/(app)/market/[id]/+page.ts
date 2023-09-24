import type { PageLoad } from "./$types";

export const load: PageLoad = async function({ fetch, params, url }) {
    const quality = url.searchParams.get("quality") || 0;
    const response = await fetch(`http://localhost:3000/orders?resourceId=${params.id}&quality=${quality}&_expand=resource&_expand=user&_sort=price`);
    return { orders: await response.json() };
}
