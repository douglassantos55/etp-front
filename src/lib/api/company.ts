import { makeAuthGet, makeAuthPost, type Result } from "$lib/api";

export async function getCompany(fetch: Function): Promise<Company> {
    return makeAuthGet('companies/me', fetch)
}

type Registration = {
    token: string;
    company: Company;
}

export async function registerCompany(data: any): Promise<Result<Registration>> {
    return makeAuthPost('companies/register', data, fetch);
}
