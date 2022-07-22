<script>
	import { onMount } from 'svelte';
	import search from '$lib/components/search.js';
	import { emulateKey } from 'emulate-key-in-browser';
	import { fly } from 'svelte/transition';
	import { settings } from '../store/settings';
	import { browser } from '$app/env';
	import clickOutside from '$lib/utils/clickOutside';

	export const prerender = true;

	let inputElement;
	let isShowing = false;
	let searchStr = null;
	let files = [];
	let searchResult = [];

	onMount(() => {
		window.api.load();

		window.api.receive('initialData', (initialData) => {
			files = initialData.programmsList;
		});

		window.api.receive('hide', () => {
			isShowing = false;
		});

		window.api.receive('show', () => {
			searchStr = '';
			isShowing = true;
			inputElement?.focus();
		});
	});

	const keypressHandler = (e) => {
		let wrongKey = ['Tab', 'Space', 'Enter', 'Shift'];
		for (const key of wrongKey) if (e.key == key) return;

		if (e.key == 'ArrowUp') {
			e.preventDefault();
			return emulateKey.shiftTab();
		}

		if (e.key == 'ArrowDown') {
			e.preventDefault();
			return emulateKey.tab();
		}

		inputElement?.focus();
	};

	const openHandler = (name, path) => {
		browser && window.api.hide();
		browser && window.api.exec(`"${path}\\${name}"`);
	};

	$: searchResult = search(searchStr, files);
</script>

<main on:click|stopPropagation use:clickOutside={window.api.hide} class={isShowing ? '' : 'loading'}>
	<input bind:this={inputElement} type="text" bind:value={searchStr} />
	<span
		class="material-symbols-outlined btn"
		on:click={() => browser && window.api.send('openSettings')}
	>
		more_horiz
	</span>
	{#if searchStr && searchResult.length}
		<div class="search-result" transition:fly={{ duration: 120, y: -15 }}>
			{#each searchResult as { name, path }}
				<button on:click|stopPropagation={() => openHandler(name, path)}>
					<img src="./icons/{name}.png" onError="this.src='./images/empty.png'" alt="" />
					{name.substr(0, name.lastIndexOf('.')) || name}
				</button>
			{/each}
		</div>
	{/if}
</main>

<svelte:body on:keydown={keypressHandler} />

<style>
	main {
		width: 600px;
		height: 50px;
		border: 2px solid #5e5e5e;
		background-color: #1a1b1f;
		border-radius: 5px;
		position: relative;
		display: flex;
		align-items: center;
		font-size: 100%;
		padding: 0 10px;
		color: #fff;
	}

	input {
		color: inherit;
		width: 100%;
		height: 100%;
		border: 0;
	}

	input:focus-visible {
		outline: none;
	}

	button {
		width: 100%;
		border: 2px solid #00000000;
		border-radius: 5px;
		color: #fff;
		display: flex;
		align-items: center;
		gap: 10px;
		transition: 0.1s;
	}

	button:focus-visible {
		outline: none;
		border: 2px solid #5e5e5e;
		background-color: #2a2b30;
	}

	button:hover {
		border: 2px solid #797979;
		background-color: #3a3b3f;
	}

	.btn {
		cursor: pointer;
		font-size: 30px;
		margin-left: 10px;
	}

	.search-result {
		position: absolute;
		background-color: #1a1b1f;
		border-radius: 5px;
		overflow: auto;
		max-height: 400px;
		top: 120%;
		left: 0;
		width: 100%;
	}

	.loading {
		display: none;
	}
</style>
