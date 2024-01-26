import { getCategories } from "$lib/api/inventory";
import type { PageLoad } from "./$types";

export const load: PageLoad = async function({ fetch }) {
    return { categories: await getCategories(fetch) };
}
