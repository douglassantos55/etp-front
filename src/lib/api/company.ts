import { makeAuthGet, makeAuthPost, type Result } from "$lib/api";

export async function getCompany(fetch: Function): Promise<Company> {
    return makeAuthGet('companies/me', fetch)
}

export async function login(data: any): Promise<Result<{ token: string }>> {
    return makeAuthPost('companies/login', data, fetch);
}

type Registration = {
    token: string;
    company: Company;
}

export async function registerCompany(data: any): Promise<Result<Registration>> {
    return makeAuthPost('companies/register', data, fetch);
}

export async function purchaseTerrain(position: number): Promise<Result<void>> {
    return makeAuthPost(`companies/terrains/${position}`, { position }, fetch);
}
