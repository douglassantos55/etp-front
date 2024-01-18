import type { LayoutLoad } from "./$types";
import { getToken } from "$lib/stores/user";
import { HttpError } from "$lib/errors";

export const ssr = false;

export const load: LayoutLoad = async function({ fetch }) {
    const response = await fetch(`http://localhost:1323/companies/me`, {
        headers: {
            Authorization: 'Bearer ' + getToken(),
        },
    });

    const data = await response.json();

    if (!response.ok) {
        throw new HttpError(response.status, data.message);
    }

    return { user: data };
}
