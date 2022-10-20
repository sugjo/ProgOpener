<script>
	import { i18n } from '@/utils/languageSwapper';
	import { createEventDispatcher } from 'svelte';
	import Button from '../button.svelte';
	import Icon from '../icon.svelte';

	export let categories;
	export let currentCategory;

	const dispatch = createEventDispatcher();
</script>

<aside>
	<nav>
		<ul>
			{#each categories as { component, icon, title }}
				<li class:active={currentCategory == component}>
					<Button on:click={() => dispatch('change', component)} --border-radius="0">
						<div class="aside-item-body">
							<Icon name={icon} />
							<span>{$i18n.t(title)}</span>
						</div>
					</Button>
				</li>
			{/each}
		</ul>
	</nav>
</aside>

<style>
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

	ul {
		all: unset;
	}

	li {
		display: flex;
		flex-direction: column;
		position: relative;
		list-style: none;
	}

	li.active::after {
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

	.aside-item-body > span:first-letter {
		text-transform: uppercase;
	}

	.active {
		background-color: var(--background-hover);
	}
</style>
