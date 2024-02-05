import { makeAuthGet } from "$lib/api";

export async function getCompany(fetch: Function): Promise<Company> {
    return makeAuthGet('companies/me', fetch)
}

