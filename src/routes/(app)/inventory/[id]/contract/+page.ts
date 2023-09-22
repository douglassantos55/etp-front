import type { PageLoad } from "./$types";

export const load: PageLoad = async function({ parent }) {
    const { user } = await parent();
    return { partners: user.users };
}
