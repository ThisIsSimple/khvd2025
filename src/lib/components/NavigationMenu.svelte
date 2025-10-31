<script lang="ts">
	import NavigationIcon from './NavigationIcon.svelte';
	import NavLogo from './NavLogo.svelte';

	interface Props {
		isOpen?: boolean;
		onClose?: () => void;
		noTitle?: boolean; // If true, shows only menu button (Type 1). Default is false (Type 2 with title and logo)
	}

	let { isOpen = $bindable(false), onClose, noTitle = false }: Props = $props();

	// Scroll-based visibility for Type 2 navigation (with title and logo)
	let visible = $state(true);
	let lastScrollY = $state(0);

	// Orange mode detection for noTitle navigation
	let isOrangeMode = $state(false);
	let buttonRef = $state<HTMLButtonElement>();

	$effect(() => {
		// Only apply scroll behavior for Type 2 navigation (NOT noTitle)
		if (noTitle) return;

		const handleScroll = () => {
			const currentScrollY = window.scrollY;

			// Scrolling down: hide navigation
			if (currentScrollY > lastScrollY && currentScrollY > 50) {
				visible = false;
			}
			// Scrolling up: show navigation
			else if (currentScrollY < lastScrollY) {
				visible = true;
			}

			lastScrollY = currentScrollY;
		};

		window.addEventListener('scroll', handleScroll, { passive: true });

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});

	// Intersection Observer for orange mode detection (noTitle only)
	$effect(() => {
		// Only apply to noTitle navigation
		if (!noTitle) return;

		// Wait for buttonRef to be assigned
		if (!buttonRef) return;

		const orangeSections = document.querySelectorAll('.orange-menu');
		if (orangeSections.length === 0) return;

		// Get button's bounding rect to check intersection
		const observer = new IntersectionObserver(
			() => {
				if (!buttonRef) return;

				// Check if any .orange-menu section intersects with button position
				const buttonRect = buttonRef.getBoundingClientRect();
				let hasIntersection = false;

				orangeSections.forEach((section) => {
					const sectionRect = section.getBoundingClientRect();

					// Check if button overlaps with section
					const isIntersecting =
						buttonRect.top < sectionRect.bottom &&
						buttonRect.bottom > sectionRect.top &&
						buttonRect.left < sectionRect.right &&
						buttonRect.right > sectionRect.left;

					if (isIntersecting) {
						hasIntersection = true;
					}
				});

				isOrangeMode = hasIntersection;
			},
			{
				root: null,
				threshold: 0
			}
		);

		// Observe all orange sections
		orangeSections.forEach((section) => observer.observe(section));

		// Also check on scroll for more precise detection
		const handleScroll = () => {
			if (!buttonRef) return;

			const buttonRect = buttonRef.getBoundingClientRect();
			let hasIntersection = false;

			orangeSections.forEach((section) => {
				const sectionRect = section.getBoundingClientRect();

				const isIntersecting =
					buttonRect.top < sectionRect.bottom &&
					buttonRect.bottom > sectionRect.top &&
					buttonRect.left < sectionRect.right &&
					buttonRect.right > sectionRect.left;

				if (isIntersecting) {
					hasIntersection = true;
				}
			});

			isOrangeMode = hasIntersection;
		};

		window.addEventListener('scroll', handleScroll, { passive: true });

		return () => {
			observer.disconnect();
			window.removeEventListener('scroll', handleScroll);
		};
	});

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

