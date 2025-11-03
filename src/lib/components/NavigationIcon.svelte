<script lang="ts">
	interface Props {
		isOrangeMode?: boolean; // Whether the button is over an .orange-menu section
		isOpened?: boolean; // Whether the menu is open (controls X state)
		bgColor?: string; // Background color (default: black)
		lineColor?: string; // Line color (default: white)
		orangeBgColor?: string; // Orange mode background color (default: primary orange)
		orangeLineColor?: string; // Orange mode line color (default: black)
	}

	let {
		isOrangeMode = false,
		isOpened = false,
		bgColor = '#000000',
		lineColor = '#ffffff',
		orangeBgColor = '#fc451e',
		orangeLineColor = '#000000'
	}: Props = $props();
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
	<rect
		width="60"
		height="60"
		class="nav-icon-bg"
		fill={isOrangeMode ? orangeBgColor : bgColor}
	/>

	<!-- Hamburger Lines -->
	<path
		d="M14 19H47"
		class="nav-icon-line line-top"
		class:opened={isOpened}
		stroke={isOrangeMode ? orangeLineColor : lineColor}
	/>
	<path
		d="M14 30H47"
		class="nav-icon-line line-middle"
		class:opened={isOpened}
		stroke={isOrangeMode ? orangeLineColor : lineColor}
	/>
	<path
		d="M14 41H47"
		class="nav-icon-line line-bottom"
		class:opened={isOpened}
		stroke={isOrangeMode ? orangeLineColor : lineColor}
	/>
</svg>

<style>
	.nav-icon {
		display: block;
	}

	.nav-icon-bg {
		transition: fill 300ms ease-in-out;
	}

	.nav-icon-line {
		stroke-width: 3;
		stroke-linecap: round;
		transition:
			stroke 300ms ease-in-out,
			transform 300ms ease-in-out,
			opacity 300ms ease-in-out;
	}

	/* Top line: Move down 11px and rotate 45deg around its center */
	.line-top {
		transform-origin: 30.5px 19px; /* Center of top line */
	}

	.line-top.opened,
	.nav-icon:hover .line-top {
		transform: translateY(11px) rotate(45deg);
	}

	/* Middle line: Fades out */
	.line-middle.opened,
	.nav-icon:hover .line-middle {
		opacity: 0;
	}

	/* Bottom line: Move up 11px and rotate -45deg around its center */
	.line-bottom {
		transform-origin: 30.5px 41px; /* Center of bottom line */
	}

	.line-bottom.opened,
	.nav-icon:hover .line-bottom {
		transform: translateY(-11px) rotate(-45deg);
	}

	/* When opened, maintain the same state on hover */
	.nav-icon:hover .line-top.opened {
		transform: translateY(11px) rotate(45deg);
	}

	.nav-icon:hover .line-middle.opened {
		opacity: 0;
	}

	.nav-icon:hover .line-bottom.opened {
		transform: translateY(-11px) rotate(-45deg);
	}
</style>
