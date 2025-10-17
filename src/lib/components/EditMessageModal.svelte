<script lang="ts">
	/**
	 * Edit Message Modal Component
	 * Two-state flow: Password verification → Message editing
	 */

	import MessageInput from './MessageInput.svelte';
	import type { Message } from '$lib/types/message';

	interface Props {
		message: Message | null;
		isOpen?: boolean;
		onClose?: () => void;
		onUpdate?: () => void;
	}

	let { message, isOpen = false, onClose, onUpdate }: Props = $props();

	type ModalState = 'password' | 'edit';
	let currentState = $state<ModalState>('password');
	let passwordInput = $state('');
	let isVerifying = $state(false);
	let isUpdating = $state(false);
	let error = $state<string | null>(null);
	let editedMessage = $state('');

	// Reset state when modal opens/closes
	$effect(() => {
		if (isOpen && message) {
			currentState = 'password';
			passwordInput = '';
			error = null;
			editedMessage = message.text;
		}
	});

	async function verifyPassword() {
		if (!message || !passwordInput.trim()) {
			error = '비밀번호를 입력해주세요.';
			return;
		}

		isVerifying = true;
		error = null;

		try {
			// Verify password by attempting to fetch with credentials
			const response = await fetch(`/api/messages/${message.id}/verify`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ password: passwordInput })
			});

			if (response.ok) {
				// Password correct, move to edit state
				currentState = 'edit';
			} else {
				const data = await response.json();
				error = data.error || '잘못된 비밀번호입니다. 다시 입력해주세요.';
			}
		} catch (err) {
			error = '서버 오류가 발생했습니다.';
			console.error('Password verification error:', err);
		} finally {
			isVerifying = false;
		}
	}

	async function handleUpdate(data: { writer: string; password: string; message: string }) {
		if (!message) return;

		isUpdating = true;
		error = null;

		try {
			const response = await fetch(`/api/messages/${message.id}`, {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					password: passwordInput,
					message: data.message
				})
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.error || 'Failed to update message');
			}

			// Success - close modal and notify parent
			onUpdate?.();
			onClose?.();
		} catch (err) {
			error = err instanceof Error ? err.message : '메시지 수정에 실패했습니다.';
			console.error('Update error:', err);
		} finally {
			isUpdating = false;
		}
	}

	function handleBackdropClick(e: MouseEvent) {
		if (e.target === e.currentTarget) {
			onClose?.();
		}
	}

	function handleKeyDown(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			onClose?.();
		}
	}

	function handlePasswordKeyDown(e: KeyboardEvent) {
		if (e.key === 'Enter' && passwordInput.trim()) {
			e.preventDefault();
			verifyPassword();
		}
	}
</script>

{#if isOpen && message}
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<!-- svelte-ignore a11y_interactive_supports_focus -->
	<div
		class="fixed inset-0 z-50 flex items-center justify-center p-4"
		onclick={handleBackdropClick}
		onkeydown={handleKeyDown}
		role="dialog"
		aria-modal="true"
		tabindex="-1"
	>
		<!-- Backdrop -->
		<div class="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

		<!-- Modal Content -->
		<div class="relative bg-[#fefefe] shadow-2xl max-w-[680px] w-full">
			{#if currentState === 'password'}
				<!-- Password Verification State -->
				<div class="flex flex-col gap-[40px] p-[32px]">
					<!-- Header -->
					<div class="flex flex-col gap-[4px]">
						<h2 class="text-[24px] tablet:text-[32px] font-bold text-[#111111] leading-[1.2]">
							방명록 수정
						</h2>
						<p class="text-[18px] tablet:text-[24px] font-normal text-[#111111] leading-[1.5]">
							비밀번호를 입력해주세요
						</p>
					</div>

					<!-- Password Input -->
					<div class="flex flex-col gap-[20px]">
						<div class="flex items-center justify-center border border-[#cccccc] px-[20px] py-[16px]">
							<input
								type="password"
								bind:value={passwordInput}
								onkeydown={handlePasswordKeyDown}
								placeholder="0000"
								maxlength="4"
								disabled={isVerifying}
								class="w-full text-center font-normal text-black text-[24px] tablet:text-[32px] leading-[1.2] placeholder:text-[#999999] outline-none bg-transparent disabled:opacity-50"
							/>
						</div>

						<!-- Error Message -->
						{#if error}
							<div class="flex gap-[12px] items-center bg-[#fc451e] text-white px-[24px] py-[16px]">
								<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
									<path
										d="M18 6L6 18M6 6L18 18"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
								</svg>
								<p class="text-[16px] tablet:text-[18px] font-medium">{error}</p>
							</div>
						{/if}
					</div>

					<!-- Buttons -->
					<div class="flex gap-[12px] justify-center">
						<button
							onclick={onClose}
							disabled={isVerifying}
							class="flex items-center justify-center w-[98px] h-[54px] border border-[#111111] text-[#111111] font-semibold text-[18px] tablet:text-[20px] transition-opacity hover:opacity-70 disabled:opacity-50"
						>
							취소
						</button>
						<button
							onclick={verifyPassword}
							disabled={isVerifying || !passwordInput.trim()}
							class="flex items-center justify-center w-[98px] h-[54px] bg-[#fc451e] text-white font-semibold text-[18px] tablet:text-[20px] transition-opacity hover:opacity-90 disabled:opacity-50"
						>
							{isVerifying ? '확인 중...' : '확인'}
						</button>
					</div>
				</div>
			{:else}
				<!-- Edit State -->
				<div class="flex flex-col gap-[32px] p-[32px]">
					<!-- Title -->
					<h2 class="text-[24px] tablet:text-[32px] font-bold text-[#111111] leading-[1.2]">
						방명록 수정
					</h2>

					<!-- Error Message -->
					{#if error}
						<div class="flex gap-[12px] items-center bg-[#fc451e] text-white px-[24px] py-[16px]">
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
								<path
									d="M18 6L6 18M6 6L18 18"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
							</svg>
							<p class="text-[16px] tablet:text-[18px] font-medium">{error}</p>
						</div>
					{/if}

					<!-- Message Input Component -->
					<MessageInput
						initialWriter={message.writer}
						initialPassword={passwordInput}
						initialMessage={editedMessage}
						mode="edit"
						isSubmitting={isUpdating}
						onSubmit={handleUpdate}
						onMessageChange={(msg) => (editedMessage = msg)}
					/>

					<!-- Buttons -->
					<div class="flex gap-[12px] justify-end">
						<button
							onclick={onClose}
							disabled={isUpdating}
							class="flex items-center justify-center px-[24px] h-[54px] border border-[#111111] text-[#111111] font-semibold text-[18px] tablet:text-[20px] transition-opacity hover:opacity-70 disabled:opacity-50"
						>
							취소
						</button>
						<button
							onclick={() => handleUpdate({ writer: message.writer, password: passwordInput, message: editedMessage })}
							disabled={isUpdating}
							class="flex items-center justify-center px-[24px] h-[54px] bg-[#fc451e] text-white font-semibold text-[18px] tablet:text-[20px] transition-opacity hover:opacity-90 disabled:opacity-50"
						>
							{isUpdating ? '저장 중...' : '저장'}
						</button>
					</div>
				</div>
			{/if}
		</div>
	</div>
{/if}
