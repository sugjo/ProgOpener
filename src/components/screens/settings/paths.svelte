<script>
	import SettingsLayout from '@/components/layout/settingsLayout.svelte';
	import Button from '@/components/ui/button.svelte';
	import PathItem from '@/components/ui/settings/pathItem.svelte';
	import {
		addSettingItem,
		changeSettingItem,
		removeSettingItem
	} from '@/services/settings.service';
	import settingsStore from '@/stores/settingsStore';
	import { i18n } from '@/utils/languageSwapper';

	const addPathHandler = () => {
		window.api.invoke('dialog: openDirectorySelect').then((newPath) => {
			if (!newPath) return;
			addSettingItem('paths', { path: newPath[0], disabled: false });
		});
	};

	const removePathHandler = (pathToRemove) => {
		removeSettingItem('paths', ({ path }) => pathToRemove != path);
	};

	const togglePathHandler = (pathToToggle, status) => {
		changeSettingItem('paths', ({ path }) => pathToToggle == path, {
			path: pathToToggle,
			disabled: !status
		});
	};

	const changePathHandler = (pathToChange) => {
		window.api.invoke('dialog: openDirectorySelect').then((newPath) => {
			if (!newPath) return;
			changeSettingItem('paths', ({ path }) => pathToChange == path, {
				path: newPath[0],
				disabled: false
			});
		});
	};
</script>

<SettingsLayout title={$i18n.t('paths.title')}>
	<div class="add-path">
		{$i18n.t('paths.add-paths-title')}
		<Button on:click={addPathHandler}>{$i18n.t('paths.add')}</Button>
	</div>
	<div class="paths">
		{#each $settingsStore.paths || [] as { path, disabled }}
			<PathItem
				{path}
				{disabled}
				on:toggle={() => togglePathHandler(path, disabled)}
				on:change={() => changePathHandler(path)}
				on:delete={() => removePathHandler(path)}
			/>
		{:else}
			<small>{$i18n.t('paths.empty')}</small>
		{/each}
	</div>
</SettingsLayout>

<style>
	.add-path {
		--color: var(--active-color);
	}

	.paths {
		display: flex;
		flex-direction: column;
		gap: 5px;
		width: 100%;
		height: 100%;
	}

	.paths::first-letter {
		text-transform: uppercase;
	}
</style>
