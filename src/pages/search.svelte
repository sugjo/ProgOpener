<script>
	import { onMount } from 'svelte';
	import Fuse from 'fuse.js';
	import Search from '@/components/screens/search/search.svelte';
	import SearchBar from '@/components/ui/search/searchBar.svelte';
	import translitReverse from '@/utils/translitReverse';

	let files;
	let searchStr = '';

	Fuse.config.threshold = 0.3;
	Fuse.config.distance = 100;
	Fuse.config.shouldSort = true

	$: searchResult = [files?.search(searchStr), files?.search(translitReverse(searchStr))].flat(1);

	onMount(() => window.api.load());

	window.api.receive('loaded', ({ programsList }) => {
		programsList = programsList.map((program) => `${program.path}\\${program.name}`);
		files = new Fuse(programsList);
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
