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
			<div class="flip-card">
				<div class="flip-card-inner" class:flipping={hasChanged(days, prevDays, 0)}>
					<div class="flip-card-front">{padZero(days)[0]}</div>
					<div class="flip-card-back">{padZero(prevDays)[0]}</div>
				</div>
			</div>
			<div class="flip-card">
				<div class="flip-card-inner" class:flipping={hasChanged(days, prevDays, 1)}>
					<div class="flip-card-front">{padZero(days)[1]}</div>
					<div class="flip-card-back">{padZero(prevDays)[1]}</div>
				</div>
			</div>
		</div>
		<span class="text-sm mt-2 text-white/70">DAYS</span>
	</div>

	<span class="text-4xl text-white font-bold -mt-6">:</span>

	<!-- Hours -->
	<div class="flex flex-col items-center">
		<div class="flex gap-3">
			<div class="flip-card">
				<div class="flip-card-inner" class:flipping={hasChanged(hours, prevHours, 0)}>
					<div class="flip-card-front">{padZero(hours)[0]}</div>
					<div class="flip-card-back">{padZero(prevHours)[0]}</div>
				</div>
			</div>
			<div class="flip-card">
				<div class="flip-card-inner" class:flipping={hasChanged(hours, prevHours, 1)}>
					<div class="flip-card-front">{padZero(hours)[1]}</div>
					<div class="flip-card-back">{padZero(prevHours)[1]}</div>
				</div>
			</div>
		</div>
		<span class="text-sm mt-2 text-white/70">HOURS</span>
	</div>

	<span class="text-4xl text-white font-bold -mt-6">:</span>

	<!-- Minutes -->
	<div class="flex flex-col items-center">
		<div class="flex gap-3">
			<div class="flip-card">
				<div class="flip-card-inner" class:flipping={hasChanged(minutes, prevMinutes, 0)}>
					<div class="flip-card-front">{padZero(minutes)[0]}</div>
					<div class="flip-card-back">{padZero(prevMinutes)[0]}</div>
				</div>
			</div>
			<div class="flip-card">
				<div class="flip-card-inner" class:flipping={hasChanged(minutes, prevMinutes, 1)}>
					<div class="flip-card-front">{padZero(minutes)[1]}</div>
					<div class="flip-card-back">{padZero(prevMinutes)[1]}</div>
				</div>
			</div>
		</div>
		<span class="text-sm mt-2 text-white/70">MINS</span>
	</div>

	<!-- Seconds (hidden on mobile) -->
	<span class="text-4xl text-white font-bold -mt-6 hidden tablet:block">:</span>

	<div class="hidden tablet:flex flex-col items-center">
		<div class="flex gap-3">
			<div class="flip-card">
				<div class="flip-card-inner" class:flipping={hasChanged(seconds, prevSeconds, 0)}>
					<div class="flip-card-front">{padZero(seconds)[0]}</div>
					<div class="flip-card-back">{padZero(prevSeconds)[0]}</div>
				</div>
			</div>
			<div class="flip-card">
				<div class="flip-card-inner" class:flipping={hasChanged(seconds, prevSeconds, 1)}>
					<div class="flip-card-front">{padZero(seconds)[1]}</div>
					<div class="flip-card-back">{padZero(prevSeconds)[1]}</div>
				</div>
			</div>
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
		border-radius: 8px;
		box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
		overflow: hidden;
		perspective: 500px;
	}

	.flip-card-inner {
		width: 100%;
		height: 100%;
		position: relative;
		transform-style: preserve-3d;
		transform-origin: center center;
	}

	.flip-card-front,
	.flip-card-back {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		color: white;
		font-size: 2.5rem;
		font-weight: bold;
		font-family: 'Bebas Neue', Impact, sans-serif;
		position: absolute;
		top: 0;
		left: 0;
		backface-visibility: hidden;
	}

	.flip-card-back {
		transform: rotateX(180deg);
	}

	/* Flip animation */
	.flip-card-inner.flipping {
		animation: flip 0.6s cubic-bezier(0.4, 0, 0.2, 1);
	}

	@keyframes flip {
		0% {
			transform: rotateX(0deg);
		}
		50% {
			transform: rotateX(-90deg);
		}
		100% {
			transform: rotateX(-180deg);
		}
	}

	/* Horizontal divider line */
	.flip-card::before {
		content: '';
		position: absolute;
		top: 50%;
		left: 0;
		right: 0;
		height: 2px;
		background: rgba(255, 255, 255, 0.1);
		z-index: 10;
		transform: translateY(-50%);
	}

	/* Tablet and above */
	@media (min-width: 960px) {
		.flip-card {
			width: 70px;
			height: 90px;
		}

		.flip-card-front,
		.flip-card-back {
			font-size: 3rem;
		}
	}
</style>
