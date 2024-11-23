<script lang="ts">
	import { user, listFriends, currentUid, removeFriend } from '$lib/store';
	import { logout } from '$lib/auth';

	function handleListChange(event: Event) {
		currentUid.set((event.target as HTMLSelectElement).value);
	}
</script>

<div class="mt-4 grid w-full grid-cols-2 gap-3 border-t border-t-gray-200 pt-6">
	<div class="flex flex-col gap-2 text-sm">
		<p>{$user?.email}</p>
		<button
			on:click={logout}
			class="self-start rounded bg-gray-400 px-3 py-1 text-xs font-bold text-white hover:opacity-60"
		>
			LOGOUT
		</button>
	</div>
	<div class="flex flex-col items-end gap-2">
		<div class="flex gap-2">
			<p>Lists connected</p>
			{#if $user?.uid !== $currentUid}
				<button on:click={() => removeFriend($currentUid!)} class="color-red-400 text-xs"
					>remove</button
				>
			{/if}
		</div>
		<select
			on:change={handleListChange}
			bind:value={$currentUid}
			class="rounded border border-gray-300 bg-white px-2 py-1 text-xs"
		>
			<option value={$user?.uid}>My list</option>
			{#if $listFriends}
				{#each Object.keys($listFriends) as friend}
					<option value={friend}>{$listFriends[friend]}</option>
				{/each}
			{/if}
		</select>
	</div>
</div>
