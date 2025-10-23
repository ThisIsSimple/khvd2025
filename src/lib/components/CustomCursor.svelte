<script lang="ts">
	import { onMount } from 'svelte';
	import { UAParser } from 'ua-parser-js';

	// Mouse position state
	let mouseX = $state(0);
	let mouseY = $state(0);

	// Hover state for clickable elements
	let isHovering = $state(false);

	// Device detection state
	let isMobile = $state(false);

	// Cursor color state based on background
	let cursorColor = $state('#545454');

	// Primary color constant
	const PRIMARY_COLOR = '#FC451E';

	// Track mouse position
	function handleMouseMove(e: MouseEvent) {
		mouseX = e.clientX;
		mouseY = e.clientY;
	}

	// Helper function to parse RGB color string to RGB values
	function parseRgb(color: string): { r: number; g: number; b: number } | null {
		const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
		if (match) {
			return { r: parseInt(match[1]), g: parseInt(match[2]), b: parseInt(match[3]) };
		}
		return null;
	}

	// Calculate relative luminance (0-1 scale)
	function getLuminance(r: number, g: number, b: number): number {
		// Normalize RGB values to 0-1 range
		const [rs, gs, bs] = [r / 255, g / 255, b / 255].map((val) =>
			val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4)
		);
		return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
	}

	// Check if color is close to primary orange
	function isOrangeBackground(r: number, g: number, b: number): boolean {
		// Primary color RGB: #FC451E -> (252, 69, 30)
		const primaryR = 252,
			primaryG = 69,
			primaryB = 30;
		const threshold = 50; // Color distance threshold

		const distance = Math.sqrt(
			Math.pow(r - primaryR, 2) + Math.pow(g - primaryG, 2) + Math.pow(b - primaryB, 2)
		);

		return distance < threshold;
	}

	// Detect background color and determine cursor color
	function detectBackgroundColor(element: Element | null): string {
		if (!element) return '#545454';

		let currentElement: Element | null = element;

		// Traverse up to check for special cursor classes first, then background color
		while (currentElement && currentElement !== document.body) {
			// Priority 1: Check for special cursor color classes
			// These override any background color detection
			if (currentElement.classList.contains('black-cursor')) {
				return '#545454'; // Force black/dark gray cursor
			}
			if (currentElement.classList.contains('orange-cursor')) {
				return PRIMARY_COLOR; // Force orange cursor
			}
			if (currentElement.classList.contains('white-cursor')) {
				return '#ffffff'; // Force white cursor
			}

			// Priority 2: Check background color (only if not transparent)
			const bgColor = window.getComputedStyle(currentElement).backgroundColor;

			// Only check background color if it's not transparent
			if (bgColor !== 'transparent' && bgColor !== 'rgba(0, 0, 0, 0)') {
				const rgb = parseRgb(bgColor);
				if (rgb) {
					// Check if orange/primary background
					if (isOrangeBackground(rgb.r, rgb.g, rgb.b)) {
						return '#ffffff'; // White cursor on orange background
					}

					// Calculate luminance to determine if light or dark
					const luminance = getLuminance(rgb.r, rgb.g, rgb.b);

					// Light/medium background (white to #999999) -> dark cursor (#545454)
					// Threshold 0.32 corresponds to approximately #999999 (RGB 153,153,153)
					if (luminance > 0.32) {
						return '#545454';
					}
					// Dark background (darker than #999) -> orange cursor
					else {
						return PRIMARY_COLOR;
					}
				}
			}

			// Move to parent element (whether transparent or color check failed)
			currentElement = currentElement.parentElement;
		}

		// Default: check body background and special classes
		const body = document.body;
		if (body.classList.contains('black-cursor')) return '#545454';
		if (body.classList.contains('orange-cursor')) return PRIMARY_COLOR;
		if (body.classList.contains('white-cursor')) return '#ffffff';

		const bodyBg = window.getComputedStyle(body).backgroundColor;
		const bodyRgb = parseRgb(bodyBg);
		if (bodyRgb) {
			const luminance = getLuminance(bodyRgb.r, bodyRgb.g, bodyRgb.b);
			// Apply same threshold: #999 and lighter = #545454, darker = primary orange
			return luminance > 0.32 ? '#545454' : PRIMARY_COLOR;
		}

		return '#545454'; // Default dark cursor
	}

	// Check if element or any parent is clickable
	function isClickable(element: Element | null): boolean {
		if (!element) return false;

		const clickableTags = ['A', 'BUTTON', 'INPUT', 'TEXTAREA', 'SELECT'];
		const clickableRoles = ['button', 'link'];

		let currentElement: Element | null = element;

		// Traverse up the DOM tree to check parents
		while (currentElement && currentElement !== document.body) {
			// Check data-clickable attribute (for custom interactive elements like exhibition map areas)
			if (currentElement.getAttribute('data-clickable') === 'true') return true;

			// Check tag name
			if (clickableTags.includes(currentElement.tagName)) return true;

			// Check role attribute
			const role = currentElement.getAttribute('role');
			if (role && clickableRoles.includes(role)) return true;

			// Check if has click event or cursor pointer
			const cursor = window.getComputedStyle(currentElement).cursor;
			if (cursor === 'pointer') return true;

			// Check onclick attribute
			if (currentElement.hasAttribute('onclick')) return true;

			// Move to parent element
			currentElement = currentElement.parentElement;
		}

		return false;
	}

	// Handle mouse over elements
	function handleMouseOver(e: MouseEvent) {
		const target = e.target as Element;
		isHovering = isClickable(target);
		cursorColor = detectBackgroundColor(target);
	}

	onMount(() => {
		// Detect if device is mobile
		const parser = new UAParser();
		const deviceType = parser.getDevice().type;
		isMobile = deviceType === 'mobile' || deviceType === 'tablet';

		// Only add event listeners if not mobile
		if (!isMobile) {
			window.addEventListener('mousemove', handleMouseMove);
			document.body.addEventListener('mouseover', handleMouseOver, true);
		}

		// Cleanup
		return () => {
			if (!isMobile) {
				window.removeEventListener('mousemove', handleMouseMove);
				document.body.removeEventListener('mouseover', handleMouseOver, true);
			}
		};
	});
