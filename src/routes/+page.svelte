<script lang="ts">
	import UiLogin from '@components/UiLogin.svelte';
	import UiItemInput from '@components/UiItemInput.svelte';
	import { user, loadingList, loading, currentUid } from '$lib/store';
	import UiUserInfo from '@components/UiUserInfo.svelte';
	import UiList from '@components/UiList.svelte';
	import UiQrCode from '@components/UiQrCode.svelte';
	import UiFriendRequest from '@components/UiFriendRequest.svelte';
	import IconLoading from '@components/icons/icon-loading.svelte';
</script>

{#if $loading}
	<IconLoading classes="mx-auto" />
{/if}

<main
	class="flex justify-center gap-4 transition lg:gap-10 {$loading ? 'opacity-0' : 'opacity-100'}"
>
	{#if $user && !$loading}
		{#if $loadingList}
			<IconLoading classes="mx-auto" />
		{/if}

		<section class="flex w-full flex-col items-center gap-10 px-5">
			<UiFriendRequest />

			<UiItemInput />
			<UiList />

			<UiUserInfo />

			<UiQrCode />
		</section>
	{:else}
		<UiLogin />
	{/if}
</main>
