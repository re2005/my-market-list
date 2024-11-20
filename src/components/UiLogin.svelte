<script lang="ts">
	import { login } from '$lib/auth';
	import IconLoadingCircle from './icons/icon-loading-circle.svelte';

	let email = '';
	let password = '';
	let authError: string | null = null;
	let loading = false;

	const handleLogin = async (event: Event) => {
		event.preventDefault();
		authError = null;
		loading = true;

		try {
			await login(email, password);
			email = '';
			password = '';
		} catch (error: any) {
			authError = error.message || 'Failed to login. Please check your credentials.';
		} finally {
			loading = false;
		}
	};
</script>

<div>
	<p class="text-center text-2xl">Welcome back!</p>
	<form on:submit|preventDefault={handleLogin} class="mt-6 flex flex-col gap-4">
		<div class="flex flex-col gap-3">
			<label for="email" class="flex items-center gap-3">
				<p>Email:</p>
				<input
					bind:value={email}
					required
					name="email"
					id="email"
					placeholder="my-email@gmail.com"
					class="flex-1 rounded border p-3 text-black"
				/>
			</label>
			<label for="password" class="flex items-center gap-3">
				<p>Password</p>
				<input
					bind:value={password}
					required
					type="password"
					name="password"
					id="password"
					placeholder="password"
					class="rounded border p-3 text-black"
				/>
			</label>
		</div>
		<button
			type="submit"
			class="green-gradient-bg flex justify-center rounded p-2 font-bold text-white"
		>
			{#if loading}
				<IconLoadingCircle size={50} color="currentColor" />
			{:else}
				Login
			{/if}
		</button>
	</form>
	<div class="mt-6 w-full text-center text-sm">
		{#if authError}
			<p class="text-red-400">{authError}</p>
		{/if}
	</div>
</div>
