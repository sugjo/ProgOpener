<script>
	import { onMount } from 'svelte';
	import search from '../lib/utils/search';
	import SearchBar from '../lib/components/searchBar.svelte';
	import SearchResultBar from '../lib/components/searchResultBar.svelte';

	let files = [];
	let searchStr = '';

	onMount(() => {
		window.api.load();
	});

	window.api.receive('loadData', ({ programsList }) => {
		files = programsList;
	});

	const openSettingsHandler = () => {
		window.api.hide();
		window.api.send('openSettings');
	};

	const openAppHandler = ({ detail: app }) => {
		searchStr = '';
		window.api.hide();
		window.api.exec(app);
	};

	$: searchResult = search(searchStr, files);
</script>

<SearchBar bind:value={searchStr} on:openSettings={openSettingsHandler}>
	<SearchResultBar {searchResult} on:openApp={openAppHandler} />
</SearchBar>
