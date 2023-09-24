import type { LayoutLoad } from "./$types";

export const load: LayoutLoad = async function({ fetch }) {
    const response = await fetch('http://localhost:3000/categories?_embed=resources');
    return { categories: await response.json() };
}
