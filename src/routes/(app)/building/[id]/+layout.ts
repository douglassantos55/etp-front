import type { LayoutLoad } from "./$types";
import { getBuilding } from "$lib/api/buildings";
import { getCompanyInventory } from "$lib/api/inventory";

export const load: LayoutLoad = async function({ fetch, params, parent }) {
    const { user } = await parent();

    return {
        user,
        inventory: await getCompanyInventory(fetch),
        building: await getBuilding(fetch, user.id, params.id)
    };
}
