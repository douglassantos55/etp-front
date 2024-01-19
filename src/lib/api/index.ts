import { HttpError } from "$lib/errors";
import { getToken } from "$lib/stores/user";
import { PUBLIC_API_URL } from "$env/static/public";

export async function makeAuthRequest<T>(endpoint: string, fetch: Function): Promise<T> {
    const response = await fetch(PUBLIC_API_URL + endpoint, {
        headers: {
            Authorization: 'Bearer ' + getToken(),
        },
    })

    const data = await response.json();

    if (!response.ok) {
        throw new HttpError(response.status, data.message);
    }

    return data;
}