</script>

{#if !isMobile}
	<!-- Outer Cursor (50x50, delayed) -->
	<div
		class="custom-cursor-outer"
		class:hovering={isHovering}
		style="left: {mouseX}px; top: {mouseY}px; --cursor-color: {cursorColor};"
	></div>

	<!-- Inner Cursor (20x20, instant) -->
	<div
		class="custom-cursor-inner"
		class:hovering={isHovering}
		style="left: {mouseX}px; top: {mouseY}px; --cursor-color: {cursorColor};"
	></div>
{/if}

<style>
	.custom-cursor-outer,
	.custom-cursor-inner {
		position: fixed;
		pointer-events: none;
		z-index: 9999;
		transform: translate(-50%, -50%);
	}

	/* Outer Cursor - 50x50 with 2px border */
	.custom-cursor-outer {
		width: 50px;
		height: 50px;
		border: 2px solid var(--cursor-color, #545454);
		transition:
			left 0.2s cubic-bezier(0.16, 1, 0.3, 1),
			top 0.2s cubic-bezier(0.16, 1, 0.3, 1),
			transform 0.3s ease,
			border-color 0.2s ease;
	}

	.custom-cursor-outer.hovering {
		transform: translate(-50%, -50%) rotate(45deg);
	}

	/* Inner Cursor - 20x20 with background */
	.custom-cursor-inner {
		width: 20px;
		height: 20px;
		background: var(--cursor-color, #545454);
		transition:
			width 0.3s ease,
			height 0.3s ease,
			transform 0.3s ease,
			background-color 0.2s ease;
	}

	/* Keep size change code for future flexibility */
	.custom-cursor-inner.hovering {
		width: 20px; /* No size change on hover, but keeping for future modification */
		height: 20px;
		transform: translate(-50%, -50%) rotate(45deg);
	}
</style>
