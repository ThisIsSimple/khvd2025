<script lang="ts">
	interface Props {
		isActive?: boolean; // External state (e.g., menu open/close)
	}

	let { isActive = false }: Props = $props();
	let isHovered = $state(false);

	// Show X when either hovered or active
	let shouldShowX = $derived(isHovered || isActive);
</script>

<svg
	width="61"
	height="60"
	viewBox="0 0 61 60"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
	on:mouseenter={() => (isHovered = true)}
	on:mouseleave={() => (isHovered = false)}
	class="cursor-pointer"
>
	<rect width="60" height="60" transform="translate(0.855469)" fill="black" />

	<!-- Top line: rotates to 45deg and moves to center -->
	<path
		d="M14.8555 19H47.3555"
		stroke="white"
		stroke-width="3"
		stroke-linecap="round"
		class="top-line"
		class:active={shouldShowX}
	/>

	<!-- Middle line: fades out -->
	<path
		d="M14.8555 30H47.3555"
		stroke="white"
		stroke-width="3"
		stroke-linecap="round"
		class="middle-line"
		class:active={shouldShowX}
	/>

	<!-- Bottom line: rotates to -45deg and moves to center -->
	<path
		d="M14.8555 41H47.3555"
		stroke="white"
		stroke-width="3"
		stroke-linecap="round"
		class="bottom-line"
		class:active={shouldShowX}
	/>
</svg>

<style>
	path {
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		transform-origin: center;
	}

	/* Top line animation */
	.top-line {
		transform: translateY(0) rotate(0deg);
	}

	.top-line.active {
		transform: translateY(11px) rotate(45deg);
	}

	/* Middle line animation */
	.middle-line {
		opacity: 1;
	}

	.middle-line.active {
		opacity: 0;
	}

	/* Bottom line animation */
	.bottom-line {
		transform: translateY(0) rotate(0deg);
	}

	.bottom-line.active {
		transform: translateY(-11px) rotate(-45deg);
	}
</style>
