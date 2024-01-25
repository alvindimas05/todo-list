import database from '$lib/database';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { IUser } from './types';
import Routes from '$lib/routes';

export const load = (async () => {
    return {};
}) satisfies PageServerLoad;

export const actions = {
    default: async ({ request, cookies }) => {
        const data = await request.formData();
        const username = data.get("username");
        const password = data.get("password");

        if(username === "" || password === "") return { success: false, error: "empty_inputs" };

        const [results, _fields] = await database.query<IUser[]>("SELECT id FROM users WHERE username=? AND password=?", [username, password]);
        const success = results.length > 0;

        if(!success) return { success, error: "wrong_credentials" }; 

        cookies.set("user_id", results[0].id, { secure: true, httpOnly: true, path: "/" });

        redirect(302, Routes.home);
    }
}