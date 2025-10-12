<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	let { targetDate }: { targetDate: Date } = $props();

	// Top half values (updated immediately when animation starts)
	let topDays = $state(0);
	let topHours = $state(0);
	let topMinutes = $state(0);
	let topSeconds = $state(0);

	// Bottom half values (updated after animation ends)
	let bottomDays = $state(0);
	let bottomHours = $state(0);
	let bottomMinutes = $state(0);
	let bottomSeconds = $state(0);

	// New values calculated but not yet displayed
	let newDays = $state(0);
	let newHours = $state(0);
	let newMinutes = $state(0);
	let newSeconds = $state(0);

	let isHidden = $state(false);

	let interval: number | undefined;

	function updateCountdown() {
		const now = new Date().getTime();
		const target = new Date(targetDate).getTime();
		const distance = target - now;

		if (distance < 0) {
			newDays = 0;
			newHours = 0;
			newMinutes = 0;
			newSeconds = 0;
			return;
		}

		// Calculate new values
		newDays = Math.floor(distance / (1000 * 60 * 60 * 24));
		newHours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		newMinutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
		newSeconds = Math.floor((distance % (1000 * 60)) / 1000);

		// Update top half immediately when new values are calculated
		topDays = newDays;
		topHours = newHours;
		topMinutes = newMinutes;
		topSeconds = newSeconds;
	}

	function applyBottomValues() {
		// Apply new values to bottom half after animation ends
		bottomDays = newDays;
		bottomHours = newHours;
		bottomMinutes = newMinutes;
		bottomSeconds = newSeconds;
	}

	onMount(() => {
		updateCountdown();
		applyBottomValues();
		interval = setInterval(updateCountdown, 1000) as unknown as number;
	});

	onDestroy(() => {
		if (interval) clearInterval(interval);
	});

	function padZero(num: number): string {
		return num.toString().padStart(2, '0');
	}

	function hasChanged(current: number, previous: number, position: number): boolean {
		const currentDigit = padZero(current)[position];
		const prevDigit = padZero(previous)[position];
		return currentDigit !== prevDigit;
	}
</script>

