<script>
	import { fly } from 'svelte/transition';
	import clickOutside from '../../utils/clickOutside';

	let isCheck = false;

	const clickHandler = () => {
		isCheck = !isCheck;
	};
</script>

<div class="dropdown-btn" class:check={isCheck} on:click|stopPropagation={clickHandler}>
	{#if isCheck}
		<img src="public://images/expand_less.svg" alt="" />
	{:else}
		<img src="public://images/expand_more.svg" alt="" />
	{/if}
</div>
{#if isCheck}
	<div
		transition:fly={{ duration: 120, y: -5 }}
		class="dropdown"
		use:clickOutside={() => (isCheck = false)}
	>
		<slot />
	</div>
{/if}

<style>
	.dropdown-btn {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		width: 35px;
		height: 35px;
		border-radius: var(--border-radius);
		user-select: none;
		font-size: 20px;
	}

	.dropdown-btn:hover {
		background-color: var(--background-hover);
	}

	.dropdown {
		position: absolute;
		display: flex;
		gap: 5px;
		z-index: 10;
		left: 0;
		width: 100%;
		background-color: var(--background-active);
		padding: 15px;
	}

	img {
		height: 30px;
		width: 30px;
	}
</style>
