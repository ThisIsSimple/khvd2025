<script lang="ts">
	import MessageCard from './MessageCard.svelte';
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

	const messagesPerPage = 10;
	const maxCharacters = 120;

	// Calculate total pages
	let totalPages = $derived(Math.ceil(totalMessages / messagesPerPage));

	// Get current page messages - no slicing needed, API handles pagination
	let currentMessages = $derived(messages);

	// Character count
	let characterCount = $derived(inputText.length);

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

	// Load messages on component mount
	onMount(() => {
		fetchMessages(0);
	});
</script>

<section
	class="relative flex flex-col gap-[80px] items-center justify-center py-[100px] px-4 tablet:px-0 pb-[200px]"
>
	<!-- Background Image -->
	<img
		src="/message-board-bg.png"
		alt=""
		class="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
	/>

	<!-- Input Section -->
	<div class="relative flex flex-col gap-[32px] items-center w-full max-w-[680px]">
		<!-- Title -->
		<h2 class="text-mobile-h8 tablet:text-pc-h8 font-bold text-[#111111] text-center w-full">
			응원의 말을 적어주세요
		</h2>

		<!-- Error Message -->
		{#if error}
			<div class="w-full bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
				{error}
			</div>
		{/if}

		<!-- Name and Password Row -->
		<div class="flex gap-[16px] w-full">
			<input
				type="text"
				bind:value={writerName}
				placeholder="작성자 (최대 50자)"
				maxlength="50"
				disabled={isSubmitting}
				class="flex-1 bg-[#fefefe] px-[20px] py-[16px] text-mobile-b1 tablet:text-pc-b1 font-normal text-black placeholder:text-[#999999] outline-none disabled:opacity-50"
			/>
			<input
				type="password"
				bind:value={password}
				placeholder="비밀번호 (4-10자)"
				maxlength="10"
				disabled={isSubmitting}
				class="w-[200px] bg-[#fefefe] px-[20px] py-[16px] text-mobile-b1 tablet:text-pc-b1 font-normal text-black placeholder:text-[#999999] outline-none disabled:opacity-50"
			/>
		</div>

		<!-- Message Input Box -->
		<div class="bg-[#fefefe] flex flex-col h-[255px] w-full">
			<!-- Text Input Area -->
			<div class="flex-1 flex flex-col gap-[10px] px-[28px] py-[24px]">
				<textarea
					bind:value={inputText}
					oninput={handleInput}
					onkeydown={handleSubmit}
					placeholder="글 작성 후 엔터(ENTER)를 눌러주세요..."
					disabled={isSubmitting}
					class="flex-1 w-full resize-none outline-none text-mobile-h6 tablet:text-pc-h10 font-bold text-black placeholder:text-[#999999] tracking-[-0.48px] disabled:opacity-50"
				></textarea>
			</div>

			<!-- Character Counter -->
			<div class="flex gap-[10px] items-center justify-end p-[16px]">
				<p class="text-[14px] font-medium text-[#999999] whitespace-nowrap">
					{characterCount}/{maxCharacters}자
				</p>
			</div>
		</div>
	</div>

	<!-- Messages Grid Section -->
	<div class="relative flex flex-col gap-[40px] items-center w-full max-w-[1920px]">
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
			<!-- Messages Grid -->
			<div class="flex flex-col gap-[24px] items-start justify-center px-4 tablet:px-[40px] w-full">
				<!-- Row 1: 5 cards -->
				<div class="flex flex-wrap tablet:flex-nowrap gap-[16px] w-full justify-center">
					{#each currentMessages.slice(0, 5) as message (message.id)}
						<MessageCard writer={message.writer} text={message.text} date={message.date} />
					{/each}
				</div>

				<!-- Row 2: 5 cards -->
				{#if currentMessages.length > 5}
					<div class="flex flex-wrap tablet:flex-nowrap gap-[16px] w-full justify-center">
						{#each currentMessages.slice(5, 10) as message (message.id)}
							<MessageCard writer={message.writer} text={message.text} date={message.date} />
						{/each}
					</div>
				{/if}
			</div>
		{/if}

		<!-- Pagination Controls -->
		{#if totalPages > 1}
			<div class="flex items-center gap-[12px] px-[12px]">
				{#each Array(totalPages) as _, index}
					<button
						onclick={() => goToPage(index)}
						class="flex items-center justify-center w-[32px] h-[32px] transition-opacity hover:opacity-70"
						aria-label={`Page ${index + 1}`}
					>
						<img
							src={currentPage === index
								? '/icons/pagination_active.svg'
								: '/icons/pagination_inactive.svg'}
							alt=""
							class="w-[14px] h-[14px]"
						/>
					</button>
				{/each}
			</div>
		{/if}
	</div>
</section>

<style>
	textarea::placeholder {
		color: #999999;
	}
</style>
