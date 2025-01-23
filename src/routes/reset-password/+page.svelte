<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { confirmPasswordReset } from 'firebase/auth';
	import { firebaseAuth } from '$lib/firebase';
	import IconLoadingCircle from '../../components/icons/icon-loading-circle.svelte';

	let newPassword = '';
	let errorMessage = '';
	let successMessage = '';
	let loading = false;

	// Get the `oobCode` from the URL query params
	$: oobCode = $page.url.searchParams.get('oobCode');

	async function resetPassword() {
		if (!oobCode || !newPassword) {
			errorMessage = 'Invalid reset link or missing new password.';
			return;
		}
		loading = true;

		try {
			await confirmPasswordReset(firebaseAuth, oobCode, newPassword);
			successMessage = 'Password reset successfully.';
			errorMessage = '';

			goto('/login');
		} catch (error) {
			errorMessage = 'Failed to reset password: ' + error.message;
			successMessage = ''; // Clear success message
		} finally {
			loading = false;
		}
	}
</script>

<h1 class="text-2xl">Reset your password</h1>

<form on:submit|preventDefault={resetPassword}>
	<div class="mt-10 flex flex-col gap-3">
		<label for="password">
			<p>New Password</p>
			<input
				bind:value={newPassword}
				required
				type="password"
				name="New Password"
				id="password"
				placeholder="password"
				autocomplete="current-password"
				class="w-full rounded border p-3 text-black"
			/>
		</label>

		<button
			type="submit"
			class="green-gradient-bg flex justify-center rounded p-2 font-bold text-white"
		>
			{#if loading}
				<IconLoadingCircle color="currentColor" />
			{:else}
				Reset
			{/if}
		</button>
	</div>
</form>

<div class="mt-6">
	{#if successMessage}
		<p class="text-green-600">{successMessage}</p>
	{/if}

	{#if errorMessage}
		<p class="text-red-600">{errorMessage}</p>
	{/if}
</div>
