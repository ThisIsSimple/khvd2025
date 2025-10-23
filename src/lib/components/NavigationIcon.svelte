<script lang="ts">
	interface Props {
		isOrangeMode?: boolean; // Whether the button is over an .orange-menu section
	}

	let { isOrangeMode = false }: Props = $props();
</script>

<svg
	width="100%"
	height="100%"
	viewBox="0 0 60 60"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
	class="nav-icon"
	aria-hidden="true"
>
	<!-- Background -->
	<rect width="60" height="60" class="nav-icon-bg" class:orange-mode={isOrangeMode} />

	<!-- Hamburger Lines -->
	<path d="M14 19H47" class="nav-icon-line" class:orange-mode={isOrangeMode} />
	<path d="M14 30H47" class="nav-icon-line" class:orange-mode={isOrangeMode} />
	<path d="M14 41H47" class="nav-icon-line" class:orange-mode={isOrangeMode} />
</svg>

<style>
	.nav-icon {
		display: block;
	}

	.nav-icon-bg {
		fill: #000000;
		transition: fill 300ms ease-in-out;
	}

	.nav-icon-bg.orange-mode {
		fill: #fc451e;
	}

	.nav-icon-line {
		stroke: #ffffff;
		stroke-width: 3;
		stroke-linecap: round;
		transition: stroke 300ms ease-in-out;
	}

	.nav-icon-line.orange-mode {
		stroke: #000000;
	}
</style>
