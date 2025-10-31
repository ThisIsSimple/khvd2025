<script lang="ts">
	import MessageCard from './MessageCard.svelte';
	import EditMessageModal from './EditMessageModal.svelte';
	import type { Message, MessagesResponse } from '$lib/types/message';
	import { onMount } from 'svelte';
	import { Motion } from 'svelte-motion';

	interface Props {
		type?: string;
		targetId?: number;
		isForTarget?: boolean;
	}

	let { type, targetId, isForTarget = false }: Props = $props();

	let messages = $state<Message[]>([]);
	let prevMessages = $state<Message[]>([]); // Previous page messages for smooth transition
	let totalMessages = $state(0);
	let inputText = $state('');
	let writerName = $state('');
	let password = $state('');
	let currentPage = $state(0);
	let isLoading = $state(false);
	let isSubmitting = $state(false);
	let error = $state<string | null>(null);

	// Animation state
	let pageDirection = $state<'forward' | 'backward' | null>(null);
	let isTransitioning = $state(false);

	// Edit modal state
	let editingMessage = $state<Message | null>(null);
	let showEditModal = $state(false);

	const maxCharacters = 120;

	// Responsive messages per page
	let messagesPerPage = $state(8); // Default to desktop
	let itemsPerRow = $state(4); // Default to desktop

	// Calculate total pages based on current messagesPerPage
	let totalPages = $derived(Math.ceil(totalMessages / messagesPerPage));

	// Get current page messages - no slicing needed, API handles pagination
	let currentMessages = $derived(messages);

	// Character count
	let characterCount = $derived(inputText.length);

	// Update messages per page based on window size
	function updateMessagesPerPage() {
		if (typeof window === 'undefined') return;

		const width = window.innerWidth;

		// For target pages, always use 4 per row
		if (isForTarget) {
			messagesPerPage = 8;
			itemsPerRow = 4;
			return;
		}

		// For general message board, use responsive layout
		if (width >= 1351) {
			messagesPerPage = 8;
			itemsPerRow = 4;
		} else if (width >= 960) {
			messagesPerPage = 6;
			itemsPerRow = 3;
		} else {
			messagesPerPage = 4;
			itemsPerRow = 2;
		}
	}

	// Fetch messages from API
	async function fetchMessages(page: number = 0) {
		isLoading = true;
		error = null;
		try {
			const params = new URLSearchParams({
				page: String(page),
				pageSize: String(messagesPerPage)
			});

			if (type) {
				params.set('type', type);
			}

			if (targetId !== undefined) {
				params.set('targetId', String(targetId));
			}

			const response = await fetch(`/api/messages?${params.toString()}`);
			if (!response.ok) {
				throw new Error('Failed to fetch messages');
			}
			const data: MessagesResponse = await response.json();
			messages = data.messages;
			totalMessages = data.total;
			currentPage = page;
		} catch (err) {
			error = err instanceof Error ? err.message : 'Failed to load messages';
			console.error('Error fetching messages:', err);
		} finally {
			isLoading = false;
		}
	}

	// Submit new message
	async function submitMessage() {
		if (!writerName.trim() || !password.trim() || !inputText.trim()) {
			error = '작성자, 비밀번호, 메시지를 모두 입력해주세요.';
			return;
		}

		isSubmitting = true;
		error = null;
		try {
			const requestBody: any = {
				writer: writerName.trim(),
				password: password.trim(),
				message: inputText.trim()
			};

			if (type) {
				requestBody.type = type;
			}

			if (targetId !== undefined) {
				requestBody.targetId = targetId;
			}

			const response = await fetch('/api/messages', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(requestBody)
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.error || 'Failed to submit message');
			}

			inputText = '';
			writerName = '';
			password = '';
			await fetchMessages(0);
		} catch (err) {
			error = err instanceof Error ? err.message : 'Failed to submit message';
			console.error('Error submitting message:', err);
		} finally {
			isSubmitting = false;
		}
	}

	function handleSubmit(e: KeyboardEvent) {
		if (e.key === 'Enter' && !e.shiftKey && inputText.trim()) {
			e.preventDefault();
			submitMessage();
		}
	}

	function handleInput(e: Event) {
		const target = e.target as HTMLTextAreaElement;
		if (target.value.length <= maxCharacters) {
			inputText = target.value;
		} else {
			target.value = inputText;
		}
	}

	async function goToPage(page: number) {
		if (isTransitioning || page < 0 || page >= totalPages) return;

		pageDirection = page > currentPage ? 'forward' : 'backward';
		isTransitioning = true;

		// Store current messages as previous
		prevMessages = [...messages];

		// Fetch new messages
		await fetchMessages(page);

		// Reset after animation completes
		setTimeout(() => {
			isTransitioning = false;
			pageDirection = null;
		}, 400);
	}

	function handleEdit(messageId: number) {
		const message = messages.find((m) => m.id === messageId);
		if (message) {
			editingMessage = message;
			showEditModal = true;
		}
	}

	function handleCloseModal() {
		showEditModal = false;
		editingMessage = null;
	}

	async function handleUpdateMessage() {
		await fetchMessages(currentPage);
	}

	onMount(() => {
		updateMessagesPerPage();
		fetchMessages(0);

		window.addEventListener('resize', updateMessagesPerPage);

		// Keyboard navigation
		function handleKeyboard(e: KeyboardEvent) {
			if (e.key === 'ArrowLeft' && currentPage > 0) {
				e.preventDefault();
				goToPage(currentPage - 1);
			} else if (e.key === 'ArrowRight' && currentPage < totalPages - 1) {
				e.preventDefault();
				goToPage(currentPage + 1);
			}
		}

		window.addEventListener('keydown', handleKeyboard);

		return () => {
			window.removeEventListener('resize', updateMessagesPerPage);
			window.removeEventListener('keydown', handleKeyboard);
		};
	});
