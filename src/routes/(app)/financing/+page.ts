import type { PageLoad } from "./$types";
import { getBonds, getCompanyBonds, getFinancingRates, getLoans } from "$lib/api/financing";

export const load: PageLoad = async function({ fetch, parent }) {
    const { user } = await parent();

    return {
        loans: getLoans(fetch),
        bonds: getBonds(fetch),
        issuedBonds: getCompanyBonds(user.id, fetch),
        rates: await getFinancingRates(fetch),
    }
}
