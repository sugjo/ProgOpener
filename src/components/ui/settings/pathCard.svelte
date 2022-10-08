<script>
	import Button from '../button.svelte';
	import Icon from '../icon.svelte';
	import { createEventDispatcher } from 'svelte';

	export let disabled;
	export let path;
	const dispatch = createEventDispatcher();
</script>

<div class="path" class:disabled>
	<Button on:click={() => dispatch('toggle')} icon="public://images/power.svg" />
	<div class="path-body">
		<div class="path-change">
			<Icon src="public://images/folder.svg" />
			<p title={path}>{path}</p>
			<Button
				on:click={() => dispatch('change')}
				icon="public://images/edit.svg"
				{disabled}
			/>
		</div>
	</div>
	<Button
		on:click={() => dispatch('delete')}
		title="Удалить"
		icon="public://images/delete.svg"
		{disabled}
	/>
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
		display: flex;
		flex-direction: column;
	}

	.path-body p {
		margin: 0;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.path-change {
		display: grid;
		grid-template-columns: min-content 1fr min-content;
		align-items: center;
		max-width: 100%;
	}
	.disabled {
		filter: brightness(0.6);
	}
</style>
