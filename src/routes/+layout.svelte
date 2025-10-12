<script lang="ts">
	import '../app.css';
	import type { LayoutData } from './$types';

	let { children }: { children: any } = $props();
</script>

{@render children()}
