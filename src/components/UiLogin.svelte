<script lang="ts">
	import { login, isValidEmail } from '$lib/auth';
	import IconLoadingCircle from './icons/icon-loading-circle.svelte';
	import { forgotPassword } from '$lib/auth';

	let email = '';
	let password = '';
	let authError: string | null = null;
	let loading = false;
	let forgotPasswordError: string | null = null;
	let emailPasswordSent: boolean = false;
	let loadingEmailPassword: boolean = false;

	async function handleLogin(event: Event) {
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
	}

	async function handleForgotPassword() {
		if (isValidEmail(email)) {
			try {
				loadingEmailPassword = true;
				await forgotPassword(email);
				emailPasswordSent = true;
				return;
			} catch (error: any) {
				forgotPasswordError = error.message || 'Failed to send email. Please try again.';
			} finally {
				loadingEmailPassword = false;
			}
		}
		forgotPasswordError = 'Please enter your email address.';
	}
</script>

<div class="min-w-[300px]">
	<p class="text-center text-2xl">Welcome back :)</p>
	<form on:submit|preventDefault={handleLogin} class="mt-6 flex flex-col gap-4">
		<div class="flex flex-col gap-3">
			<label for="email">
				<p>Email</p>
				<input
					bind:value={email}
					required
					type="email"
					name="email"
					id="email"
					placeholder="my-email@gmail.com"
					autocomplete="email"
					class="w-full rounded border p-3 text-black"
				/>
			</label>

			<label for="password">
				<p>Password</p>
				<input
					bind:value={password}
					required
					type="password"
					name="password"
					id="password"
					placeholder="password"
					autocomplete="current-password"
					class="w-full rounded border p-3 text-black"
				/>
			</label>
		</div>

		<button
			type="submit"
			class="green-gradient-bg flex justify-center rounded p-2 font-bold text-white"
		>
			{#if loading}
				<IconLoadingCircle color="currentColor" />
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

	<div class="mt-10">
		<p class="mt-4 text-center text-lg">
			Don't have an account? <a href="/" class="text-green-600">Sign up</a>
		</p>
	</div>

	<div class="text-md mt-5 text-center">
		{#if !emailPasswordSent}
			<button on:click={() => handleForgotPassword()} class="rounded border p-0.5 px-3">
				{#if loadingEmailPassword}
					<IconLoadingCircle classes="text-gray-300 w-6 h-6" />
				{:else}
					Reset password
				{/if}
			</button>
			{#if forgotPasswordError}
				<div class="mt-1 w-full text-center text-sm">
					<p class="text-red-400">{forgotPasswordError}</p>
				</div>
			{/if}
		{/if}
		{#if emailPasswordSent}
			<div class="text-md w-full text-center">
				<p class="text-gray-400">Email sent. Please check your inbox.</p>
			</div>
		{/if}
	</div>
</div>
