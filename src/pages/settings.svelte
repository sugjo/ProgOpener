<script>
	import SettingsMenu from '@/components/ui/settings/settingsMenu.svelte';
	import { categories, defaultCategory } from '@/configs/settings_categories';
	import i18n from '../utils/languageSwapper';

	let currentCategory = defaultCategory;
	$: categoryName = categories.find(({ component }) => currentCategory == component).name;

	const changeCategoryHandler = ({ detail: newCategory }) => (currentCategory = newCategory);
</script>

<svelte:head>
	<title>
		{$i18n.t('settings')}: {categoryName}
	</title>
</svelte:head>

<div class="settings">
	<SettingsMenu {categories} {currentCategory} on:change={changeCategoryHandler} />

	<div class="category">
		<svelte:component this={currentCategory} />
	</div>
</div>

<style>
	.settings {
		display: grid;
		grid-template-columns: min-content 1fr;
		height: 100%;
		background-color: var(--background);
		color: #fff;
		user-select: none;
	}
</style>
