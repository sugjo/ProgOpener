<script>
	import { fly } from 'svelte/transition';
	import SearchItem from './searchItem.svelte';

	export let searchResult;
</script>

<div class="search-result" transition:fly={{ duration: 120, y: -15 }}>
	{#each searchResult || [] as file}
		{#if file}
			<SearchItem {file} on:openApp />
		{/if}
	{/each}
</div>

<style>
	.search-result {
		max-height: 35vh;
		overflow: auto;
		width: 100%;
	}
</style>
