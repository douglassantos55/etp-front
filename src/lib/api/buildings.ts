import { makeAuthRequest } from "$lib/api";

export async function getCompanyBuildings(fetch: Function, companyId: number): Promise<Building> {
    return makeAuthRequest(`companies/${companyId}/buildings`, fetch);
}
