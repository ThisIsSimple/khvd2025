// Global UI state management using Svelte 5 runes

class UIState {
	isUIHidden = $state(false);

	toggleUI() {
		this.isUIHidden = !this.isUIHidden;
	}

	showUI() {
		this.isUIHidden = false;
	}

	hideUI() {
		this.isUIHidden = true;
	}
}

export const uiState = new UIState();
