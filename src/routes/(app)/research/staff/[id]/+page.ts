import { getStaffMember } from "$lib/api/research";
import type { PageLoad } from "./$types";

export const load: PageLoad = async function({ fetch, params }) {
    return {
        staff: await getStaffMember(+params.id, fetch),
    }
}
