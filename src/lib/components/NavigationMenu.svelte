<script lang="ts">
	interface Props {
		isOpen?: boolean;
		onClose?: () => void;
	}

	let { isOpen = $bindable(false), onClose }: Props = $props();

	function handleClose() {
		isOpen = false;
		onClose?.();
	}

	function handleBackdropClick(e: MouseEvent) {
		if (e.target === e.currentTarget) {
			handleClose();
		}
	}

	// Menu items configuration
	const menuItems = [
		{ title: 'ABOUT EXHIBITION', href: '/exhibition' },
		{ title: 'WORK', href: '/exhibition/works' },
		{ title: 'DESINGER', href: '/designers' },
		{ title: 'TEACH & SUPPORT', href: '/support' },
		{ title: 'SEMINAR', href: '/seminar' }
	];
</script>

<!-- Navigation Drawer Overlay -->
{#if isOpen}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center"
		onclick={handleBackdropClick}
		role="presentation"
	>
		<!-- Background with blur -->
		<div class="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

		<!-- Menu Content -->
		<div class="relative w-full max-w-[960px] h-screen flex flex-col">
			<!-- Menu Items -->
			{#each menuItems as item, index}
				<!-- Menu Item -->
				<a
					href={item.href}
					class="flex-1 bg-primary flex items-center px-[40px] py-[10px] hover:bg-opacity-90 transition-all"
					onclick={handleClose}
				>
					<p class="font-display text-[80px] tablet:text-[120px] leading-none text-black">
						{item.title}
					</p>
				</a>

				<!-- Divider -->
				{#if index < menuItems.length - 1}
					<div class="bg-primary flex items-center px-[40px] py-0">
						<div class="w-[24px] h-[2px] bg-black"></div>
					</div>
				{/if}
			{/each}

			<!-- Close Button (X icon) -->
			<button
				onclick={handleClose}
				class="absolute -right-[60px] bottom-0 w-[60px] h-[60px] bg-black flex items-center justify-center hover:bg-opacity-80 transition-opacity"
				aria-label="Close menu"
			>
				<!-- X icon made with two rotated lines -->
				<div class="relative w-[32.5px] h-[32.5px]">
					<!-- Line 1 (45deg rotation) -->
					<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45">
						<div class="w-[32.5px] h-[3px] bg-white"></div>
					</div>
					<!-- Line 2 (315deg rotation / -45deg) -->
					<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-45">
						<div class="w-[32.5px] h-[3px] bg-white"></div>
					</div>
				</div>
			</button>
		</div>
	</div>
{/if}
