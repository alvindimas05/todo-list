<script lang="ts">
	import Fa from 'svelte-fa';
	import type { StatusEnum, TodoData } from './types';
	import { faPen, faPlusCircle } from '@fortawesome/pro-solid-svg-icons';
	import axios from 'axios';
	import Routes from '$lib/routes';
	import { createEventDispatcher } from 'svelte';

	export let data: TodoData | null = null;

	const dispatch = createEventDispatcher();

	let title = data ? data.title : '';
	let status: StatusEnum;
	let minutes: string;
	let hours: string;

	async function addTodo() {
		const postData: TodoData = {
			title,
			status,
			minutes: parseInt(minutes),
			hours: parseInt(hours)
		};
		await axios.post(Routes.api.todo.post, postData);
		dispatch("refetch");
	}
</script>

<div class="w-full bg-gray-700 rounded-full p-5 mt-3 grid grid-cols-2">
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
							{#if data && data.hours === i}
								<option value={i} selected>{i < 10 ? '0' : ''}{i}</option>
							{:else}
								<option value={i}>{i < 10 ? '0' : ''}{i}</option>
							{/if}
						{/each}
					</select>
					:
					<select
						name="minutes"
						class="bg-transparent appearance-none outline-none text-center cursor-pointer"
						bind:value={minutes}
					>
						{#each Array(60) as _, i}
							{#if data && data.minutes === i}
								<option value={i} selected>{i < 10 ? '0' : ''}{i}</option>
							{:else}
								<option value={i}>{i < 10 ? '0' : ''}{i}</option>
							{/if}
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
				<button>
					<Fa color="yellow" icon={faPen} size="lg"/>
				</button>
			{:else}
				<button on:click={addTodo}>
					<Fa class="cursor-pointer" color="cyan" icon={faPlusCircle} size="lg" />
				</button>
			{/if}
		</div>
	</div>
</div>
