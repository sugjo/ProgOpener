<script>
	import { Button } from '../generic';

	export let title = '';
	export let helpText = '';
</script>

<header>
	<h2>{title}</h2>
	{#if helpText}
		<Button title="Помощь" icon="../public/images/help.svg" />
	{/if}
</header>

<main>
	<slot />
</main>

<style>
	header {
		position: sticky;
		display: flex;
		justify-content: space-between;
		background-color: var(--background);
		margin: 0 0 20px 0;
		z-index: 100;
		padding: 20px;
		top: 0;
	}

	main {
		width: 100%;
		padding: 0 20px;
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	h2 {
		margin: 0;
	}
</style>
