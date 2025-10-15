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
		class="fixed inset-0 z-50 flex items-center justify-end"
		onclick={handleBackdropClick}
		role="presentation"
	>
		<!-- Background with blur -->
		<div class="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

		<!-- Close Button (navigation-icon.svg) - Top Right -->
		<button
			onclick={handleClose}
			class="fixed top-[20px] right-[20px] w-[60px] h-[60px] bg-black hover:bg-opacity-80 transition-opacity z-[60]"
			aria-label="Close menu"
		>
			<img src="/icons/navigation-icon.svg" alt="" class="w-full h-full" />
		</button>

		<!-- Menu Content -->
		<div class="relative w-1/2 max-w-[960px] h-screen flex flex-col">
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
		</div>
	</div>
{/if}
