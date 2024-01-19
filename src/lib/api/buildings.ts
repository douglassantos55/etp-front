import { HttpError } from "$lib/errors";
import { getToken } from "$lib/stores/user";

export async function getCompanyBuildings(fetch: Function, companyId: number): Promise<Building> {
    const response = await fetch(`http://localhost:1323/companies/${companyId}/buildings`, {
        headers: {
            Authorization: 'Bearer ' + getToken(),
        },
    });

    const data = await response.json();

    if (!response.ok) {
        throw new HttpError(response.status, data.message);
    }

    return data;
}
