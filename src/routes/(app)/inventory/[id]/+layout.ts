import type { LayoutLoad } from "./$types";

export const load: LayoutLoad = async function({ fetch, params, parent }) {
    const { user } = await parent();
    const response = await fetch(`http://localhost:3000/users/${user.id}/inventories?resourceId=${params.id}&_expand=resource&_limit=1`);
    const items = await response.json();
    return { item: items[0] };
}
