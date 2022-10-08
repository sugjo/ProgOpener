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

<div class="chips" class:check={isCheck} on:click={clickHandler}>
	{text}
</div>

<style>
	.chips {
		border: var(--border-hover);
		padding: 5px 16px;
		border-radius: 25px;
		user-select: none;
		font-size: 14px;
		transition: 0.1s;
	}

	.chips:hover {
		background-color: var(--background-hover);
	}

	.check {
		border: var(--border-active);
	}
</style>
