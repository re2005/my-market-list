<script lang="ts">
	import IconClose from '../components/icons/icon-close.svelte'; // Adjust the path as needed
	import { writable } from 'svelte/store';
	import { removeItem } from '$lib/store'; // Replace with your store or context

	export let suggestsList: Record<string, { value: string; amount: number }> | null = null;
	export let item: string = '';
	export let onAddItem: (suggest: string) => void;

	let suggests = writable<string[]>([]);

	console.log(suggestsList);

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
					<button on:click={() => addItem(suggest)} class="flex flex-1 pl-1">
						{suggest}
					</button>
					<button on:click={() => removeItem(suggest, 'list_suggest')}>
						<IconClose classes="h-6 w-6 text-red-300" />
					</button>
				</li>
			{/each}
		</ul>
	{/if}
</div>
