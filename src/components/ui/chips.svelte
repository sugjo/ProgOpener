<script>
	import { createEventDispatcher } from 'svelte';

	export let text;
	export let radio;
	export let isCheck = false;

	const dispatch = createEventDispatcher();

	const clickHandler = () => {
		if (isCheck && !radio) {
			isCheck = false;
			dispatch('uncheck');
		} else {
			isCheck = true;
			dispatch('check');
		}
	};
</script>

<button class:check={isCheck} on:click={clickHandler}>
	{text}
</button>

<style>
	button {
		border: var(--border-hover);
		padding: 5px 16px;
		border-radius: 25px;
		user-select: none;
		font-size: 14px;
		transition: 0.1s;
	}

	button:hover {
		background-color: var(--background-hover);
	}

	button:focus {
		background: var(--background-hover);
		border: 2px solid var(--active-color);
	}

	.check {
		background-color: var(--active-color);
		border-color: var(--active-color);
	}
</style>
