import type { LayoutLoad } from "./$types";
import { getCompanyBuilding } from "$lib/api/buildings";

export const load: LayoutLoad = async function({ fetch, params, parent }) {
    const { user } = await parent();
    return { user, building: await getCompanyBuilding(fetch, user.id, params.id) };
}
