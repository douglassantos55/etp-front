import { makeAuthDelete, makeAuthGet, makeAuthPost, type Result } from "$lib/api";

export function getCategories(fetch: Function): Promise<Category[]> {
    return makeAuthGet<Category[]>('research/categories/me', fetch);
}

export function getStaff(fetch: Function): Promise<Staff[]> {
    return makeAuthGet('research/staff/me', fetch);
}

export function getSearches(fetch: Function): Promise<Search[]> {
    return makeAuthGet('research/staff/searches', fetch);
}

export function getStaffMember(id: number, fetch: Function): Promise<Staff> {
    return makeAuthGet(`research/staff/me/${id}`, fetch);
}

export function cancelSearch(id: number): Promise<Result<void>> {
    return makeAuthDelete(`research/staff/searches/${id}`, fetch);
}

export function findGraduate(): Promise<Result<void>> {
    return makeAuthPost('research/staff/graduate', null, fetch);
}

export function findExperienced(): Promise<Result<void>> {
    return makeAuthPost('research/staff/experienced', null, fetch);
}

export function hireStaff(id: number): Promise<Result<Staff>> {
    return makeAuthPost(`research/staff/${id}/hire`, null, fetch);
}

export function trainStaff(id: number): Promise<Result<Training>> {
    return makeAuthPost(`research/staff/${id}/train`, null, fetch);
}
