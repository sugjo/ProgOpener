<script>
	import SettingsLayout from '@/components/layout/settingsLayout.svelte';
	import Button from '@/components/ui/button.svelte';
	import PathCard from '@/components/ui/settings/pathCard.svelte';
	import {
		addSettingItem,
		changeSettingItem,
		removeSettingItem
	} from '@/services/settings.service';
	import settingsStore from '@/stores/settingsStore';

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

<SettingsLayout title="Пути поиска">
	<div class="add-path">
		Нужно больше путей?
		<Button on:click={addPathHandler}>
			<span>Добавьте</span>
		</Button>
	</div>
	<div class="paths">
		{#each $settingsStore.paths || [] as { path, disabled }}
			<PathCard
				{path}
				{disabled}
				on:toggle={() => togglePathHandler(path, disabled)}
				on:change={() => changePathHandler(path)}
				on:delete={() => removePathHandler(path)}
			/>
		{:else}
			Пусто
		{/each}
	</div>
</SettingsLayout>

<style>
	.add-path span {
		color: var(--active-color);
		font-weight: 600;
	}

	.paths {
		display: flex;
		flex-direction: column;
		gap: 5px;
		width: 100%;
		height: 100%;
	}
</style>
