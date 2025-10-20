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

	// Track mouse position
	function handleMouseMove(e: MouseEvent) {
		mouseX = e.clientX;
		mouseY = e.clientY;
	}

	// Check if element or any parent is clickable
	function isClickable(element: Element | null): boolean {
		if (!element) return false;

		const clickableTags = ['A', 'BUTTON', 'INPUT', 'TEXTAREA', 'SELECT'];
		const clickableRoles = ['button', 'link'];

		let currentElement: Element | null = element;

		// Traverse up the DOM tree to check parents
		while (currentElement && currentElement !== document.body) {
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
	<!-- Outer Cursor (120x120, delayed) -->
	<div
		class="custom-cursor-outer"
		class:hovering={isHovering}
		style="left: {mouseX}px; top: {mouseY}px;"
	></div>

	<!-- Inner Cursor (52x52, instant) -->
	<div
		class="custom-cursor-inner"
		class:hovering={isHovering}
		style="left: {mouseX}px; top: {mouseY}px;"
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

	/* Outer Cursor - 120x120 with border */
	.custom-cursor-outer {
		width: 120px;
		height: 120px;
		border: 1px solid #d9d9d9;
		transition:
			left 0.2s cubic-bezier(0.16, 1, 0.3, 1),
			top 0.2s cubic-bezier(0.16, 1, 0.3, 1),
			transform 0.3s ease;
	}

	.custom-cursor-outer.hovering {
		transform: translate(-50%, -50%) rotate(45deg);
	}

	/* Inner Cursor - 52x52 with background */
	.custom-cursor-inner {
		width: 52px;
		height: 52px;
		background: #d9d9d9;
		transition:
			width 0.3s ease,
			height 0.3s ease,
			transform 0.3s ease;
	}

	.custom-cursor-inner.hovering {
		width: 72px;
		height: 72px;
		transform: translate(-50%, -50%) rotate(45deg);
	}
</style>
