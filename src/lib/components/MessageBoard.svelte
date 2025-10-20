<script lang="ts">
	import MessageCard from './MessageCard.svelte';
	import EditMessageModal from './EditMessageModal.svelte';
	import type { Message, MessagesResponse } from '$lib/types/message';
	import { onMount } from 'svelte';

	let messages = $state<Message[]>([]);
	let totalMessages = $state(0);
	let inputText = $state('');
	let writerName = $state('');
	let password = $state('');
	let currentPage = $state(0);
	let isLoading = $state(false);
	let isSubmitting = $state(false);
	let error = $state<string | null>(null);

	// Edit modal state
	let editingMessage = $state<Message | null>(null);
	let showEditModal = $state(false);

	const maxCharacters = 120;

	// Responsive messages per page
	// Desktop: 8 (4 per row, 2 rows), Tablet: 6 (3 per row, 2 rows), Mobile: 4 (2 per row, 2 rows)
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
		if (width >= 1351) {
			// Desktop: 4 per row, 2 rows = 8 messages
			messagesPerPage = 8;
			itemsPerRow = 4;
		} else if (width >= 960) {
			// Tablet: 3 per row, 2 rows = 6 messages
			messagesPerPage = 6;
			itemsPerRow = 3;
		} else {
			// Mobile: 2 per row, 2 rows = 4 messages
			messagesPerPage = 4;
			itemsPerRow = 2;
		}
	}

	// Fetch messages from API
	async function fetchMessages(page: number = 0) {
		isLoading = true;
		error = null;
		try {
			const response = await fetch(`/api/messages?page=${page}&pageSize=${messagesPerPage}`);
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
			const response = await fetch('/api/messages', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					writer: writerName.trim(),
					password: password.trim(),
					message: inputText.trim()
				})
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.error || 'Failed to submit message');
			}

			// Clear form and refresh messages
			inputText = '';
			writerName = '';
			password = '';
			await fetchMessages(0); // Go to first page to see new message
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
		await fetchMessages(page);
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
		// Refresh current page to show updated message
		await fetchMessages(currentPage);
	}

	// Load messages on component mount
	onMount(() => {
		updateMessagesPerPage();
		fetchMessages(0);

		// Listen for window resize
		window.addEventListener('resize', updateMessagesPerPage);

		return () => {
			window.removeEventListener('resize', updateMessagesPerPage);
		};
	});
</script>

<section
	class="relative flex flex-col gap-[80px] items-center justify-center py-[60px] tablet:py-[100px] px-4 tablet:px-10 pb-[200px]"
>
	<!-- Background Image -->
	<img
		src="/message-board-bg.webp"
		alt=""
		class="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
	/>

	<!-- Input Section -->
	<div class="relative flex flex-col gap-[16px] tablet:gap-[32px] items-center w-full max-w-[680px]">
		<!-- Title -->
		<h2 class="text-[18px] tablet:text-[24px] desktop:text-[32px] font-bold text-[#111111] text-center w-full">
			응원의 말을 적어주세요
		</h2>

		<!-- Error Message -->
		{#if error}
			<div class="w-full bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
				{error}
			</div>
		{/if}

		<!-- Input Box (Figma Design) -->
		<div class="bg-[#fefefe] flex flex-col items-start w-full">
			<!-- Top Row: Writer and Password Fields -->
			<div class="flex items-start justify-end w-full border-b border-[#cccccc]">
				<!-- Writer Field -->
				<div class="flex-1 flex items-center border-r border-[#cccccc]">
					<!-- Label -->
					<div class="flex items-center justify-center px-[16px] py-[14px] border-r border-[#cccccc]">
						<p class="font-bold text-[#777777] text-[16px] tablet:text-[20px] leading-[1.4] whitespace-nowrap">
							작성자
						</p>
					</div>
					<!-- Input -->
					<div class="flex-1 flex items-center h-full px-[16px]">
						<input
							type="text"
							bind:value={writerName}
							placeholder="닉네임을 입력해주세요..."
							maxlength="10"
							disabled={isSubmitting}
							class="w-full font-normal text-black text-[15px] tablet:text-[18px] leading-[1.4] placeholder:text-[#999999] outline-none bg-transparent disabled:opacity-50"
						/>
					</div>
				</div>

				<!-- Password Field -->
				<div class="flex items-center border-r border-[#cccccc]">
					<!-- Label -->
					<div class="flex items-center justify-center px-[16px] py-[14px] border-r border-[#cccccc]">
						<p class="font-bold text-[#777777] text-[16px] tablet:text-[20px] leading-[1.4] whitespace-nowrap">
							비밀번호
						</p>
					</div>
					<!-- Input -->
					<div class="w-[80px] flex items-center h-full px-[16px]">
						<input
							type="password"
							bind:value={password}
							placeholder="0000"
							maxlength="4"
							disabled={isSubmitting}
							class="w-full text-center font-normal text-black text-[15px] tablet:text-[18px] leading-[1.4] placeholder:text-[#999999] outline-none bg-transparent disabled:opacity-50"
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
						class="w-full h-full resize-none outline-none font-bold text-black text-[20px] tablet:text-[24px] leading-[1.4] tracking-[-0.48px] placeholder:text-[#999999] bg-transparent disabled:opacity-50"
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
	</div>

	<!-- Messages Grid Section -->
	<div class="relative flex flex-col items-center w-full max-w-[1920px]">
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
			<!-- Messages Grid: Responsive 2/3/4 columns -->
			<div class="flex flex-col gap-[24px] items-center justify-center w-full">
				<!-- Row 1 -->
				<div class="grid grid-cols-2 tablet:grid-cols-3 desktop:grid-cols-4 gap-[16px] w-full justify-items-center">
					{#each currentMessages.slice(0, itemsPerRow) as message (message.id)}
						<MessageCard
							id={message.id}
							writer={message.writer}
							text={message.text}
							date={message.date}
							onedit={handleEdit}
						/>
					{/each}
				</div>

				<!-- Row 2 -->
				{#if currentMessages.length > itemsPerRow}
					<div class="grid grid-cols-2 tablet:grid-cols-3 desktop:grid-cols-4 gap-[16px] w-full justify-items-center">
						{#each currentMessages.slice(itemsPerRow, itemsPerRow * 2) as message (message.id)}
							<MessageCard
								id={message.id}
								writer={message.writer}
								text={message.text}
								date={message.date}
								onedit={handleEdit}
							/>
						{/each}
					</div>
				{/if}
			</div>
		{/if}

		<!-- Pagination Controls (Figma Design) -->
		{#if totalPages > 1}
			<div class="flex items-center gap-0 px-[12px] mt-[20px] xs:mt-[40px]">
				{#each Array(totalPages) as _, index}
					<button
						onclick={() => goToPage(index)}
						class="flex items-center justify-center w-[32px] h-[32px] transition-opacity hover:opacity-70"
						aria-label={`Page ${index + 1}`}
						disabled={isLoading}
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
