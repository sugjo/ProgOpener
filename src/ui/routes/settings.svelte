<script>
	import { Chips, Dropdown, Toggle } from "../lib/components/generic";
	import PathEditor from '../lib/components/settingsWindow/pathEditor';
	import SettingsBody from '../lib/components/settingsWindow/settingsBody.svelte';
	import i18n from '../lib/utils/languageSwapper';
	import { lang } from '../lib/utils/languageSwapper';
</script>

<svelte:head>
	<title>{$i18n.t('settings')}</title>
</svelte:head>

<main>
	<h1>{$i18n.t('settings')}</h1>

	<h2>Настройки приложения</h2>
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
		text-align: center;
	}
	h2 {
		margin: 10px 0 0 0;
		font-size: 16px;
	}
</style>
