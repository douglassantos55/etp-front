import type { PageLoad } from "./$types";
import { getCompanyInventory } from "$lib/api/inventory";

export const load: PageLoad = async function({ fetch }) {
    return getCompanyInventory(fetch);
}
