<script lang="ts">
	import { goto } from '$app/navigation';
	import { user } from '$lib/store';
	import UiLogin from '@components/UiLogin.svelte';

	user.subscribe((value) => {
		if (value) {
			goto('/');
		}
	});
</script>

<section class="flex justify-center gap-4 lg:gap-10">
	<UiLogin />
</section>
