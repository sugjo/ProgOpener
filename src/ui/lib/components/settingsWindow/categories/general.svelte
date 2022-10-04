<script>
	import { Chips, Dropdown, Toggle } from '../../generic';
	import SettingsBody from '../settingsBody.svelte';
	import i18n, { lang } from '../../../utils/languageSwapper';
	import Layout from '../layout.svelte';
</script>

<Layout title="Общие">
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
</Layout>
