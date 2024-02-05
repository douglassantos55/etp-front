import { HttpError } from "$lib/errors";
import { getToken } from "$lib/stores/user";
import { PUBLIC_API_URL } from "$env/static/public";

export type Result<T> = {
    data?: T;
    errors?: Record<string, string>;
    message?: string;
}

export async function makeAuthPost<T>(endpoint: string, data: any, fetch: Function): Promise<Result<T>> {
    return makeRequest(endpoint, data, fetch);
}

export async function makeAuthDelete<T>(endpoint: string, fetch: Function): Promise<Result<T>> {
    return makeRequest(endpoint, null, fetch, 'DELETE');
}

export async function makeAuthPut<T>(endpoint: string, data: any, fetch: Function): Promise<Result<T>> {
    return makeRequest(endpoint, data, fetch, 'PUT');
}

export async function makeAuthGet<T>(endpoint: string, fetch: Function): Promise<T> {
    const result = await makeRequest(endpoint, null, fetch, 'GET');
    return result.data as T;
}

async function makeRequest<T>(endpoint: string, data: any, fetch: Function, method = 'POST'): Promise<Result<T>> {
    const req: Record<string, any> = {
        method,
        headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + getToken(),
            'Content-Type': 'application/json;charset=UTF-8',
        },
    };

    if (data) {
        req.body = JSON.stringify(data);
    }

    const response = await fetch(PUBLIC_API_URL + endpoint, req)

    return parseResponse<T>(response);
}

async function parseResponse<T>(response: Response): Promise<Result<T>> {
    if (response.status === 204) {
        return {};
    }

    const json = await response.json();

    if (!response.ok) {
        if (response.status != 422 && response.status != 400) {
            throw new HttpError(response.status, json.message);
        }
        return json;
    }

    return { data: json };
}
