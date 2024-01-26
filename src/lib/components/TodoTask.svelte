<script lang="ts">
	import Fa from 'svelte-fa';
	import type { StatusEnum, TodoData } from './types';
	import { faPen, faPlusCircle, faTrash } from '@fortawesome/pro-solid-svg-icons';
	import axios from 'axios';
	import Routes from '$lib/routes';
	import { createEventDispatcher } from 'svelte';
	import { toast } from '@zerodevx/svelte-toast';

	export let data: TodoData | null = null;

	const dispatch = createEventDispatcher();

	let title = data ? data.title : '';
	let status: StatusEnum;
	let hours: string = data?.hours.toString() ?? '0';
	let minutes: string = data?.minutes.toString() ?? '0';

	async function addTodo() {
		if (title === '') {
			toast.push('Judul tidak boleh kosong!');
			return;
		}

		const postData: TodoData = {
			id: data?.id ?? 0,
			title,
			status,
			minutes: parseInt(minutes),
			hours: parseInt(hours)
		};
		await axios.post(Routes.api.todo.post, postData);
		toast.push('Todo berhasil ditambahkan!');
		dispatch('refetch');
	}

	async function editTodo() {
		if (title === '') {
			toast.push('Judul tidak boleh kosong!');
			return;
		}

		const postData: TodoData = {
			id: data?.id ?? 0,
			title,
			status,
			minutes: parseInt(minutes),
			hours: parseInt(hours)
		};
		await axios.put(`${Routes.api.todo.post}?id=${data?.id}`, postData);
		toast.push('Todo berhasil diedit!');
		dispatch('refetch');
	}

	async function deleteTodo() {
		await axios.delete(`${Routes.api.todo.delete}?id=${data!.id}`);
		toast.push('Todo berhasil dihapus!');
		dispatch('refetch');
	}
</script>

<div
	class="w-full rounded-full p-5 mt-3 grid grid-cols-2"
	class:bg-gray-700={status === 'dijadwalkan'}
	class:bg-blue-900={status === 'dikerjakan'}
	class:bg-green-900={status === 'selesai'}
>
	<div>
		<input
			class="text-xl bg-transparent outline-none"
			placeholder={data ? 'Judul Todo' : 'Tambah Todo'}
			bind:value={title}
		/>
		<div class="grid grid-cols-[min-content_auto]">
			<div class="inline whitespace-nowrap">Jam :&nbsp;</div>
			<div>
				<div class="border-b-[1px] w-fit">
					<select
						name="hours"
						class="bg-transparent appearance-none outline-none text-center cursor-pointer"
						bind:value={hours}
					>
						{#each Array(24) as _, i}
							<option value={i.toString()}>{i < 10 ? '0' : ''}{i}</option>
						{/each}
					</select>
					:
					<select
						name="minutes"
						class="bg-transparent appearance-none outline-none text-center cursor-pointer"
						bind:value={minutes}
					>
						{#each Array(60) as _, i}
							<option value={i.toString()}>{i < 10 ? '0' : ''}{i}</option>
						{/each}
					</select>
				</div>
			</div>
		</div>
	</div>
	<div>
		<div class="text-end">
			Status :
			<select class="text-white bg-transparent cursor-pointer" bind:value={status}>
				{#each ['dijadwalkan', 'dikerjakan', 'selesai'] as stats}
					{#if data && data.status == stats}
						<option value={stats} selected>{stats.charAt(0).toUpperCase() + stats.slice(1)}</option>
					{:else}
						<option value={stats}>{stats.charAt(0).toUpperCase() + stats.slice(1)}</option>
					{/if}
				{/each}
			</select>
		</div>
		<div class="flex justify-end mt-1">
			{#if data}
				<button on:click={editTodo}>
					<Fa color="yellow" icon={faPen} size="lg" />
				</button>
				<button class="ms-2" on:click={deleteTodo}>
					<Fa color="red" icon={faTrash} size="lg" />
				</button>
			{:else}
				<button on:click={addTodo}>
					<Fa class="cursor-pointer" color="cyan" icon={faPlusCircle} size="lg" />
				</button>
			{/if}
		</div>
	</div>
</div>
