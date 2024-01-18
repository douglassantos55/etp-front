import { goto } from "$app/navigation";
import { HttpError } from "$lib/errors";
import type { HandleClientError } from "@sveltejs/kit";

export const handleError: HandleClientError = function({ error }) {
    if (error instanceof HttpError) {
        if (error.isAuthenticationError()) {
            return goto("/login");
        }
    }
}