</script>

<section
	class={isForTarget
		? 'bg-white flex flex-col gap-[20px] items-stretch'
		: 'relative flex flex-col gap-[40px] items-center justify-center py-[60px] tablet:py-[100px] px-4 tablet:px-10 pb-[200px]'}
>
	<!-- Background Image (only for general message board) -->
	{#if !isForTarget}
		<img
			src="/message-board-bg.webp"
			alt=""
			class="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
		/>
	{/if}

	<!-- Input Section -->
	<div
		class={isForTarget
			? 'flex flex-col gap-[24px] items-center justify-center w-full'
			: 'relative flex flex-col gap-[16px] tablet:gap-[32px] items-center w-full max-w-[680px]'}
	>
		<!-- Title -->
		<div class="flex gap-[10px] items-center w-full {isForTarget ? '' : 'justify-center'}">
			<h2
				class="font-bold leading-[1.4] tracking-[-0.48px] {isForTarget
					? 'text-primary text-[18px] tablet:text-[24px]'
					: 'text-[#111111] text-[18px] tablet:text-[24px] desktop:text-[32px] text-center'}"
			>
				응원의 말을 적어주세요
			</h2>
		</div>

		<!-- Error Message -->
		{#if error}
			<div class="w-full bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
				{error}
			</div>
		{/if}

		<!-- Input Box -->
		{#if isForTarget}
			<!-- Target Design (Table Layout) -->
			<div class="bg-[#f6f6f6] flex flex-col items-start w-full">
				<!-- Top Row: Writer and Password Fields -->
				<div class="flex items-start justify-end w-full border-b border-[#cccccc]">
					<!-- Writer Field -->
					<div class="flex-1 flex items-center border-r border-[#cccccc]">
						<!-- Label -->
						<div
							class="flex items-center justify-center px-[16px] py-[14px] border-r border-[#cccccc]"
						>
							<p class="font-bold text-[#777777] text-[16px] leading-[1.4] whitespace-nowrap">
								작성자
							</p>
						</div>
						<!-- Input -->
						<div class="flex-1 flex items-center h-full px-[16px]">
							<input
								type="text"
								bind:value={writerName}
								placeholder="이름을 입력해주세요..."
								maxlength="50"
								disabled={isSubmitting}
								class="w-full font-normal text-[#999999] text-[16px] leading-[1.4] placeholder:text-[#999999] outline-none bg-transparent disabled:opacity-50"
							/>
						</div>
					</div>

					<!-- Password Field -->
					<div class="flex-1 flex items-center">
						<!-- Label -->
						<div
							class="flex items-center justify-center px-[16px] py-[14px] border-r border-[#cccccc]"
						>
							<p class="font-bold text-[#777777] text-[16px] leading-[1.4] whitespace-nowrap">
								비밀번호
							</p>
						</div>
						<!-- Input -->
						<div class="flex-1 flex items-center h-full px-[16px]">
							<input
								type="password"
								bind:value={password}
								placeholder="0000"
								maxlength="4"
								disabled={isSubmitting}
								class="w-full font-normal text-[#999999] text-[16px] leading-[1.4] placeholder:text-[#999999] outline-none bg-transparent disabled:opacity-50"
							/>
						</div>
					</div>
				</div>

				<!-- Message Text Area -->
				<div class="flex flex-col gap-[10px] items-start px-[20px] py-[24px] h-[140px] w-full">
					<div class="flex gap-[10px] items-start w-full h-full">
						<textarea
							bind:value={inputText}
							oninput={handleInput}
							onkeydown={handleSubmit}
							placeholder="글 작성 후 엔터(ENTER)를 눌러주세요..."
							disabled={isSubmitting}
							class="w-full h-full resize-none outline-none font-normal text-[#999999] text-[15px] sm:text-[18px] tablet:text-[20px] leading-[1.5] placeholder:text-[#999999] bg-transparent disabled:opacity-50"
							maxlength="120"
						></textarea>
					</div>
				</div>

				<!-- Character Counter -->
				<div class="flex gap-[10px] items-center justify-end p-[16px] w-full">
					<p class="font-normal text-[#999999] text-[15px] leading-[1.5] whitespace-nowrap">
						{characterCount}/120자
					</p>
				</div>
			</div>
		{:else}
			<!-- General Design (Original) -->
			<div class="bg-[#fefefe] flex flex-col items-start w-full">
				<!-- Top Row: Writer and Password Fields -->
				<div class="flex items-start justify-end w-full border-b border-[#cccccc]">
					<!-- Writer Field -->
					<div class="flex-1 flex items-center border-r border-[#cccccc]">
						<div
							class="flex items-center justify-center px-[16px] py-[14px] border-r border-[#cccccc]"
						>
							<p class="font-semibold text-[#777777] text-[16px] leading-[1.4] whitespace-nowrap">
								작성자
							</p>
						</div>
						<div class="flex-1 flex items-center h-full px-[16px]">
							<input
								type="text"
								bind:value={writerName}
								placeholder="닉네임을 입력해주세요..."
								maxlength="10"
								disabled={isSubmitting}
								class="w-full font-normal text-black text-[16px] leading-[1.4] placeholder:text-[#999999] outline-none bg-transparent disabled:opacity-50"
							/>
						</div>
					</div>

					<!-- Password Field -->
					<div class="flex items-center">
						<div
							class="flex items-center justify-center px-[16px] py-[14px] border-r border-[#cccccc]"
						>
							<p class="font-semibold text-[#777777] text-[16px] leading-[1.4] whitespace-nowrap">
								비밀번호
							</p>
						</div>
						<div class="w-[80px] flex items-center h-full px-[16px]">
							<input
								type="password"
								bind:value={password}
								placeholder="0000"
								maxlength="4"
								disabled={isSubmitting}
								class="w-full text-center font-normal text-black text-[16px] leading-[1.4] placeholder:text-[#999999] outline-none bg-transparent disabled:opacity-50"
							/>
						</div>
					</div>
				</div>

				<!-- Message Text Area -->
				<div class="flex flex-col gap-[10px] items-start px-[20px] py-[24px] w-full">
					<div class="flex gap-[10px] h-[144px] items-start w-full">
						<textarea
							bind:value={inputText}
							oninput={handleInput}
							onkeydown={handleSubmit}
							placeholder="글 작성 후 엔터(ENTER)를 눌러주세요..."
							disabled={isSubmitting}
							class="w-full h-full resize-none outline-none text-black text-[16px] tablet:text-[18px] leading-[1.4] tracking-[-0.48px] placeholder:text-[#999999] bg-transparent disabled:opacity-50"
							maxlength="120"
						></textarea>
					</div>
				</div>

				<!-- Character Counter -->
				<div class="flex gap-[10px] items-center justify-end p-[16px] w-full">
					<p class="font-normal text-[#999999] text-[15px] leading-[1.5] whitespace-nowrap">
						{characterCount}/{maxCharacters}자
					</p>
				</div>
			</div>
		{/if}
	</div>

	<!-- Messages Grid Section -->
	<div
		class={isForTarget
			? 'flex flex-col gap-[40px] items-center justify-end px-0 py-[32px] w-full'
			: 'relative flex flex-col items-center w-full max-w-[1920px]'}
	>
		{#if isLoading}
			<!-- Loading State -->
			<div class="flex items-center justify-center py-[100px]">
				<p class="text-mobile-h8 tablet:text-pc-h8 text-[#999999]">로딩 중...</p>
			</div>
		{:else if currentMessages.length === 0}
			<!-- Empty State -->
			<div class="flex items-center justify-center py-[100px]">
				<p class="text-mobile-h8 tablet:text-pc-h8 text-[#999999]">첫 번째 메시지를 남겨주세요!</p>
			</div>
		{:else}
			<!-- Messages Grid with Two-Layer Animation System -->
			<div class="relative min-h-[400px] tablet:min-h-[480px] w-full overflow-hidden">
				<!-- Previous Messages Layer (fading out during transition) -->
				{#if isTransitioning && prevMessages.length > 0}
					<Motion
						animate={{ opacity: 0 }}
						transition={{ duration: 0.4, ease: 'easeInOut' }}
						let:motion
					>
						<div use:motion class="absolute inset-0 w-full" style="z-index: 1;">
							<div class="flex flex-col gap-[12px] items-center justify-center w-full">
								<!-- Row 1 -->
								<div
									class="grid {isForTarget
										? 'grid-cols-2 tablet:grid-cols-3 desktop:grid-cols-4'
										: 'grid-cols-2 tablet:grid-cols-3 desktop:grid-cols-4'} gap-[12px] w-full justify-items-center"
								>
									{#each prevMessages.slice(0, itemsPerRow) as message (message.id)}
										<MessageCard
											id={message.id}
											writer={message.writer}
											text={message.text}
											date={message.date}
											onedit={handleEdit}
											{isForTarget}
										/>
									{/each}
								</div>

								<!-- Row 2 -->
								{#if prevMessages.length > itemsPerRow}
									<div
										class="grid {isForTarget
											? 'grid-cols-4'
											: 'grid-cols-2 tablet:grid-cols-3 desktop:grid-cols-4'} gap-[12px] w-full justify-items-center"
									>
										{#each prevMessages.slice(itemsPerRow, itemsPerRow * 2) as message (message.id)}
											<MessageCard
												id={message.id}
												writer={message.writer}
												text={message.text}
												date={message.date}
												onedit={handleEdit}
												{isForTarget}
											/>
										{/each}
									</div>
								{/if}
							</div>
						</div>
					</Motion>
				{/if}

				<!-- Current Messages Layer (always rendered, fading in during transition) -->
				<Motion
					animate={{
						opacity: isTransitioning ? 1 : 1,
						x: isTransitioning ? 0 : 0
					}}
					initial={{
						opacity: isTransitioning ? 0 : 1,
						x: isTransitioning ? (pageDirection === 'forward' ? 100 : -100) : 0
					}}
					transition={{ duration: 0.4, ease: 'easeInOut' }}
					drag="x"
					dragConstraints={{ left: 0, right: 0 }}
					dragElastic={0.2}
					onDragEnd={(_event, info) => {
						const swipeThreshold = 50;
						const swipeVelocity = 500;

						if (info.offset.x < -swipeThreshold || info.velocity.x < -swipeVelocity) {
							// Swiped left - go to next page
							if (currentPage < totalPages - 1) {
								goToPage(currentPage + 1);
							}
						} else if (info.offset.x > swipeThreshold || info.velocity.x > swipeVelocity) {
							// Swiped right - go to previous page
							if (currentPage > 0) {
								goToPage(currentPage - 1);
							}
						}
					}}
					let:motion
				>
					<div
						use:motion
						class="absolute inset-0 w-full cursor-grab active:cursor-grabbing"
						style="z-index: {isTransitioning ? 2 : 1};"
					>
						<div class="flex flex-col gap-[12px] items-center justify-center w-full">
							<!-- Row 1 -->
							<div
								class="grid {isForTarget
									? 'grid-cols-2 tablet:grid-cols-3 desktop:grid-cols-4'
									: 'grid-cols-2 tablet:grid-cols-3 desktop:grid-cols-4'} gap-[12px] w-full justify-items-center"
							>
								{#each currentMessages.slice(0, itemsPerRow) as message (message.id)}
									<MessageCard
										id={message.id}
										writer={message.writer}
										text={message.text}
										date={message.date}
										onedit={handleEdit}
										{isForTarget}
									/>
								{/each}
							</div>

							<!-- Row 2 -->
							{#if currentMessages.length > itemsPerRow}
								<div
									class="grid {isForTarget
										? 'grid-cols-4'
										: 'grid-cols-2 tablet:grid-cols-3 desktop:grid-cols-4'} gap-[12px] w-full justify-items-center"
								>
									{#each currentMessages.slice(itemsPerRow, itemsPerRow * 2) as message (message.id)}
										<MessageCard
											id={message.id}
											writer={message.writer}
											text={message.text}
											date={message.date}
											onedit={handleEdit}
											{isForTarget}
										/>
									{/each}
								</div>
							{/if}
						</div>
					</div>
				</Motion>
			</div>
		{/if}

		<!-- Pagination Controls -->
		{#if totalPages > 1}
			<div
				class="flex items-center {isForTarget
					? 'gap-4 px-[12px]'
					: 'gap-4 px-[12px] mt-[20px] xs:mt-[40px]'}"
			>
				<!-- Previous Button -->
				<button
					onclick={() => goToPage(currentPage - 1)}
					disabled={currentPage === 0 || isLoading || isTransitioning}
					class="flex items-center justify-center w-[32px] h-[32px] transition-opacity hover:opacity-70 disabled:opacity-30 disabled:cursor-not-allowed"
					aria-label="Previous page"
				>
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M15 18L9 12L15 6"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				</button>

				<!-- Page Dots -->
				<div class="flex items-center gap-0">
					{#each Array(totalPages) as _, index}
						<button
							onclick={() => goToPage(index)}
							class="flex items-center justify-center w-[32px] h-[32px] transition-opacity hover:opacity-70 cursor-pointer disabled:opacity-50"
							aria-label={`Page ${index + 1}`}
							disabled={isLoading || isTransitioning}
						>
							<div class="w-[14px] h-[14px]">
								<img
									src={currentPage === index
										? '/icons/pagination-active.svg'
										: '/icons/pagination-default.svg'}
									alt=""
									class="w-full h-full"
								/>
							</div>
						</button>
					{/each}
				</div>

				<!-- Next Button -->
				<button
					onclick={() => goToPage(currentPage + 1)}
					disabled={currentPage === totalPages - 1 || isLoading || isTransitioning}
					class="flex items-center justify-center w-[32px] h-[32px] transition-opacity hover:opacity-70 disabled:opacity-30 disabled:cursor-not-allowed"
					aria-label="Next page"
				>
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M9 18L15 12L9 6"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				</button>
			</div>
		{/if}
	</div>
</section>

<!-- Edit Message Modal -->
<EditMessageModal
	message={editingMessage}
	isOpen={showEditModal}
	onClose={handleCloseModal}
	onUpdate={handleUpdateMessage}
/>

<style>
	textarea::placeholder {
		color: #999999;
	}
</style>
