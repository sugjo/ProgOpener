<script>
	import Button from '../button.svelte';
	import Icon from '../icon.svelte';
	import { createEventDispatcher } from 'svelte';
	import { i18n } from '@/utils/languageSwapper';

	export let disabled;
	export let path;
	const dispatch = createEventDispatcher();
</script>

<div class="path">
	<div class="disable-button" class:disabled title={disabled? $i18n.t("paths.on"): $i18n.t("paths.off")}>
		<Button on:click={() => dispatch('toggle')} icon="power" />
	</div>
	<div class="path-body" class:disabled>
		<Icon name="folder" />
		<p title={path}>{path}</p>
		<div class="buttons">
			<Button on:click={() => dispatch('change')} title={$i18n.t("paths.change")} icon="edit" {disabled} />
			<Button on:click={() => dispatch('delete')} title={$i18n.t("paths.delete")} icon="delete" {disabled} />
		</div>
	</div>
</div>

<style>
	.path {
		position: relative;
		display: grid;
		grid-template-columns: min-content 1fr min-content;
		align-items: center;
		border: 2px solid transparent;
		border-radius: var(--border-radius);
		min-width: 0;
		gap: 5px;
	}

	.path-body {
		display: grid;
		grid-template-columns: min-content 1fr min-content;
		align-items: center;
		max-width: 100%;
	}

	.path-body p {
		margin:  0 5px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.path-body.disabled {
		filter: brightness(0.6);
	}

	.buttons {
		display: flex;
	}
</style>
