<script lang="ts">
	import { loadingList, list, removeItem } from '$lib/store';
	import IconClose from '@components/icons/icon-close.svelte';
	import IconLoading from '@components/icons/icon-loading.svelte';
</script>

<div class="w-full md:w-[420px]">
	{#if $loadingList}
		<IconLoading classes="mx-auto" />
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
				<p class="text-center">This list is empty</p>
			{/if}
		</ul>
	</div>
</div>
