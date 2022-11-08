<script>
	import { createEventDispatcher } from 'svelte';
	import Icon from '../icon.svelte';

	export let file;

	let error = false;

	let loadErrorHandler = (e) => {
		if (e.target.currentSrc == `icons://${iconName}.png`) return (error = true);
		return (error = false);
	};

	$: name = window?.path.parse(file.item).name
	$: iconName = window?.path.parse(file.item).base

	const dispatch = createEventDispatcher();
	const openAppHandler = (file) => dispatch('openApp', `"${file}"`);
</script>

<button on:click|stopPropagation={() => openAppHandler(file.item)}>
	{#if error}
		<Icon name="empty" />
	{:else}
		<img
			src="icons://{iconName}.png"
			alt="{name} icon"
			on:error={(e) => loadErrorHandler(e)}
		/>
	{/if}
	{name}
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
