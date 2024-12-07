<script lang="ts">
	import { addItem, listSuggest, loading } from '$lib/store'; // Replace with your store path
	import SuggestList from './UiSuggestList.svelte'; // Adjust the path as needed
	import IconClose from './icons/icon-close.svelte';

	let inputValue = '';

	const onAddItem = (item: string) => {
		addItem(item);
		inputValue = '';
	};

	const handleSubmit = (event: Event) => {
		event.preventDefault();
		onAddItem(inputValue);
	};
</script>

<div class={`relative w-full ${$loading ? 'pointer-events-none' : ''}`}>
	<form on:submit|preventDefault={handleSubmit} class="flex justify-center gap-3">
		<div class="relative">
			<input
				bind:value={inputValue}
				required
				name="item"
				id="item"
				placeholder="Strawberries"
				autocomplete="off"
				class="w-full rounded-2xl border px-3 py-2 text-black shadow md:w-72"
			/>
			{#if inputValue.length > 0}
				<button
					type="button"
					class="absolute right-3 top-3 text-gray-400"
					on:click={() => (inputValue = '')}
				>
					<IconClose classes="h-5 w-5" />
				</button>
			{/if}
		</div>
		<button
			type="submit"
			id="add-item"
			class="green-gradient-bg rounded-2xl border border-gray-200 px-6 text-lg text-white shadow-lg transition-all hover:opacity-90"
		>
			add
		</button>
	</form>

	<SuggestList suggestsList={$listSuggest} item={inputValue} {onAddItem} />
</div>
