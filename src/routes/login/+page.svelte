<script lang="ts">
	import type { FormResponse } from './types';
	import Messages from '$lib/messages';
	import Routes from '$lib/routes';

	export let form: null | FormResponse;
	const messageError = Messages.login[form?.error as keyof typeof Messages.login] ?? null;
</script>

<div class="w-full h-full grid place-items-center">
	<form method="post">
		<h1 class="text-3xl font-bold text-center">Log in Todo-List</h1>
		{#if form && messageError}
			<p class="text-center mt-3 text-red-500">{messageError}</p>
		{/if}
		<div class="grid place-items-center">
			<div class="mt-4">
				<input
					class="p-2 w-[20rem] bg-[#404040] outline-none focus:border-[1px] border-white"
					type="text"
					name="username"
					placeholder="Username"
				/>
			</div>
			<div class="mt-4">
				<input
					class="p-2 w-[20rem] bg-[#404040] outline-none focus:border-[1px] border-white"
					type="password"
					name="password"
					placeholder="Password"
				/>
			</div>
		</div>
		<div class="grid place-items-center mt-4">
			<button class="bg-[#1e96ff] px-6 py-2">Log in</button>
			<a class="mt-2 text-blue-400" href={Routes.user.register}>Belum punya akun?</a>
		</div>
	</form>
</div>
