<script lang="ts">
	import { signUp } from '$lib/auth';
	import IconLoading from './icons/icon-loading-circle.svelte';
	import { isValidEmail, login } from '$lib/auth';

	let newUser: boolean = true;
	let email: string = '';
	let password: string = '';
	let errors: string | null = null;
	let loading: boolean = false;

	// watch the email field
	$: if (isValidEmail(email)) {
		console.log(email);
	}

	async function handleEmailCheck() {
		if (isValidEmail(email)) {
			try {
				await login(email, 'password');
			} catch (error: any) {
				newUser = error.message === 'EMAIL_NOT_FOUND';
			}
		}
	}

	async function handleForm(event: Event): Promise<void> {
		event.preventDefault();
		loading = true;

		try {
			const { error }: any = await signUp(email, password);
			if (error) {
				errors = error.code.replace(/auth\//, '').replace(/-/g, ' ');
			}
		} catch (error: any) {
			errors = error.code.replace(/auth\//, '').replace(/-/g, ' ');
		} finally {
			loading = false;
		}
	}
</script>

<div class="min-w-[300px]">
	<p class="text-center text-2xl">Register to create a list</p>
	<form on:submit|preventDefault={handleForm} class="mt-6 flex flex-col gap-4">
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
					class="w-full rounded border p-3 text-black"
					autocomplete="off"
					on:blur={() => handleEmailCheck()}
				/>
			</label>

			{#if email && !newUser}
				<label for="new-password">
					<p>Password</p>
					<input
						bind:value={password}
						required
						type="password"
						name="password"
						id="new-password"
						placeholder="password"
						class="w-full rounded border p-3 text-black"
						autocomplete="new-password"
					/>
				</label>
			{/if}
		</div>

		<!-- Submit Button -->
		{#if email && !newUser}
			<button
				type="submit"
				class="flex justify-center rounded p-2 font-bold text-white {password.length > 6
					? 'green-gradient-bg'
					: 'bg-gray-400'}"
				disabled={password.length < 6}
			>
				{#if loading}
					<IconLoading classes="w-6" />
				{:else}
					Sign up
				{/if}
			</button>
		{/if}
	</form>

	<div class="mt-10">
		<p class="text-md mt-4 text-center">
			Have an account? <a href="/login" class="text-green-600">Login</a>
		</p>
	</div>

	<!-- Error Display -->
	<div class="mt-6 w-full text-center text-sm">
		<p class="capitalize text-red-400">{errors}</p>
	</div>
</div>

<style>
	/* Additional styles can go here, or use Tailwind CSS */
</style>
