<script lang="ts">
	import '../app.css';
	import UiFooter from '@components/UiFooter.svelte';
	import UiHeader from '@components/UiHeader.svelte';

	let { children, data } = $props<{ children: unknown; data: { buildNumber: string | null } }>();
	const buildNumber = $derived.by(() => data?.buildNumber ?? null);
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" />
	<link
		href="https://fonts.googleapis.com/css2?family=Dosis:wght@500;700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div class="flex min-h-screen flex-col">
	<a href="/">
		<UiHeader />
	</a>
	<div class="container mx-auto my-4 mt-10 max-w-md md:mt-14">
		{@render children()}
	</div>
	<div class="mt-auto">
		<UiFooter buildNumber={buildNumber} />
	</div>
</div>
