import { fail, redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";

export const actions: Actions = {
    default: async function({ cookies, request }) {
        const credentials = await request.formData();

        const username = credentials.get("username");
        const password = credentials.get("password");

        if (username !== "admin" || password !== "password") {
            return fail(400, { error: true, message: "Invalid credentials" });
        }

        cookies.set("access_token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwiY29tcGFueV9uYW1lIjoiQ29jYS1Db2xhIiwiaWF0IjoxNTE2MjM5MDIyLCJjb21wYW55X2xvZ28iOiJodHRwczovL3BpY3N1bS5waG90b3MvMTAwIiwiYXZhaWxhYmxlX2Nhc2giOjE1MjMwLCJhdmFpbGFibGVfc2xvdHMiOjN9.DCmgYQaZu_Myg-QPYbuPX1I5PVgsjjfSJhT4UrZiYYM", { path: "/" });
        throw redirect(302, "/");
    }
}
