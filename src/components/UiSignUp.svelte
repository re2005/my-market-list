<script lang="ts">
	import { signUp } from '$lib/auth';
	import IconLoading from './icons/icon-loading-circle.svelte';

	let email: string = '';
	let password: string = '';
	let errors: string | null = null;
	let loading: boolean = false;

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
				/>
			</label>

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
		</div>

		<!-- Submit Button -->
		<button
			type="submit"
			class="green-gradient-bg flex justify-center rounded p-2 font-bold text-white"
		>
			{#if loading}
				<IconLoading classes="w-6" />
			{:else}
				Sign up
			{/if}
		</button>
	</form>

	<!-- Error Display -->
	<div class="mt-6 w-full text-center text-sm">
		<p class="capitalize text-red-400">{errors}</p>
	</div>
</div>

<style>
	/* Additional styles can go here, or use Tailwind CSS */
</style>
