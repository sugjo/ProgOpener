<script>
	import { Icon, Button } from '../lib/components/generic';
	import General from '../lib/components/settingsWindow/categories/general.svelte';
	import Info from '../lib/components/settingsWindow/categories/info.svelte';
	import Paths from '../lib/components/settingsWindow/categories/paths/paths.svelte';
	import i18n from '../lib/utils/languageSwapper';

	const categories = [
		{
			name: 'Пути',
			icon: 'public://images/folder.svg',
			component: Paths
		},
		{
			name: 'Общие',
			icon: 'public://images/settings.svg',
			component: General
		},
		{
			name: 'Сведения',
			icon: 'public://images/info.svg',
			component: Info
		}
	];

	let currentComponent = Paths;
</script>

<svelte:head>
	<title>{$i18n.t('settings')}</title>
</svelte:head>

<div class="settings">
	<aside>
		{#each categories as { component, icon, name }}
			<div class="aside-item" class:active={currentComponent == component}>
				<Button on:click={() => (currentComponent = component)} --border-radius="0">
					<div class="aside-item-body">
						<Icon src={icon} />
						{name}
					</div>
				</Button>
			</div>
		{/each}
	</aside>
	<div class="category">
		<svelte:component this={currentComponent} />
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

	aside {
		position: sticky;
		overflow-y: auto;
		display: flex;
		flex-direction: column;
		background-color: var(--background-second);
		width: 100px;
		height: 100vh;
		padding: 10px 0;
		left: 0;
		top: 0;
	}

	.aside-item {
		display: flex;
		flex-direction: column;
		position: relative;
	}

	.aside-item.active::after {
		content: '';
		position: absolute;
		height: 100%;
		border-left: 5px var(--active-color) solid;
	}

	.aside-item-body {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 5px;
		margin: 5px;
	}

	.active {
		background-color: var(--background-hover);
	}
</style>
