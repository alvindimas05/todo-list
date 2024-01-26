<script lang="ts">
	import TodoTask from '$lib/components/TodoTask.svelte';
	import type { TodoData } from '$lib/components/types';
	import Routes from '$lib/routes';
	import axios from 'axios';

	let todos: TodoData[] | null = null;

	async function getTodos() {
		todos = null;
		todos = (await axios.get<TodoData[]>(Routes.api.todo.get)).data;
	}
	getTodos();
</script>

<div class="w-full flex justify-center">
	<div class="w-full md:w-[60rem] pt-10">
		<h1 class="text-[2rem] font-bold text-center">Todo-List Hari Ini</h1>
		{#if todos}
			{#each todos as todo}
				<TodoTask data={todo} on:refetch={getTodos} />
			{/each}
			<TodoTask on:refetch={getTodos} />
		{/if}
	</div>
</div>
