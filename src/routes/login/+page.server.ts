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

        if(username === "" || password === "") return { success: false, error: "empty_inputs" };

        const [results, _fields] = await connection.query("SELECT id FROM users WHERE username=? AND password=?", [username, password]);
        const success = (results as []).length > 0;
        return { success, error: "wrong_credentials" }; 
    }
}