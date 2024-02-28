import { getCategories, getSearches, getStaff } from "$lib/api/research";
import type { PageLoad } from "./$types";

export const load: PageLoad = async function({ fetch }) {
    return {
        categories: await getCategories(fetch),
        searches: await getSearches(fetch),
        staff: await getStaff(fetch),
    };
}
