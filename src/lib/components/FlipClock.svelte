<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	let { targetDate }: { targetDate: Date } = $props();

	let days = $state(0);
	let hours = $state(0);
	let minutes = $state(0);
	let seconds = $state(0);

	let prevDays = $state(0);
	let prevHours = $state(0);
	let prevMinutes = $state(0);
	let prevSeconds = $state(0);

	let interval: number | undefined;

	function updateCountdown() {
		const now = new Date().getTime();
		const target = new Date(targetDate).getTime();
		const distance = target - now;

		if (distance < 0) {
			days = 0;
			hours = 0;
			minutes = 0;
			seconds = 0;
			return;
		}

		prevDays = days;
		prevHours = hours;
		prevMinutes = minutes;
		prevSeconds = seconds;

		days = Math.floor(distance / (1000 * 60 * 60 * 24));
		hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
		seconds = Math.floor((distance % (1000 * 60)) / 1000);
	}

	onMount(() => {
		updateCountdown();
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
					<!-- Upper half - current number -->
					<div class="flip-card-top">
						<span class="flip-card-number">{padZero(days)[position]}</span>
					</div>

					<!-- Lower half - current number -->
					<div class="flip-card-bottom">
						<span class="flip-card-number">{padZero(days)[position]}</span>
					</div>

					<!-- Flipping piece - previous number -->
					{#if hasChanged(days, prevDays, position)}
						<div class="flip-card-top-flip" key={`${days}-${position}`}>
							<span class="flip-card-number">{padZero(prevDays)[position]}</span>
						</div>
					{/if}
				</div>
			{/each}
		</div>
		<span class="text-sm mt-2 text-white/70">DAYS</span>
	</div>

	<span class="text-4xl text-white font-bold -mt-6">:</span>

	<!-- Hours -->
	<div class="flex flex-col items-center">
		<div class="flex gap-3">
			{#each [0, 1] as position}
				<div class="flip-card">
					<div class="flip-card-top">
						<span class="flip-card-number">{padZero(hours)[position]}</span>
					</div>
					<div class="flip-card-bottom">
						<span class="flip-card-number">{padZero(hours)[position]}</span>
					</div>
					{#if hasChanged(hours, prevHours, position)}
						<div class="flip-card-top-flip" key={`${hours}-${position}`}>
							<span class="flip-card-number">{padZero(prevHours)[position]}</span>
						</div>
					{/if}
				</div>
			{/each}
		</div>
		<span class="text-sm mt-2 text-white/70">HOURS</span>
	</div>

	<span class="text-4xl text-white font-bold -mt-6">:</span>

	<!-- Minutes -->
	<div class="flex flex-col items-center">
		<div class="flex gap-3">
			{#each [0, 1] as position}
				<div class="flip-card">
					<div class="flip-card-top">
						<span class="flip-card-number">{padZero(minutes)[position]}</span>
					</div>
					<div class="flip-card-bottom">
						<span class="flip-card-number">{padZero(minutes)[position]}</span>
					</div>
					{#if hasChanged(minutes, prevMinutes, position)}
						<div class="flip-card-top-flip" key={`${minutes}-${position}`}>
							<span class="flip-card-number">{padZero(prevMinutes)[position]}</span>
						</div>
					{/if}
				</div>
			{/each}
		</div>
		<span class="text-sm mt-2 text-white/70">MINS</span>
	</div>

	<!-- Seconds (hidden on mobile) -->
	<span class="text-4xl text-white font-bold -mt-6 hidden tablet:block">:</span>

	<div class="hidden tablet:flex flex-col items-center">
		<div class="flex gap-3">
			{#each [0, 1] as position}
				<div class="flip-card">
					<div class="flip-card-top">
						<span class="flip-card-number">{padZero(seconds)[position]}</span>
					</div>
					<div class="flip-card-bottom">
						<span class="flip-card-number">{padZero(seconds)[position]}</span>
					</div>
					{#if hasChanged(seconds, prevSeconds, position)}
						<div class="flip-card-top-flip" key={`${seconds}-${position}`}>
							<span class="flip-card-number">{padZero(prevSeconds)[position]}</span>
						</div>
					{/if}
				</div>
			{/each}
		</div>
		<span class="text-sm mt-2 text-white/70">SECS</span>
	</div>
</div>

<style>
	.flip-card {
		position: relative;
		width: 60px;
		height: 80px;
		background: #000;
		box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
		perspective: 300px;
	}

	/* Upper half - static, shows current number's top */
	.flip-card-top {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 50%;
		overflow: hidden;
		background: #000;
		display: flex;
		align-items: flex-end;
		justify-content: center;
		padding-bottom: 1px;
	}

	/* Lower half - static, shows current number's bottom */
	.flip-card-bottom {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 50%;
		overflow: hidden;
		background: #000;
		display: flex;
		align-items: flex-start;
		justify-content: center;
		padding-top: 1px;
	}

	/* Flipping piece - animates down from top */
	.flip-card-top-flip {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 50%;
		overflow: hidden;
		background: #000;
		transform-origin: bottom;
		transform-style: preserve-3d;
		backface-visibility: hidden;
		display: flex;
		align-items: flex-end;
		justify-content: center;
		padding-bottom: 1px;
		animation: flipDown 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
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
		font-size: 2.5rem;
		font-weight: bold;
		font-family: 'Bebas Neue', Impact, sans-serif;
		line-height: 1;
		user-select: none;
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
	@media (min-width: 960px) {
		.flip-card {
			width: 70px;
			height: 90px;
		}

		.flip-card-number {
			font-size: 3rem;
		}
	}
</style>
