<script lang="ts">
	import IconClose from './icons/icon-close.svelte';
	import { user } from '$lib/store';

	let isQrCodeVisible = false;
	let qrCodeElement: HTMLElement | null = null;

	const appUrl = import.meta.env.VITE_APP_DOMAIN;

	console.log(`${appUrl}?friend=${$user?.uid};${encodeURIComponent($user?.email)}`);

	async function shareQrCode() {
		const options = {
			width: 180,
			height: 180,
			type: 'svg',
			data: `${appUrl}?friend=${$user?.uid};${encodeURIComponent($user?.email)}`,
			image: `/my-market-list-logo.svg`,
			dotsOptions: {
				type: 'rounded'
			},
			backgroundOptions: {
				color: '#ffffff'
			},
			imageOptions: {
				crossOrigin: 'anonymous',
				margin: 2,
				imageSize: 0.3
			}
		};

		const { default: QRCodeStyling } = await import('qr-code-styling');
		const qrCode = new QRCodeStyling(options);
		if (qrCodeElement) {
			qrCodeElement.innerHTML = '';
			qrCode.append(qrCodeElement);
			isQrCodeVisible = true;
		}
	}

	function closeQrCode() {
		if (qrCodeElement) {
			qrCodeElement.innerHTML = '';
		}
		isQrCodeVisible = false;
	}
</script>

<div class="flex flex-col gap-2" id="qr-share">
	<button
		class="hover:green-gradient-bg flex items-center justify-center gap-3 rounded-xl border p-2 px-4 text-xs"
		on:click={shareQrCode}
	>
		Share my list
	</button>
	<div bind:this={qrCodeElement} id="qr-code"></div>
	{#if isQrCodeVisible}
		<button
			on:click={closeQrCode}
			class="flex items-center justify-center gap-2 text-sm hover:opacity-80"
		>
			<IconClose classes="h-4 w-4 text-gray-500" /> CLOSE
		</button>
	{/if}
</div>

<style>
</style>
