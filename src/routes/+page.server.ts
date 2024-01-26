import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import Routes from '$lib/routes';

export const load = (async ({ cookies }) => {
	if (!cookies.get('user_id')) {
		redirect(302, Routes.user.login);
	}

	return {};
}) satisfies PageServerLoad;
