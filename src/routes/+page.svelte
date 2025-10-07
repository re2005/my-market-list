<script lang="ts">
	import UiLogin from '@components/UiLogin.svelte';
	import UiItemInput from '@components/UiItemInput.svelte';
	import { user, loadingList, loading, listInvites, confirmFriend } from '$lib/store';
	import UiUserInfo from '@components/UiUserInfo.svelte';
	import UiList from '@components/UiList.svelte';
	import UiQrCode from '@components/UiQrCode.svelte';
	import UiFriendRequest from '@components/UiFriendRequest.svelte';
	import IconLoading from '@components/icons/icon-loading.svelte';
	import UiSignUp from '@components/UiSignUp.svelte';
</script>

{#if $loading}
	<IconLoading classes="mx-auto" />
{/if}

<main
	class="flex flex-col justify-center gap-4 transition lg:gap-10 {$loading
		? 'opacity-0'
		: 'opacity-100'}"
>
	{#if $user && !$loading}
		<section class="flex w-full flex-col items-center gap-10 px-5">
			<UiFriendRequest />

			{#if $listInvites && $listInvites[$user.uid]}
				<div class="flex gap-4 rounded-xl border p-5">
					<p class="">
						The user
						<i class="text-green-500">{Object.values($listInvites[$user.uid])}</i><br />
						added you as a friend
					</p>
					<button
						on:click={() => confirmFriend($listInvites[$user.uid])}
						class="rounded-2xl border border-gray-200 bg-gray-600 px-6 text-lg text-white shadow-lg transition-all hover:opacity-90"
					>
						Accept
					</button>
				</div>
			{/if}

			<UiItemInput />

			<UiList />

			<UiUserInfo />

			<UiQrCode />
		</section>
	{:else}
		<UiSignUp />
	{/if}
</main>
