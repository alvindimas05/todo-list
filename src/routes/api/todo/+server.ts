import database from '$lib/database';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { StatusEnum, TodoData, TodoDatabase } from '$lib/components/types';

export const GET: RequestHandler = async ({ cookies }) => {
	const [results] = await database.query<TodoDatabase[]>(
		'SELECT * FROM todos WHERE user_id=? ORDER BY time',
		[cookies.get('user_id')]
	);

	const todos: TodoData[] = results.map<TodoData>((todo_db) => {
		const timeSplit = todo_db.time.split(':');

		const todo: TodoData = {
			id: todo_db.id,
			title: todo_db.title,
			status: todo_db.status as StatusEnum,
			hours: parseInt(timeSplit[0]),
			minutes: parseInt(timeSplit[1])
		};
		return todo;
	});
	return json(todos);
};

export const POST: RequestHandler = async ({ request, cookies }) => {
	const data: TodoData = await request.json();
	const time = `${data.hours}:${data.minutes}:00`;

	await database.query('INSERT INTO todos (title, time, status, user_id) VALUES (?, ?, ?, ?)', [
		data.title,
		time,
		data.status,
		cookies.get('user_id')
	]);

	return json({ success: true });
};

export const PUT: RequestHandler = async ({ request, cookies, url }) => {
	const data: TodoData = await request.json();
	const time = `${data.hours}:${data.minutes}:00`;

	await database.query('UPDATE todos SET title=?, time=?, status=? WHERE id=? AND user_id=?', [
		data.title,
		time,
		data.status,
		url.searchParams.get('id'),
		cookies.get('user_id')
	]);

	return json({ success: true });
};

export const DELETE: RequestHandler = async ({ url, cookies }) => {
	await database.query('DELETE FROM todos WHERE id=? AND user_id=?', [
		url.searchParams.get('id'),
		cookies.get('user_id')
	]);
	return json({ success: true });
};
