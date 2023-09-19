import type { PageLoad } from "./$types";

export const load: PageLoad = async function({ fetch, parent }) {
    const { user } = await parent();
    const response = await fetch(`http://localhost:3000/users/${user.id}/inventories?_expand=resource.category`);
    return { inventory: await response.json() };
}
