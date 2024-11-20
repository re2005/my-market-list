<script>
	import { user, listFriends, currentUid } from '$lib/store';
	import { logout } from '$lib/auth';

	function handleListChange(event) {
		currentUid.set(event.target.value);
	}
</script>

<div class="mt-4 grid w-full grid-cols-2 items-center gap-3 border-t pt-5">
	<div class="flex flex-col items-center gap-4">
		<p>{$user.email}</p>
		<button on:click={logout} class="rounded bg-gray-400 px-2 py-0.5 text-xs font-bold text-white">
			LOGOUT
		</button>
	</div>
	<div class="flex flex-col items-center justify-center gap-2">
		<p>Your lists</p>
		<select
			on:change={handleListChange}
			bind:value={$currentUid}
			class="rounded border border-gray-300 bg-white px-2 py-1 text-xs"
		>
			<option value={$user.uid}>My list</option>
			{#if $listFriends}
				{#each Object.keys($listFriends) as friend}
					<option value={friend}>{$listFriends[friend]}</option>
				{/each}
			{/if}
		</select>
	</div>
</div>
