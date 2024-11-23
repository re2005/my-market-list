<script lang="ts">
	import IconClose from '../components/icons/icon-close.svelte'; // Adjust the path as needed
	import { writable } from 'svelte/store';
	import { removeItem } from '$lib/store'; // Replace with your store or context

	export let suggestsList: Record<string, { value: string; amount: number }> | null = null;
	export let item: string = '';
	export let onAddItem: (suggest: string) => void;

	let suggests = writable<string[]>([]);
	let sureToRemove = writable<string[]>([]);

	// Reactive block to filter suggestions whenever `item` or `suggestsList` changes
	$: {
		if (item && item.length >= 2) {
			const query = item.toLowerCase();
			const filteredSuggests = suggestsList
				? Object.keys(suggestsList)
						.filter(
							(suggestKey) => suggestsList[suggestKey] && suggestKey.toLowerCase().includes(query)
						)
						.sort((a, b) => suggestsList[b].amount - suggestsList[a].amount)
						.map((suggestKey) => suggestsList[suggestKey].value)
				: [];
			suggests.set(filteredSuggests);
		} else {
			suggests.set([]);
		}
	}

	const addItem = (suggest: string) => {
		onAddItem(suggest);
	};
</script>

<div class="absolute top-14 flex w-full justify-center">
	{#if $suggests.length !== 0}
		<ul
			class="left-10 right-10 top-14 flex h-[184px] w-full flex-col gap-2 overflow-scroll rounded-2xl border bg-gray-50 px-2 py-1 shadow md:w-[430px]"
		>
			{#each $suggests as suggest, index}
				<li class="flex items-center justify-between gap-5 rounded-xl px-3 py-1 hover:bg-green-100">
					<button on:click={() => addItem(suggest)} class="flex flex-1 pl-1 text-left">
						{suggest}
					</button>
					<button on:click={() => sureToRemove.set([suggest])} class="hover:opacity-80">
						<IconClose classes="h-5 w-5 text-red-400" />
					</button>
					{#if $sureToRemove.includes(suggest)}
						<div class="fade-in flex gap-3 text-xs">
							<button
								on:click={() => removeItem(suggest, 'list_suggest')}
								class="text-green-600 hover:opacity-80"
							>
								confirm
							</button>
							<button
								on:click={() => sureToRemove.update((n) => n.filter((item) => item !== suggest))}
								class="text-gray-500">cancel</button
							>
						</div>
					{/if}
				</li>
			{/each}
		</ul>
		<div class="gradient-bg absolute bottom-0 h-10 w-[99.6%] w-full rounded-xl"></div>
	{/if}
</div>

<style>
	.gradient-bg {
		background: linear-gradient(180deg, transparent 30%, #f6f6f6 100%);
	}
	.fade-in {
		animation: fadeIn 0.15s ease-out;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
			max-width: 0;
		}
		to {
			opacity: 1;
			max-width: 100px;
		}
	}
</style>
