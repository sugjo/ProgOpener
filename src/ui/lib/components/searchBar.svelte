<script>
	import { fade } from 'svelte/transition';
	import clickOutside from '../utils/clickOutside';
	import keydown from '../utils/keydown';

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
	<div class="search-panel noisy" class:focus={isFocus}>
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
	:root,
	::after,
	::before {
		--search-width: 600px;
		--search-height: 50px;
		--active-color: #417fb1;
		--background: #1a1b1f;
		--background-active: #25262a;
		--border-active: 2px solid var(--active-color);
		--border-hover: 2px solid #5e5e5e;
		--border-radius: 5px;
		--color: #fff;
	}

	main {
		display: flex;
		flex-direction: column;
		gap: 5px;

		background-color: var(--background);
		border-radius: var(--border-radius);
		border: var(--border);
		color: var(--color);

		margin-top: calc(50vh - var(--search-height) / 2);
		font-size: 100%;
	}

	.search-panel {
		display: flex;
		align-items: center;

		border: 2px solid var(--background);
		border-radius: 5px;

		width: var(--search-width);
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
