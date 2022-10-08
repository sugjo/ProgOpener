<script>
	import Icon from "@/components/ui/icon.svelte";

	export let title;
	export let body = '';
	export let src;
</script>

<div class="settings-card" class:titleOnly={!body}>
	<Icon {src} />
	<div class="title">
		{title}
	</div>
	{#if body}
		<div class="body">
			{body}
		</div>
	{/if}
	<div class="btns">
		<slot />
	</div>
</div>

<style>
	.settings-card {
		position: relative;
		display: grid;
		grid-template-columns: min-content 1fr;
		align-items: center;
		grid-template-areas:
			'icon title btns'
			'icon body btns';
		background-color: var(--background-active);
		border-radius: var(--border-radius);
		font-size: 16px;
		padding: 15px;
	}

	.titleOnly {
		grid-template-areas: 'icon title btns';
	}

	.title {
		grid-area: title;
	}

	.body {
		grid-area: body;
		align-items: body;
		margin-top: 5px;
	}

	.btns {
		grid-area: btns;
	}
</style>
