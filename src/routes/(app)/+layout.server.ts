import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async function({ fetch, cookies }) {
    const accessToken = cookies.get("access_token");
    if (!accessToken) {
        throw redirect(302, "/login");
    }
    const response = await fetch(`http://localhost:3000/users/1?_expand=users`);
    return { user: await response.json() };
}
