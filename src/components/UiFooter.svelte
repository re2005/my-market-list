<script lang="ts">
	let { buildNumber } = $props<{ buildNumber?: string | null }>();
	const currentYear = new Date().getFullYear();
	const shortBuild = $derived.by(() => buildNumber?.slice(0, 10) ?? null);
</script>

<footer class="flex items-center justify-center gap-4 py-5">
	<p class="text-sm text-gray-700">
		My Market List - Made with ❤ in Amsterdam - {currentYear}
		{#if shortBuild}
			<span class="ml-2 block text-xs text-gray-500 sm:inline">Build {shortBuild}</span>
		{/if}
	</p>
</footer>
