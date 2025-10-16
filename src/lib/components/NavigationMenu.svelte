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

	function handleBackdropClick(e: MouseEvent | KeyboardEvent) {
		if (e.target === e.currentTarget) {
			handleClose();
		}
	}

	function handleKeyDown(e: KeyboardEvent) {
		if (e.key === 'Escape') {
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
		onkeydown={handleKeyDown}
		role="presentation"
		tabindex="-1"
	>
		<!-- Background with blur -->
		<div
			class="absolute inset-0 bg-black/70 backdrop-blur-sm"
			onclick={handleBackdropClick}
			onkeydown={handleKeyDown}
			role="button"
			tabindex="-1"
			aria-label="Close menu"
		></div>

		<!-- Close Button (navigation-icon.svg) - Top Right -->
		<button
			onclick={handleClose}
			class="fixed top-[20px] right-[20px] w-[60px] h-[60px] bg-black hover:bg-opacity-80 transition-opacity z-[60]"
			aria-label="Close menu"
		>
			<img src="/icons/navigation-icon.svg" alt="" class="w-full h-full" />
		</button>

		<!-- Menu Content -->
		<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<nav
			class="relative w-1/2 max-w-[960px] h-screen flex flex-col"
			onclick={(e) => e.stopPropagation()}
			aria-label="Main navigation"
		>
			<!-- Menu Items -->
			{#each menuItems as item, index}
				<!-- Menu Item -->
				<a
					href={item.href}
					class="group flex-1 bg-primary flex items-center px-[40px] py-[10px] relative overflow-hidden"
					onclick={handleClose}
				>
					<!-- Background Image (fade in/out on hover) -->
					<img
						src="/nav-hover-bg.png"
						alt=""
						class="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out pointer-events-none"
					/>

					<!-- Text Container with slide-up animation -->
					<div class="w-full relative overflow-hidden h-[80px] tablet:h-[120px] flex items-center">
						<!-- Black text (default, slides up on hover) -->
						<p class="font-display text-[80px] tablet:text-[120px] leading-none text-black absolute transition-transform duration-500 ease-in-out group-hover:-translate-y-full">
							{item.title}
						</p>

						<!-- White text (hidden below, slides up on hover) -->
						<p class="font-display text-[80px] tablet:text-[120px] leading-none text-white absolute translate-y-full transition-transform duration-500 ease-in-out group-hover:translate-y-0">
							{item.title}
						</p>
					</div>
				</a>

				<!-- Divider -->
				{#if index < menuItems.length - 1}
					<div class="bg-primary flex items-center px-[40px] py-0">
						<div class="w-[24px] h-[2px] bg-black"></div>
					</div>
				{/if}
			{/each}
		</nav>
	</div>
{/if}
