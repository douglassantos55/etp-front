import type { PageLoad } from "./$types";
import { getCompanyBuildings } from "$lib/api/buildings";

export const load: PageLoad = async function({ fetch, parent }) {
    const { user } = await parent();
    return { buildings: await getCompanyBuildings(fetch, user.id) };
}
