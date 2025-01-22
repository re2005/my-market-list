<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { addFriend } from '$lib/store';
	import { derived } from 'svelte/store';
	import { isValidEmail } from '$lib/auth';

	const hasFriendQuery = derived(page, ($page) => {
		const search = $page.url.searchParams.get('friend');
		const urlQuery = search?.replace(/\?friend=/, '').split(';') ?? [];
		return urlQuery.length === 2 && isValidEmail(urlQuery[1]) ? urlQuery : [];
	});

	let isAccepted: boolean = false;

	function addFriendHandler(): void {
		if ($hasFriendQuery.length === 2) {
			addFriend($hasFriendQuery[0], $hasFriendQuery[1]);
			isAccepted = true;
			goto('/');
		}
	}
</script>

{#if !isAccepted && $hasFriendQuery.length === 2}
	<div class="flex w-full flex-col gap-4 rounded-2xl bg-emerald-400 p-4 text-white">
		<p class="text-center">
			Would you like
			<br />
			<strong>{$hasFriendQuery[1]}</strong>
			<br />
			to join this list
		</p>
		<div class="flex items-center justify-center gap-6">
			<button
				on:click={() => goto('/')}
				class="flex justify-center rounded border border-gray-300 p-2 font-bold text-white"
			>
				Ignore
			</button>
			<button
				on:click={addFriendHandler}
				class="flex justify-center rounded bg-white p-2 px-6 font-bold text-emerald-500"
			>
				Accept
			</button>
		</div>
	</div>
{/if}
