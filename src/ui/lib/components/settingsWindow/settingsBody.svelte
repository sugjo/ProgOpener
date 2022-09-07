<script>
	import { Icon } from '../generic';
	export let title;
	export let body = '';
	export let src;
</script>

<div class="settings-body" class:titleOnly={!body}>
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
	.settings-body {
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
		padding: 15px 0;
	}

	.titleOnly {
		grid-template-areas: 'icon title btns';
	}

	.title {
		grid-area: title;
	}

	.body {
		align-items: body;
		margin-top: 5px;
	}

	.btns {
		grid-area: btns;
		margin: 0 15px;
	}
</style>
