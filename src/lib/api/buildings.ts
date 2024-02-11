import { makeAuthGet, makeAuthPost, type Result } from "$lib/api";

export function getCompanyBuildings(fetch: Function, companyId: number): Promise<CompanyBuilding[]> {
    return makeAuthGet(`companies/${companyId}/buildings`, fetch);
}

export function getCompanyBuilding(fetch: Function, companyId: number, buildingId: number | string): Promise<CompanyBuilding> {
    return makeAuthGet(`companies/${companyId}/buildings/${buildingId}`, fetch);
}

export function getBuildings(fetch: Function): Promise<CompanyBuilding[]> {
    return makeAuthGet("buildings", fetch);
}

export function getBuilding(id: number, fetch: Function): Promise<Building> {
    return makeAuthGet(`buildings/${id}`, fetch);
}

export function construct(building_id: number, position: number, companyId: number): Promise<Result<CompanyBuilding>> {
    return makeAuthPost(`companies/${companyId}/buildings`, { building_id, position }, fetch);
}

export function upgrade(buildingId: number, companyId: number): Promise<Result<CompanyBuilding>> {
    return makeAuthPost(`companies/${companyId}/buildings/${buildingId}/upgrade`, null, fetch);
}
