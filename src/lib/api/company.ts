import { HttpError } from "$lib/errors";
import { getToken } from "$lib/stores/user";

export async function getCompany(fetch: Function): Promise<Company> {
    const response = await fetch(`http://localhost:1323/companies/me`, {
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

