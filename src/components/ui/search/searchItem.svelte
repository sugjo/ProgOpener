<script>
	import { createEventDispatcher } from 'svelte';
	import Icon from '../icon.svelte';

	export let name;
	export let path;

	let error = false;

	let loadErrorHandler = (e, name) => {
		if (e.target.currentSrc == `icons://${name}.png`) return (error = true);
		return (error = false);
	};

	$: iconName = (name) => window?.path.basename(name).replace(window?.path.extname(name), '');

	const dispatch = createEventDispatcher();
	const openAppHandler = (name, path) => dispatch('openApp', `"${path}\\${name}"`);
</script>

<button on:click|stopPropagation={() => openAppHandler(name, path)}>
	{#if error}
		<Icon name="empty" />
	{:else}
		<img
			src="icons://{name}.png"
			alt="{iconName(name)} icon"
			on:error={(e) => loadErrorHandler(e, name)}
		/>
	{/if}
	{iconName(name)}
</button>

<style>
	button {
		position: relative;

		display: flex;
		align-items: center;
		gap: 10px;

		width: 100%;
		transition: 0.1s;
		padding: 5px 10px;
	}

	img {
		width: 32px;
		height: 32px;
	}

	button:hover,
	button:focus-visible {
		background-color: var(--background-active);
	}

	button:focus-visible::before {
		content: '';
		position: absolute;
		left: 0;
		height: 100%;
		width: 5px;
		background: var(--active-color);
	}
</style>
