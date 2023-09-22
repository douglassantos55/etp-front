import type { PageLoad } from "./$types";

export const load: PageLoad = async function({ params, parent }) {
    const { user } = await parent();
    const contracts = await fetch(`http://localhost:3000/contracts?senderId=${user.id}&resourceId=${params.id}&_sort=date&_limit=5`)

    return { stream: { contracts: contracts.json(), partners: user.users } };
}
