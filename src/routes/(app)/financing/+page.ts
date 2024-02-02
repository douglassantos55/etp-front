import type { PageLoad } from "./$types";
import { getBonds, getFinancingRates, getLoans } from "$lib/api/financing";

export const load: PageLoad = async function({ fetch, parent }) {
    const { user } = await parent();

    return {
        loans: getLoans(fetch),
        bonds: getBonds(user.id, fetch),
        rates: await getFinancingRates(fetch),
    }
}
