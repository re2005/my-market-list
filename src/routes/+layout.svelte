<script lang="ts">
	import '../app.css';
	import UiFooter from '@components/UiFooter.svelte';
	import UiHeader from '@components/UiHeader.svelte';
	import { onDestroy, onMount } from 'svelte';

	let { children, data } = $props<{ children: unknown; data: { buildNumber: string | null } }>();
	const buildNumber = $derived.by(() => data?.buildNumber ?? null);

	let refreshInterval: ReturnType<typeof setInterval> | undefined;
	let registrationUpdateInterval: ReturnType<typeof setInterval> | undefined;

	onMount(async () => {
		if (!('serviceWorker' in navigator)) {
			return;
		}

		try {
			const { registerSW } = await import('virtual:pwa-register');
			const updateServiceWorker = registerSW({
				immediate: true,
				onNeedRefresh() {
					void updateServiceWorker()
						.then(() => {
							window.location.reload();
						})
						.catch((error) => {
							console.error('Service worker refresh failed', error);
						});
				},
				onRegisteredSW(_swUrl, registration) {
					if (!registration) {
						return;
					}

					const hourInMs = 60 * 60 * 1000;
					registrationUpdateInterval = setInterval(() => {
						void registration.update().catch((error) => {
							console.error('Service worker registration update failed', error);
						});
					}, hourInMs);
				},
				onRegisterError(error) {
					console.error('Service worker registration failed', error);
				}
			});

			refreshInterval = setInterval(
				() => {
					void updateServiceWorker().catch((error) => {
						console.error('Periodic service worker update failed', error);
					});
				},
				15 * 60 * 1000
			);
		} catch (error) {
			console.error('Failed to load service worker registration helper', error);
		}
	});

	onDestroy(() => {
		const clear = (interval?: ReturnType<typeof setInterval>) => {
			if (interval) {
				clearInterval(interval);
			}
		};

		clear(refreshInterval);
		clear(registrationUpdateInterval);

		refreshInterval = undefined;
		registrationUpdateInterval = undefined;
	});
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
		<UiFooter {buildNumber} />
	</div>
</div>
