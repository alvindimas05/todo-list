<script lang="ts">
	import Fa from 'svelte-fa';
	import type { TodoTaskData } from './types';
	import { faPlusCircle } from '@fortawesome/pro-solid-svg-icons';

	export let data: TodoTaskData | null = null;
</script>

<div class="w-full bg-gray-700 rounded-full p-5 mt-3 grid grid-cols-2">
	<div>
		<input
			class="text-xl bg-transparent outline-none"
			value={data ? data.title : ''}
			placeholder={data ? 'Judul Todo' : 'Tambah Todo'}
		/>
		<div class="grid grid-cols-[min-content_auto]">
			<div class="inline whitespace-nowrap">Jam :&nbsp;</div>
			<div>
				<div class="border-b-[1px] w-fit">
					<select name="hours" class="bg-transparent appearance-none outline-none text-center">
						{#each Array(24) as _, i}
							{#if data && data.time.getHours() === i}
								<option value={i} selected>{i < 10 ? '0' : ''}{i}</option>
							{:else}
								<option value={i}>{i < 10 ? '0' : ''}{i}</option>
							{/if}
						{/each}
					</select>
					:
					<select name="minutes" class="bg-transparent appearance-none outline-none text-center">
						{#each Array(60) as _, i}
							{#if data && data.time.getMinutes() === i}
								<option value={i} selected>{i + 1 < 10 ? '0' : ''}{i}</option>
							{:else}
								<option value={i}>{i + 1 < 10 ? '0' : ''}{i}</option>
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
			<select class="text-white bg-transparent">
				<option value="Dijadwalkan" selected>Dijadwalkan</option>
				<option value="Dijadwalkan">Dikerjakan</option>
				<option value="Dijadwalkan">Selesai</option>
			</select>
		</div>
		<div class="flex justify-end mt-1">
			<Fa class="cursor-pointer" color="cyan" icon={faPlusCircle} size="lg" />
		</div>
	</div>
</div>
