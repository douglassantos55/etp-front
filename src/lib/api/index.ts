import { HttpError } from "$lib/errors";
import { getToken } from "$lib/stores/user";
import { PUBLIC_API_URL } from "$env/static/public";

export type Response<T> = {
    data?: T;
    errors?: Record<string, string>;
    message?: string;
}

export async function makeAuthRequest<T>(endpoint: string, fetch: Function): Promise<T> {
    const response = await fetch(PUBLIC_API_URL + endpoint, {
        headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + getToken(),
        },
    })

    const data = await response.json();

    if (!response.ok) {
        throw new HttpError(response.status, data.message);
    }

    return data;
}

export async function makeAuthPost<T>(endpoint: string, data: any, fetch: Function): Promise<Response<T>> {
    const response = await fetch(PUBLIC_API_URL + endpoint, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + getToken(),
            'Content-Type': 'application/json;charset=UTF-8',
        },
    })

    const json = await response.json();

    if (!response.ok) {
        if (response.status != 422) {
            throw new HttpError(response.status, json.message);
        }
        return json;
    }

    return { data: json };
}
