import { makeAuthGet } from "$lib/api";

export function getCategories(fetch: Function): Promise<Category[]> {
    return makeAuthGet<Category[]>('research/categories/me', fetch);
}
