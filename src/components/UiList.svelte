<script lang="ts">
	import { loadingList, list, removeItem } from '$lib/store'; // Adjust the path as needed
	import IconClose from '../components/icons/icon-close.svelte'; // Adjust path to your CloseIcon SVG
</script>

<div class="w-full md:w-[420px]">
	{#if $loadingList}
		<img src="/loading.svg" alt="loading" width="90" height="90" class="mx-auto" />
	{/if}

	<div>
		<ul class="grid gap-3">
			{#if $list}
				{#each Object.keys($list).reverse() as item}
					<li class="pl- flex items-center justify-between gap-5 rounded-xl border p-3 font-bold">
						<p>{$list[item]}</p>
						<button on:click={() => removeItem(item, 'list')}>
							<IconClose />
						</button>
					</li>
				{/each}
			{:else if !$loadingList}
				<p class="text-center">Your list is empty.</p>
			{/if}
		</ul>
	</div>
</div>
