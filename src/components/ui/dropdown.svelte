<script>
	import { fly } from 'svelte/transition';
	import clickOutside from '../../utils/clickOutside';
	import Button from './button.svelte';

	let isCheck = false;

	const clickHandler = () => {
		isCheck = !isCheck;
	};
</script>

<Button icon={isCheck ? 'expand_less' : 'expand_more'} on:click={clickHandler} />

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
</style>
