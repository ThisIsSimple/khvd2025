<script lang="ts">
	import MessageCard from './MessageCard.svelte';

	// Sample messages data (replace with real data from API/database)
	let messages = $state([
		{
			id: 1,
			text: '졸전 끝나고 나는 일본여행을 떠날 거야, 일본이 아니더라도 어디론가 떠나서 돌아오지 않을테야 아냐 돌아와야지 취업해야하는데 뭔 이상한 소리지 그러게 뭘까 내용 채울 말이 없어서 작업하기 싫어서 주저리주저리아아아아아.',
			date: '2025.07.08'
		},
		{
			id: 2,
			text: '졸전 끝나고 나는 일본여행을 떠날 거야, 일',
			date: '2025.07.08'
		},
		{
			id: 3,
			text: '졸전 끝나고 나는 일본여행을 떠날 거야, 일본이 아니더라도 어디론가 떠나서 돌아오지 않을테야 아냐 돌아와야지 취업해야하는데 뭔 이상한 소리지 그러게 뭘까 내용 채울 말이 없어서 작업하기 싫어서 주저리주저리아아아아아.',
			date: '2025.07.08'
		},
		{
			id: 4,
			text: '졸전 끝나고 나는 일본여행을 떠날 거야, 일본이 아니더라도 어디론가 떠나서 돌아오지 않을테야 아냐 돌아와야지 취업해야하는데 뭔 이상한 소리지 그러게 뭘까 내용 채울 말이 없어서 작업하기 싫어서 주저리주저리아아아아아.',
			date: '2025.07.08'
		},
		{
			id: 5,
			text: '졸전 끝나고 나는 일본여행을 떠날 거야, 일본이 아니더라도 어디론가 떠나서 돌아오지 않을테야 아냐 돌아와야지 취업해야하는데 뭔 이상한 소리지 그러게 뭘까 내용 채울 말이 없어서 작업하기 싫어서 주저리주저리아아아아아.',
			date: '2025.07.08'
		},
		{
			id: 6,
			text: '졸전 끝나고 나는 일본여행을 떠날 거야, 일본이 아니더라도 어디론가 떠나서 돌아오지 않을테야 아냐 돌아와야지 취업해야하는데 뭔 이상한 소리지 그러게 뭘까 내용 채울 말이 없어서 작업하기 싫어서 주저리주저리아아아아아.',
			date: '2025.07.08'
		},
		{
			id: 7,
			text: '졸전 끝나고 나는 일본여행을 떠날 거야, 일본이 아니더라도 어디론가 떠나서 돌아오지 않을테야 아냐 돌아와야지 취업해야하는데 뭔 이상한 소리지 그러게 뭘까 내용 채울 말이 없어서 작업하기 싫어서 주저리주저리아아아아아.',
			date: '2025.07.08'
		},
		{
			id: 8,
			text: '졸전 끝나고 나는 일본여행을 떠날 거야, 일본이 아니더라도 어디론가 떠나서 돌아오지 않을테야 아냐 돌아와야지 취업해야하는데 뭔 이상한 소리지 그러게 뭘까 내용 채울 말이 없어서 작업하기 싫어서 주저리주저리아아아아아.',
			date: '2025.07.08'
		},
		{
			id: 9,
			text: '졸전 끝나고 나는 일본여행을 떠날 거야, 일본이 아니더라도 어디론가 떠나서 돌아오지 않을테야 아냐 돌아와야지 취업해야하는데 뭔 이상한 소리지 그러게 뭘까 내용 채울 말이 없어서 작업하기 싫어서 주저리주저리아아아아아.',
			date: '2025.07.08'
		},
		{
			id: 10,
			text: '졸전 끝나고 나는 일본여행을 떠날 거야, 일본이 아니더라도 어디론가 떠나서 돌아오지 않을테야 아냐 돌아와야지 취업해야하는데 뭔 이상한 소리지 그러게 뭘까 내용 채울 말이 없어서 작업하기 싫어서 주저리주저리아아아아아.',
			date: '2025.07.08'
		}
	]);

	let inputText = $state('');
	let currentPage = $state(0);
	const messagesPerPage = 10;
	const maxCharacters = 120;

	// Calculate total pages
	let totalPages = $derived(Math.ceil(messages.length / messagesPerPage));

	// Get current page messages
	let currentMessages = $derived(
		messages.slice(currentPage * messagesPerPage, (currentPage + 1) * messagesPerPage)
	);

	// Character count
	let characterCount = $derived(inputText.length);

	function handleSubmit(e: KeyboardEvent) {
		if (e.key === 'Enter' && !e.shiftKey && inputText.trim()) {
			e.preventDefault();

			// Add new message
			const newMessage = {
				id: messages.length + 1,
				text: inputText.trim(),
				date: new Date().toLocaleDateString('ko-KR', {
					year: 'numeric',
					month: '2-digit',
					day: '2-digit'
				}).replace(/\. /g, '.').replace('.', '.')
			};

			messages = [newMessage, ...messages];
			inputText = '';
			currentPage = 0; // Go to first page to see new message
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

	function goToPage(page: number) {
		currentPage = page;
	}
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

		<!-- Input Box -->
		<div class="bg-[#fefefe] flex flex-col h-[255px] w-full">
			<!-- Text Input Area -->
			<div class="flex-1 flex flex-col gap-[10px] px-[28px] py-[24px]">
				<textarea
					bind:value={inputText}
					oninput={handleInput}
					onkeydown={handleSubmit}
					placeholder="글 작성 후 엔터(ENTER)를 눌러주세요..."
					class="flex-1 w-full resize-none outline-none text-mobile-h6 tablet:text-pc-h10 font-bold text-black placeholder:text-[#999999] tracking-[-0.48px]"
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
		<!-- Messages Grid -->
		<div class="flex flex-col gap-[24px] items-start justify-center px-4 tablet:px-[40px] w-full">
			<!-- Row 1: 5 cards -->
			<div class="flex flex-wrap tablet:flex-nowrap gap-[16px] w-full justify-center">
				{#each currentMessages.slice(0, 5) as message (message.id)}
					<MessageCard text={message.text} date={message.date} />
				{/each}
			</div>

			<!-- Row 2: 5 cards -->
			{#if currentMessages.length > 5}
				<div class="flex flex-wrap tablet:flex-nowrap gap-[16px] w-full justify-center">
					{#each currentMessages.slice(5, 10) as message (message.id)}
						<MessageCard text={message.text} date={message.date} />
					{/each}
				</div>
			{/if}
		</div>

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
