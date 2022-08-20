<script>
	import Chips from '../lib/components/chips.svelte';
	import Dropdown from '../lib/components/dropdown.svelte';
	import SettingsBody from '../lib/components/settingsBody.svelte';
	import Toggle from '../lib/components/toggle.svelte';
	import i18n from '../lib/utils/languageSwapper';
	import { lang } from '../lib/utils/languageSwapper';

	const getSettingsHandler = async () => {
		console.log(await window.api.getSettings('settings'));
	};

	const setSettingsHandler = async () => {
		window.api.setSettings('settings', { paths: ['E:\\Links'] });
	};

	const removeSettingsHandler = async () => {
		window.api.removeSettings();
	};

	const clearSettingsHandler = async () => {
		window.api.clearSettings();
	};
</script>

<svelte:head>
	<title>{$i18n.t('settings')}</title>
</svelte:head>

<main>
	<h1>{$i18n.t('settings')}</h1>
	<SettingsBody src="../public/images/language.svg" title={$i18n.t('lang')}>
		<Dropdown>
			<Chips radio isCheck={$lang == 'ru'} on:check={() => ($lang = 'ru')} text="Русский" />
			<Chips radio isCheck={$lang == 'en'} on:check={() => ($lang = 'en')} text="English" />
		</Dropdown>
	</SettingsBody>

	<SettingsBody src="../public/images/startup.svg" title={$i18n.t('add-to-startup')}>
		{#await window.startup.isEnabled}
			<Toggle />
		{:then value}
			<Toggle
				isCheck={value}
				on:check={window.startup.enable}
				on:uncheck={window.startup.disable}
			/>
		{/await}
	</SettingsBody>

	<h2>{$i18n.t('about')}</h2>
	<SettingsBody
		src="../public/images/ProgOpener.svg"
		title="ProgOpener"
		body="{$i18n.t('version')}: {window.api.version}"
	/>

	<!-- to debug -->

	<button on:click={getSettingsHandler}>Получить настройки</button>
	<button on:click={setSettingsHandler}>Сохранить настройки</button>
	<button on:click={removeSettingsHandler}>Удалить настройку</button>
	<button on:click={clearSettingsHandler}>Сброс настроек</button>
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		gap: 8px;
		height: 100%;
		background-color: var(--background);
		padding: 25px;
		color: #fff;
		user-select: none;
	}

	h1,
	h2 {
		font-weight: normal;
	}
	h1 {
		font-size: 20px;
	}
	h2 {
		margin: 10px 0 0 0;
		font-size: 16px;
	}
</style>
