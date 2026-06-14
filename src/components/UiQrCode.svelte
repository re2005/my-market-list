<script lang="ts">
	import IconClose from './icons/icon-close.svelte';
	import IconWhatsapp from './icons/icon-whatsapp.svelte';
	import { user } from '$lib/store';

	let isQrCodeVisible = false;
	let qrCodeElement: HTMLElement | null = null;
	let shareUrl = '';

	function getShareUrl() {
		return `${window.location.origin}?friend=${$user?.uid};${encodeURIComponent($user?.email as string)}`;
	}

	function getWhatsappUrl() {
		const message = `Here is the link to access my list: ${shareUrl}`;
		return `https://wa.me/?text=${encodeURIComponent(message)}`;
	}

	async function shareQrCode() {
		shareUrl = getShareUrl();

		const options = {
			width: 180,
			height: 180,
			type: 'svg',
			data: shareUrl,
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
		<a
			href={getWhatsappUrl()}
			target="_blank"
			rel="noopener noreferrer"
			class="flex items-center justify-center gap-2 rounded-xl border border-green-500 p-2 px-4 text-xs text-green-600 hover:bg-green-50"
		>
			<IconWhatsapp classes="h-4 w-4" color="#16a34a" />
			Share on WhatsApp
		</a>
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