<div class="flex items-center justify-center gap-3">
	<!-- Days -->
	<div class="flex flex-col items-center">
		<div class="flex gap-3">
			{#each [0, 1] as position}
				<div class="flip-card">
					<!-- Upper half - updates immediately -->
					<div class="flip-card-top">
						<span class="flip-card-number">{padZero(topDays)[position]}</span>
					</div>

					<!-- Lower half - updates after animation ends -->
					<div class="flip-card-bottom">
						<span class="flip-card-number">{padZero(bottomDays)[position]}</span>
					</div>

					<!-- Flipping piece - shows old bottom value during animation -->
					{#key `${topDays}-${bottomDays}-${position}`}
						{#if hasChanged(topDays, bottomDays, position)}
							<div class="flip-card-top-flip" onanimationend={applyBottomValues}>
								<!-- Front side: old value -->
								<span class="flip-card-number flip-card-front">{padZero(bottomDays)[position]}</span
								>
								<!-- Back side: new value (flipped) -->
								<span class="flip-card-number flip-card-back">{padZero(topDays)[position]}</span>
							</div>
						{/if}
					{/key}
				</div>
			{/each}
		</div>
	</div>

	<span class="text-4xl text-white font-bold -mt-6">:</span>

	<!-- Hours -->
	<div class="flex flex-col items-center">
		<div class="flex gap-3">
			{#each [0, 1] as position}
				<div class="flip-card">
					<div class="flip-card-top">
						<span class="flip-card-number">{padZero(topHours)[position]}</span>
					</div>
					<div class="flip-card-bottom">
						<span class="flip-card-number">{padZero(bottomHours)[position]}</span>
					</div>
					{#key `${topHours}-${bottomHours}-${position}`}
						{#if hasChanged(topHours, bottomHours, position)}
							<div class="flip-card-top-flip" onanimationend={applyBottomValues}>
								<!-- Front side: old value -->
								<span class="flip-card-number flip-card-front">{padZero(bottomHours)[position]}</span>
								<!-- Back side: new value (flipped) -->
								<span class="flip-card-number flip-card-back">{padZero(topHours)[position]}</span>
							</div>
						{/if}
					{/key}
				</div>
			{/each}
		</div>
	</div>

	<span class="text-4xl text-white font-bold -mt-6">:</span>

	<!-- Minutes -->
	<div class="flex flex-col items-center">
		<div class="flex gap-3">
			{#each [0, 1] as position}
				<div class="flip-card">
					<div class="flip-card-top">
						<span class="flip-card-number">{padZero(topMinutes)[position]}</span>
					</div>
					<div class="flip-card-bottom">
						<span class="flip-card-number">{padZero(bottomMinutes)[position]}</span>
					</div>
					{#key `${topMinutes}-${bottomMinutes}-${position}`}
						{#if hasChanged(topMinutes, bottomMinutes, position)}
							<div class="flip-card-top-flip" onanimationend={applyBottomValues}>
								<!-- Front side: old value -->
								<span class="flip-card-number flip-card-front">{padZero(bottomMinutes)[position]}</span>
								<!-- Back side: new value (flipped) -->
								<span class="flip-card-number flip-card-back">{padZero(topMinutes)[position]}</span>
							</div>
						{/if}
					{/key}
				</div>
			{/each}
		</div>
	</div>

	<!-- Seconds (hidden on mobile) -->
	<span class="text-4xl text-white font-bold -mt-6 hidden tablet:block">:</span>

	<div class="hidden tablet:flex flex-col items-center">
		<div class="flex gap-3">
			{#each [0, 1] as position}
				<div class="flip-card">
					<div class="flip-card-top">
						<span class="flip-card-number">{padZero(topSeconds)[position]}</span>
					</div>
					<div class="flip-card-bottom">
						<span class="flip-card-number">{padZero(bottomSeconds)[position]}</span>
					</div>
					{#key `${topSeconds}-${bottomSeconds}-${position}`}
						{#if hasChanged(topSeconds, bottomSeconds, position)}
							<div class="flip-card-top-flip" onanimationend={applyBottomValues}>
								<div class="flip-card-front">
									<span class="flip-card-number">{padZero(bottomSeconds)[position]}</span>
								</div>
								<div class="flip-card-back">
									<span class="flip-card-number">{padZero(topSeconds)[position]}</span>
								</div>
							</div>
						{/if}
					{/key}
				</div>
			{/each}
		</div>
	</div>
</div>

<style>
	.flip-card {
		position: relative;
		width: 100px;
		height: 140px;
		box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
		background: transparent;
		perspective: 300px;
	}

	/* Upper half - static, shows current number's top */
	.flip-card-top {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 48.5%;
		overflow: hidden;
		background: #000;
		display: flex;
		align-items: flex-end;
		justify-content: center;
	}

	/* Lower half - static, shows current number's bottom */
	.flip-card-bottom {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 48.5%;
		overflow: hidden;
		background: #000;
		display: flex;
		align-items: flex-start;
		justify-content: center;
	}

	/* Flipping piece - animates down from top */
	.flip-card-top-flip {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		height: 50%;
		transform-origin: bottom;
		transform-style: preserve-3d;
		background: transparent;
		animation: flipDown 0.95s cubic-bezier(0.4, 0, 0.2, 1) forwards;
		z-index: 5;
	}

	@keyframes flipDown {
		0% {
			transform: rotateX(0deg);
		}
		100% {
			transform: rotateX(-180deg);
		}
	}

	/* Number styling */
	.flip-card-number {
		color: white;
		font-size: 6rem;
		font-weight: bold;
		font-family: 'Bebas Neue', Impact, sans-serif;
		line-height: 1;
		user-select: none;
	}

	.flip-card-top .flip-card-number,
	.flip-card-front .flip-card-number {
		transform: translateY(51.5%);
	}

	.flip-card-bottom .flip-card-number {
		transform: translateY(-51.5%);
	}

	.flip-card-back .flip-card-number {
		transform: translateY(-51.5%) rotateX(0deg);
	}

	/* Front side of flipping card - shows old value */
	.flip-card-front {
		position: absolute;
		width: 100%;
		height: 97%;
		overflow: hidden;
		display: flex;
		align-items: flex-end;
		justify-content: center;
		background: #000;
		transform: rotateX(0deg);
		-webkit-backface-visibility: hidden; /* Safari */
		backface-visibility: hidden;
	}

	/* Back side of flipping card - shows new value (initially rotated) */
	.flip-card-back {
		position: absolute;
		width: 100%;
		height: 97%;
		overflow: hidden;
		display: flex;
		align-items: flex-start;
		justify-content: center;
		background: #000;
		transform: rotateX(180deg);
		-webkit-backface-visibility: hidden; /* Safari */
		backface-visibility: hidden;
	}

	/* Horizontal divider line */
	.flip-card::after {
		content: '';
		position: absolute;
		top: 50%;
		left: 0;
		right: 0;
		height: 2px;
		background: rgba(255, 255, 255, 0.1);
		z-index: 10;
		transform: translateY(-50%);
		pointer-events: none;
	}

	/* Tablet and above */
	@media (max-width: 960px) {
		.flip-card {
			width: 40px;
			height: 55px;
		}

		.flip-card-number {
			font-size: 2.5rem;
		}

		.flip-card-top-flip {
			height: calc(55px / 2);
		}
	}
</style>
