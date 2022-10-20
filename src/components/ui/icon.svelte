<script>
	export let name;
</script>

<svg class="icon" aria-hidden="true">
	<use href="#icon-{name}" fill="currentColor" />
</svg>

<style>
	.icon {
		color: var(--color);
		user-select: none;
		height: var(--icon-height);
		width: var(--icon-width);
		margin: 0;
		padding: 0;
	}
</style>
