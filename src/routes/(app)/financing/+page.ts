import type { PageLoad } from "./$types";
import { getBonds, getIssuedBonds, getFinancingRates, getLoans, getOwnedBonds } from "$lib/api/financing";

export const load: PageLoad = async function({ fetch }) {
    return {
        loans: getLoans(fetch),
        bonds: getBonds(fetch),
        ownedBonds: getOwnedBonds(fetch),
        issuedBonds: getIssuedBonds(fetch),
        rates: await getFinancingRates(fetch),
    }
}
