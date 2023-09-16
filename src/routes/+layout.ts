import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async function({ url, fetch }) {
    const response = await fetch(`http://localhost:3000/users/${url.searchParams.get('id')}`);
    return { user: await response.json() };
}
