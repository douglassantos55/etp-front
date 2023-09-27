import type { PageLoad } from "./$types";

export const load: PageLoad = async function({ fetch }) {
    const categories = await fetch(`http://localhost:3000/categories?_embed=resources`);
    return { categories: await categories.json() };
}
