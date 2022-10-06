<script>
	import { Button, Icon } from '../../../generic';
	import settingsStore from '../../../../stores/settingsStore';
	import Layout from '../../layout.svelte';

	const addPathHandler = () => {
		window.api.invoke('dialog: openDirectorySelect').then((newPath) => {
			if (!newPath) return;
			settingsStore.update(
				(settings) =>
					(settings = {
						...settings,
						paths: [...settings.paths, { path: newPath[0], active: true }]
					})
			);
		});
	};

	const removePathHandler = (pathToRemove) => {
		settingsStore.update(
			(settings) =>
				(settings = {
					...settings,
					paths: settings.paths.filter(({ path }) => path != pathToRemove)
				})
		);
	};

	const changePathHandler = (pathToUpdate) => {
		window.api.invoke('dialog: openDirectorySelect').then((newPath) => {
			if (!newPath) return;
			settingsStore.update((settings) => {
				let updatedSettings = {
					...settings,
					paths: settings.paths.filter(({ path }) => path != pathToUpdate)
				};
				return (settings = {
					...settings,
					paths: [...(updatedSettings?.paths || []), { path: newPath[0], active: true }]
				});
			});
		});
	};

	const togglePathUse = ({ path: pathToToggle, active }) => {
		settingsStore.update((settings) => {
			let updatedSettings = {
				...settings,
				paths: settings.paths.filter(({ path }) => path != pathToToggle)
			};
			return (settings = {
				...settings,
				paths: [...(updatedSettings?.paths || []), { path: pathToToggle, active: !active }]
			});
		});
	};
</script>

<Layout title="Пути поиска">
	<div class="add-path">
		Нужно больше путей?
		<Button on:click={addPathHandler}>
			<span>Добавьте</span>
		</Button>
	</div>
	<div class="paths">
		<div class="left-panel">
			{#each $settingsStore.paths || [] as currentPath}
				{@const { path, active } = currentPath}
				{@const disabled = !active}

				<div class="path" class:disabled>
					<Button on:click={() => togglePathUse(currentPath)} icon="/images/power.svg" />
					<div class="path-body">
						<div class="path-change">
							<Icon src="/images/folder.svg" />
							<p title={path}>{path}</p>
							<Button
								disabled={!active}
								on:click={() => changePathHandler(path)}
								icon="/images/edit.svg"
							/>
						</div>
					</div>
					<Button
						disabled={!active}
						on:click={() => removePathHandler(path)}
						title="Удалить"
						icon="/images/delete.svg"
					/>
				</div>
				{:else}
				Пусто
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
		gap: 5px;
		width: 100%;
		height: 100%;
	}

	.disabled {
		filter: brightness(.6);
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
