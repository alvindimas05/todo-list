import { connection } from '$lib/database';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import Routes from "$lib/routes";

export const load = (async () => {
    return {};
}) satisfies PageServerLoad;

export const actions = {
    default: async ({ request, cookies }) => {
        const data = await request.formData();
        const username = data.get("username");
        const password = data.get("password");
        const confirmPassword = data.get("confirm_password");

        if (password != confirmPassword) return { success: false, error: "password_not_match" };

        const [results, _fields] = await connection.query("SELECT id FROM users WHERE username=?", [username]);
        const exist = (results as []).length > 0;

        if (exist) return { success: false, error: "username_exists" };

        const user_id = crypto.randomUUID();
        await connection.query("INSERT INTO users VALUES (?, ?, ?)", [user_id, username, password]);

        cookies.set("user_id", user_id, { secure: true, httpOnly: true, path: "/" });
        redirect(302, Routes.home);
    }
}