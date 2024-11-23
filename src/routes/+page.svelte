<script lang="ts">
	import UiLogin from '../components/UiLogin.svelte';
	import UiItemInput from '../components/UiItemInput.svelte';
	import { user, loadingList, loading, currentUid } from '$lib/store';
	import UiUserInfo from '../components/UiUserInfo.svelte';
	import UiList from '../components/UiList.svelte';
	import UiQrCode from '../components/UiQrCode.svelte';
</script>

{#if $loading}
	<img src="/icons/loading.svg" alt="loading" width="90" height="90" class="mx-auto" />
{/if}

<main
	class="flex justify-center gap-4 transition lg:gap-10 {$loading ? 'opacity-0' : 'opacity-100'}"
>
	{#if $user && !$loading}
		{#if $loadingList}
			<img src="/icons/loading.svg" alt="loading" width="90" height="90" class="mx-auto" />
		{/if}

		<section class="flex w-full flex-col items-center gap-10 px-5">
			<UiItemInput />
			<UiList />

			<UiUserInfo />

			<UiQrCode {$user} />
		</section>
	{:else}
		<UiLogin />
	{/if}
</main>
