<script lang="ts">
	// Teaser page layout - excludes navigation menu
	let { children }: { children: any } = $props();
</script>

<!-- Teaser page content without navigation -->
{@render children()}
