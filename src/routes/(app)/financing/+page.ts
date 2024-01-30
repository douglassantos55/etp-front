import type { PageLoad } from "./$types";
import { getBonds, getFinancingRates } from "$lib/api/financing";

export const load: PageLoad = async function({ fetch, parent }) {
    const { user } = await parent();

    return {
        bonds: getBonds(user.id, fetch),
        rates: getFinancingRates(fetch),
    }
}
