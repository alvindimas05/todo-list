<script lang="ts">
	import '$lib/axios-config';
	import './styles.scss';
	import { SvelteToast } from '@zerodevx/svelte-toast';
</script>

<SvelteToast />
<div class="w-screen h-screen bg-[#181818] text-white">
	<slot />
</div>
