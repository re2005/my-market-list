<script>
	export let color = 'currentColor';
	export let classes = 'h-6 w-6';
</script>

<svg
	width="72"
	height="12"
	viewBox="0 0 72 12"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
	class={classes}
>
	<path
		d="M6 12C9.31371 12 12 9.31371 12 6C12 2.68629 9.31371 0 6 0C2.68629 0 0 2.68629 0 6C0 9.31371 2.68629 12 6 12Z"
		fill={color}
	>
		<animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin="0.1" />
	</path>
	<path
		d="M36 12C39.3137 12 42 9.31371 42 6C42 2.68629 39.3137 0 36 0C32.6863 0 30 2.68629 30 6C30 9.31371 32.6863 12 36 12Z"
		fill="#79CA08"
	>
		<animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin="0.2" />
	</path>
	<path
		d="M66 12C69.3137 12 72 9.31371 72 6C72 2.68629 69.3137 0 66 0C62.6863 0 60 2.68629 60 6C60 9.31371 62.6863 12 66 12Z"
		fill="#79CA08"
	>
		<animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin="0.3" />
	</path>
</svg>
