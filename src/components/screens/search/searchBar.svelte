<script>
	import clickOutside from '@/utils/clickOutside';
	import keydown from '@/utils/keydown';

	export let value;

	let inputElement;
	let isFocus;

	window.api.receive('show', () => {
		inputFocus();
	});

	window.api.receive('hide', () => {
		value = '';
	});

	const inputFocus = () => inputElement?.focus();
</script>

<main use:clickOutside={window.api.hide} use:keydown={inputFocus}>
	<div class="search-panel" class:focus={isFocus}>
		<input
			on:blur={() => (isFocus = false)}
			on:focus={() => (isFocus = true)}
			bind:this={inputElement}
			bind:value
			type="text"
		/>
	</div>

	{#if value}
		<slot />
	{/if}
</main>

<style>
	main {
		flex-direction: column;
		gap: 5px;
		background-color: var(--background);
		border-radius: var(--border-radius);
		border: var(--border);
		color: var(--color);
		width: var(--search-width);
		margin-top: calc(50vh - var(--search-height) / 2);
		font-size: 100%;
	}

	.search-panel {
		display: flex;
		align-items: center;
		border: 2px solid var(--background);
		border-radius: 5px;
		width: 100%;
		height: var(--search-height);
		padding: 5px;
	}

	.search-panel:hover:not(.focus) {
		border: var(--border-hover);
	}

	.focus {
		border: var(--border-active);
	}
</style>
