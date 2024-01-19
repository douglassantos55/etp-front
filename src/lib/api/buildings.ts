import { makeAuthRequest } from "$lib/api";

export function getCompanyBuildings(fetch: Function, companyId: number): Promise<Building> {
    return makeAuthRequest(`companies/${companyId}/buildings`, fetch);
}

export function getBuilding(fetch: Function, companyId: number, buildingId: number | string): Promise<Building> {
    return makeAuthRequest(`companies/${companyId}/buildings/${buildingId}`, fetch);
}
