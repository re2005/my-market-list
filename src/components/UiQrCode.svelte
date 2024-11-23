<script lang="ts">
	// import { onMount } from 'svelte';
	import IconShare from './icons/icon-share.svelte';
	import IconClose from './icons/icon-close.svelte';
	let user = {
		uid: '',
		email: ''
	};

	let isQrCodeVisible = false;
	let qrCodeElement: HTMLElement | null = null;

	async function shareQrCode() {
		const options = {
			width: 180,
			height: 180,
			type: 'svg',
			data: `https://mymarketlist.vercel.app?friend=${user.uid};${encodeURIComponent(user.email)}`,
			image: 'https://mymarketlist.vercel.app/my-market-list-logo.svg',
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
		<IconShare classes="h-4 w-4 text-gray-500" /> Share my list
	</button>
	<div bind:this={qrCodeElement} id="qr-code"></div>
	{#if isQrCodeVisible}
		<button on:click={closeQrCode} class="flex items-center justify-center gap-2 text-sm">
			<IconClose classes="h-4 w-4 text-gray-500" /> CLOSE
		</button>
	{/if}
</div>

<style>
</style>
