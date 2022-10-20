<script>
	import { onMount } from 'svelte';
	import getSearchData from '../utils/search';
	import Search from '@/components/screens/search/search.svelte';
	import SearchBar from '@/components/ui/search/searchBar.svelte';

	let files = [];
	let searchStr = '';

	$: searchResult = getSearchData(searchStr, files);

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

<Search bind:value={searchStr} on:openSettings={openSettingsHandler}>
	<SearchBar {searchResult} on:openApp={openAppHandler} />
</Search>
