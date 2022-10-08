<script>
	import { onMount } from 'svelte';
	import SearchBar from '@/components/screens/search/searchBar.svelte';
	import SearchResultBar from '@/components/screens/search/searchResultBar.svelte';
	import search from '../utils/search';

	let files = [];
	let searchStr = '';

	$: searchResult = search(searchStr, files);

	onMount(() => window.api.load());

	window.api.receive('loaded', ({ programsList }) => {
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
</script>

<SearchBar bind:value={searchStr} on:openSettings={openSettingsHandler}>
	<SearchResultBar {searchResult} on:openApp={openAppHandler} />
</SearchBar>
