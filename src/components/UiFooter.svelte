<script lang="ts">
	let { buildNumber } = $props<{ buildNumber?: string | null }>();
	const currentYear = new Date().getFullYear();
	const shortBuild = $derived.by(() => buildNumber?.slice(0, 10) ?? null);
</script>

<footer class="flex flex-col items-center justify-center gap-2 py-5">
	<p class="text-sm text-gray-700">
		My Market List - Made with ❤ in Amsterdam - {currentYear}
	</p>
	{#if shortBuild}
		<span class="text-xs text-gray-400">Build {shortBuild}</span>
	{/if}
</footer>
