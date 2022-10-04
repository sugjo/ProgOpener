<script>
	import { Button, Icon } from '../../../generic';
	import settingsStore from '../../../../stores/settingsStore';
	import Layout from '../../layout.svelte';

	const addPathHandler = () => {
		window.api.invoke('dialog: openDirectorySelect').then((newPath) => {
			if (!newPath) return
			settingsStore.update(
				(settings) => (settings = { ...settings, paths: [...settings.paths, ...newPath] })
			);
		});
	};

	const removePathHandler = (pathToRemove) => {
		settingsStore.update(
			(settings) =>
				(settings = { ...settings, paths: settings.paths.filter((path) => path != pathToRemove) })
		);
	};

	const changePathHandler = (pathToUpdate) => {
		window.api.invoke('dialog: openDirectorySelect').then((newPath) => {
			if (!newPath) return
			settingsStore.update((settings) => {
				let updatedSettings = {
					...settings,
					paths: settings.paths.filter((path) => path != pathToUpdate)
				};
				return (settings = { ...settings, paths: [...(updatedSettings?.paths || []), ...newPath] });
			});
		});
	};

	$: paths = $settingsStore.paths.map((path, i) => {
		return { path };
	});
</script>

<Layout title="Пути поиска">
	<div class="add-path">
		Нужно больше папок?
		<Button on:click={addPathHandler}>
			<span>Добавьте</span>
		</Button>
	</div>
	<div class="paths">
		<div class="left-panel">
			{#each paths as { path, active }}
				<div class="path">
					<Button icon="../public/images/power.svg" />
					<div class="path-body">
						<div class="path-change">
							<Icon src="../public/images/folder.svg" />
							<p title={path}>{path}</p>
							<Button on:click={() => changePathHandler(path)} icon="../public/images/edit.svg" />
						</div>
					</div>
					<Button
						on:click={() => removePathHandler(path)}
						title="Удалить"
						icon="../public/images/delete.svg"
					/>
				</div>
			{/each}
		</div>
	</div>
</Layout>

<style>
	.add-path span {
		color: var(--active-color);
		font-weight: 600;
	}

	.path {
		position: relative;
		display: grid;
		grid-template-columns: min-content 1fr min-content;
		align-items: center;
		border: 2px solid transparent;
		border-radius: var(--border-radius);
		min-width: 0;
		gap: 5px;
	}

	.path-body {
		display: flex;
		flex-direction: column;
	}

	.path-body p {
		margin: 0;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.path-change {
		display: grid;
		grid-template-columns: min-content 1fr min-content;
		align-items: center;
		max-width: 100%;
	}

	.left-panel {
		display: flex;
		flex-direction: column;
		padding: 5px;
		gap: 5px;
		width: 100%;
		height: 100%;
	}

	/* .paths-dropdown-body {
		display: flex;
		flex-direction: column;
		width: 100%;
		gap: 5px;
	}

	.paths-dropdown-title {
		margin-left: 15px;
	}

	.more-item {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.more-item-title {
		display: flex;
		align-items: center;
	} */
</style>
