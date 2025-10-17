<script lang="ts">
	/**
	 * Reusable Message Input Component
	 * Used for both creating new messages and editing existing ones
	 */

	interface Props {
		initialWriter?: string;
		initialPassword?: string;
		initialMessage?: string;
		mode?: 'create' | 'edit';
		isSubmitting?: boolean;
		onSubmit?: (data: { writer: string; password: string; message: string }) => void;
		onCancel?: () => void;
	}

	let {
		initialWriter = '',
		initialPassword = '',
		initialMessage = '',
		mode = 'create',
		isSubmitting = false,
		onSubmit,
		onCancel
	}: Props = $props();

	let writerName = $state(initialWriter);
	let password = $state(initialPassword);
	let inputText = $state(initialMessage);

	const maxCharacters = 120;

	// Character count
	let characterCount = $derived(inputText.length);

	function handleInput(e: Event) {
		const target = e.target as HTMLTextAreaElement;
		if (target.value.length <= maxCharacters) {
			inputText = target.value;
		} else {
			target.value = inputText;
		}
	}

	function handleKeyDown(e: KeyboardEvent) {
		if (e.key === 'Enter' && !e.shiftKey && inputText.trim()) {
			e.preventDefault();
			handleSubmit();
		}
	}

	function handleSubmit() {
		if (!writerName.trim() || !password.trim() || !inputText.trim()) {
			return;
		}
		onSubmit?.({
			writer: writerName.trim(),
			password: password.trim(),
			message: inputText.trim()
		});
	}
</script>

<!-- Input Box (Figma Design) -->
<div class="bg-[#fefefe] flex flex-col items-start w-full">
	<!-- Top Row: Writer and Password Fields -->
	<div class="flex items-start justify-end w-full border-b border-[#cccccc]">
		<!-- Writer Field -->
		<div class="flex-1 flex items-center border-r border-[#cccccc]">
			<!-- Label -->
			<div class="flex items-center justify-center px-[16px] py-[14px] border-r border-[#cccccc]">
				<p
					class="font-bold text-[#777777] text-[16px] tablet:text-[20px] leading-[1.4] whitespace-nowrap"
				>
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
					disabled={isSubmitting || mode === 'edit'}
					class="w-full font-normal text-black text-[15px] tablet:text-[18px] leading-[1.4] placeholder:text-[#999999] outline-none bg-transparent disabled:opacity-50"
				/>
			</div>
		</div>

		<!-- Password Field -->
		<div class="flex items-center border-r border-[#cccccc]">
			<!-- Label -->
			<div class="flex items-center justify-center px-[16px] py-[14px] border-r border-[#cccccc]">
				<p
					class="font-bold text-[#777777] text-[16px] tablet:text-[20px] leading-[1.4] whitespace-nowrap"
				>
					비밀번호
				</p>
			</div>
			<!-- Input -->
			<div class="flex items-center h-full px-[16px]">
				<input
					type="password"
					bind:value={password}
					placeholder="0000"
					maxlength="4"
					disabled={isSubmitting || mode === 'edit'}
					class="font-normal text-black text-[15px] tablet:text-[18px] leading-[1.4] placeholder:text-[#999999] outline-none bg-transparent disabled:opacity-50"
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
				onkeydown={handleKeyDown}
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

<style>
	textarea::placeholder {
		color: #999999;
	}
</style>
