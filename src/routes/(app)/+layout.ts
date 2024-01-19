import type { LayoutLoad } from "./$types";
import { getCompany } from "$lib/api/company";

export const ssr = false;

export const load: LayoutLoad = async function({ fetch }) {
    return { user: await getCompany(fetch) };
}