<!-- Navigation Header (Type 2 - with title and logo) -->
{#if !noTitle}
	<!-- Desktop Navigation (≥960px): Full header with title, logo, and menu button -->
	<header
		class="hidden desktop:flex fixed top-0 left-0 right-0 bg-[#fefefe] h-[100px] z-30 items-center justify-between px-[40px] transition-transform duration-300 ease-in-out"
		class:translate-y-0={visible}
		class:-translate-y-full={!visible}
	>
		<!-- Left: Exhibition Info -->
		<div class="flex items-center gap-[10px]">
			<div
				class="flex flex-col justify-end font-sans text-[20px] text-black leading-[1.2] tracking-[-0.8px]"
			>
				<a href="/" class="group">
					<p class="mb-0 group-hover:text-primary transition-colors">
						Kyunghee Univ. Visual Design
					</p>
					<p class="group-hover:text-primary transition-colors">34th Graduation Exhibition</p>
				</a>
			</div>
		</div>

		<!-- Center: Logo -->
		<a
			href="/"
			class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
			aria-label="Go to home page"
		>
			<NavLogo variant="desktop" />
		</a>

		<!-- Right: Menu Button -->
		<button
			onclick={() => (isOpen = true)}
			class="w-[60px] h-[60px] bg-black flex items-center justify-center"
			aria-label="Open menu"
		>
			<img src="/icons/navigation-icon.svg" alt="" class="w-full h-full" />
		</button>
	</header>

	<!-- Tablet Navigation (960px-1350px): Logo and smaller menu button -->
	<header
		class="hidden tablet:flex desktop:hidden fixed top-0 left-0 right-0 bg-[#fefefe] h-[80px] z-30 items-center justify-between px-[40px] transition-transform duration-300 ease-in-out"
		class:translate-y-0={visible}
		class:-translate-y-full={!visible}
	>
		<!-- Left: Exhibition Info -->
		<div class="flex items-center gap-[10px]">
			<div
				class="flex flex-col justify-end font-sans text-[20px] text-black leading-[1.2] tracking-[-0.8px]"
			>
				<a href="/" class="group">
					<p class="mb-0 group-hover:text-primary transition-colors">
						Kyunghee Univ. Visual Design
					</p>
					<p class="group-hover:text-primary transition-colors">34th Graduation Exhibition</p>
				</a>
			</div>
		</div>

		<!-- Logo -->
		<a
			href="/"
			class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
			aria-label="Go to home page"
		>
			<NavLogo variant="mobile" />
		</a>

		<!-- Menu Button (smaller for mobile) -->
		<button
			onclick={() => (isOpen = true)}
			class="fixed top-[20px] right-[40px] w-[40px] h-[40px] bg-black z-30"
			aria-label="Open menu"
		>
			<img src="/icons/navigation-icon.svg" alt="" class="w-full h-full" />
		</button>
	</header>

	<!-- Mobile Navigation (<960px): Logo and smaller menu button -->
	<header
		class="flex tablet:hidden fixed top-0 left-0 right-0 bg-[#fefefe] h-[50px] z-30 items-center justify-between px-[14px] transition-transform duration-300 ease-in-out"
		class:translate-y-0={visible}
		class:-translate-y-full={!visible}
	>
		<!-- Logo -->
		<a href="/" class="flex items-center" aria-label="Go to home page">
			<NavLogo variant="mobile" />
		</a>

		<!-- Menu Button (smaller for mobile) -->
		<button
			onclick={() => (isOpen = true)}
			class="fixed top-[9px] right-[14px] tablet:top-[20px] tablet:right-[40px] w-[32px] h-[32px] tablet:w-[60px] tablet:h-[60px] bg-black z-30"
			aria-label="Open menu"
		>
			<img src="/icons/navigation-icon.svg" alt="" class="w-full h-full" />
		</button>
	</header>
{:else}
	<!-- Type 1: Menu button only (top right) -->
	<button
		bind:this={buttonRef}
		onclick={() => (isOpen = true)}
		class="nav-button-notitle fixed top-[9px] right-[14px] tablet:top-[20px] tablet:right-[40px] w-[32px] h-[32px] tablet:w-[60px] tablet:h-[60px] z-30"
		aria-label="Open menu"
	>
		<NavigationIcon {isOrangeMode} />
	</button>
{/if}

<!-- Navigation Drawer Overlay -->
{#if isOpen}
	<div
		class="white-cursor fixed inset-0 z-50 flex items-end justify-end"
		onclick={handleBackdropClick}
		onkeydown={handleKeyDown}
		role="presentation"
		tabindex="-1"
	>
		<!-- Background with blur -->
		<div
			class="hidden tablet:block absolute inset-0 bg-black/70 backdrop-blur-sm"
			onclick={handleBackdropClick}
			onkeydown={handleKeyDown}
			role="button"
			tabindex="-1"
			aria-label="Close menu"
		></div>

		<!-- Close Button - Top Right -->
		<button
			onclick={handleClose}
			class="fixed top-[9px] right-[14px] tablet:top-[20px] tablet:right-[40px] w-[32px] h-[32px] tablet:w-[40px] tablet:h-[40px] desktop:w-[60px] desktop:h-[60px] bg-black z-[60]"
			aria-label="Close menu"
		>
			<img src="/icons/navigation-close-icon.svg" alt="" class="w-full h-full" />
		</button>

		<!-- Menu Content -->
		<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<nav
			class="relative w-full tablet:w-4/5 desktop:w-3/4 xl:w-1/2 max-w-[960px] h-[calc(100vh-50px)] tablet:h-screen flex flex-col"
			onclick={(e) => e.stopPropagation()}
			aria-label="Main navigation"
		>
			<!-- Menu Items -->
			{#each menuItems as item, index}
				<!-- Menu Item -->
				<a
					href={item.href}
					class="group flex-1 bg-primary flex items-center px-[16px] tablet:px-[40px] py-[10px] relative overflow-hidden"
					onclick={handleClose}
				>
					<!-- Background Image (fade in/out on hover) -->
					<img
						src="/nav-hover-bg.png"
						alt=""
						class="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out pointer-events-none"
					/>

					<!-- Text Container with slide-up animation -->
					<div
						class="w-full relative overflow-hidden h-[56px] tablet:h-[80px] desktop:h-[120px] flex items-center"
					>
						<!-- Black text (default, slides up on hover) -->
						<p
							class="font-display text-[56px] tablet:text-[100px] desktop:text-[120px] leading-none text-black absolute transition-transform duration-500 ease-in-out group-hover:-translate-y-full"
						>
							{item.title}
						</p>

						<!-- White text (hidden below, slides up on hover) -->
						<p
							class="font-display text-[56px] tablet:text-[100px] desktop:text-[120px] leading-none text-white absolute translate-y-full transition-transform duration-500 ease-in-out group-hover:translate-y-0"
						>
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
