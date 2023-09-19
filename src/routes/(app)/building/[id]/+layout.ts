import { error } from "@sveltejs/kit";
import type { LayoutLoad } from "./$types";

export const load: LayoutLoad = async function({ fetch, params }) {
    const response = await fetch(`http://localhost:3000/buildings/${params.id}?_expand=resources.resource.requirements.resource`)
    if (response.status !== 200) {
        throw error(response.status, await response.json());
    }
    return { building: await response.json() };
}
