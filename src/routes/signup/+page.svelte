<script lang="ts">
	import { goto } from '$app/navigation';
	import { user } from '$lib/store';
	import UiSignUp from '@components/UiSignUp.svelte';

	user.subscribe((value) => {
		if (value) {
			goto('/');
		}
	});
</script>

<section class="flex justify-center gap-4 lg:gap-10">
	<UiSignUp />
</section>
