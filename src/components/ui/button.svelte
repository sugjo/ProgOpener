<script>
	import Icon from './icon.svelte';

	export let icon = null;
	export let focus = false;
	export let title = null;
	export let disabled = false;

	let button;

	$: if (focus) button?.focus();
</script>

<button
	{disabled}
	{title}
	bind:this={button}
	on:blur={() => (focus = false)}
	on:click|stopPropagation
>
	<div
		class="button-body {$$slots.default && !icon ? 'text-only' : ''}"
	>
		{#if icon}
			<Icon name={icon} --icon-height="20px" --icon-width="20px" />
		{/if}
		<slot />
	</div>
</button>

<style>
	button {
		border-radius: var(--border-radius);
		transition: 0.2s;
		padding: 5px;
		border: 2px solid transparent;
	}

	button:hover {
		background-color: var(--background-hover);
	}

	button:active .button-body {
		position: relative;
		top: 1px;
	}

	button:focus {
		background: var(--background-hover);
		border: 2px solid var(--active-color);
	}

	button:disabled {
		filter: brightness(0.5);
	}

	.button-body {
		color: var(--color);
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
