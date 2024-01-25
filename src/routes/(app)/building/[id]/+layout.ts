import type { LayoutLoad } from "./$types";
import { getBuilding } from "$lib/api/buildings";

export const load: LayoutLoad = async function({ fetch, params, parent }) {
    const { user } = await parent();
    return { user, building: await getBuilding(fetch, user.id, params.id) };
}
