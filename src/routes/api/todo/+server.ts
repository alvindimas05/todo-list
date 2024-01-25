import database from '$lib/database';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { StatusEnum, TodoData, TodoDatabase } from '$lib/components/types';

export const GET: RequestHandler = async ({ cookies }) => {
    const [results, _fields] = await database.query<TodoDatabase[]>("SELECT * FROM todos WHERE user_id=? ORDER BY time", [cookies.get("user_id")]);

    let todos: TodoData[] = results.map<TodoData>(todo_db => {
        const timeSplit = todo_db.time.split(":");

        let todo: TodoData = {
            title: todo_db.title,
            status: todo_db.status as StatusEnum,
            hours: parseInt(timeSplit[0]),
            minutes: parseInt(timeSplit[0]),
        };
        return todo;
    });
    return json(todos);
};

export const POST: RequestHandler = async({ request, cookies }) => {
    const data: TodoData = await request.json();
    const time = `${data.hours}:${data.minutes}:00`;

    await database.query("INSERT INTO todos (title, time, status, user_id) VALUES (?, ?, ?, ?)", [data.title, time, data.status, cookies.get("user_id")]);

    return json({ success: true });
};