<script>
	import { fly } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';
	import onImageError from '../../utils/onImageError';

	export let searchResult;

	const dispatch = createEventDispatcher();
	const openAppHandler = (name, path) => dispatch('openApp', `"${path}\\${name}"`);

	$: iconName = (name) => window.path.basename(name).replace(window.path.extname(name), "");
</script>

<div class="search-result" transition:fly={{ duration: 120, y: -15 }}>
	{#each searchResult as { name, path }}
		<button on:click|stopPropagation={() => openAppHandler(name, path)}>
			<img src="atom://{name}.png" use:onImageError alt="{iconName(name)} icon" width="32" height="32" />
			{iconName(name)}
		</button>
	{/each}
</div>

<style>
	.search-result {
		max-height: 35vh;
		overflow: auto;
		width: 100%;
	}

	.search-result button {
		position: relative;

		display: flex;
		align-items: center;
		gap: 10px;

		width: 100%;
		transition: 0.1s;
		padding: 5px 10px;
	}

	.search-result img {
		width: 32px;
		height: 32px;
	}

	.search-result button:hover,
	.search-result button:focus-visible {
		background-color: var(--background-active);
	}

	.search-result button:focus-visible::before {
		content: '';
		position: absolute;
		left: 0;
		height: 100%;
		width: 5px;
		background: var(--active-color);
	}
</style>
