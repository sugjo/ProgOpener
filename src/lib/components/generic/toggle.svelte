<script>
	import { createEventDispatcher } from 'svelte';

	export let isCheck = false;

	const dispatch = createEventDispatcher();

	const clickHandler = () => {
		if (isCheck) {
			isCheck = false;
			dispatch('uncheck');
		} else {
			isCheck = true;
			dispatch('check');
		}
	};
</script>

<div class="toggle" class:check={isCheck} on:click={clickHandler}>
	<div class="circle" />
</div>

<style>
	.toggle {
		display: flex;
		justify-content: flex-start;
		border: var(--border-hover);
		width: 45px;
		border-radius: 25px;
		user-select: none;
		font-size: 14px;
        padding: 2px;
	}

	.circle {
		width: 15px;
		height: 15px;
		border-radius: 25px;
		transition: 0.1s;
		background-color: var(--color);
	}

	.check .circle {
		background-color: var(--active-color);
	}

	.toggle:hover {
		background-color: var(--background-hover);
	}

	.check {
		justify-content: flex-end;
	}
</style>
