import { makeAuthRequest } from "$lib/api";

export async function getCompany(fetch: Function): Promise<Company> {
    return makeAuthRequest('companies/me', fetch)
}

