import { connection } from '$lib/database';
import type { PageServerLoad } from './$types';

export const load = (async () => {
    return {};
}) satisfies PageServerLoad;

export const actions = {
    default: async ({ request }) => {
        const data = await request.formData();
        const username = data.get("username");
        const password = data.get("password");
        const confirmPassword = data.get("confirm_password");

        if(password != confirmPassword) return { success: false, error: "password_not_match" };

        const [results, _fields] = await connection.query("SELECT id FROM users WHERE username=?", [username]);
        const exist = (results as []).length > 0;
        
        if(exist) return { success: false, error: "username_exists" };

        await connection.query("INSERT INTO users (username, password) VALUES (?, ?)", [username, password]);
        return { success: true };
    }
}