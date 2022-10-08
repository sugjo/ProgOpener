<script>
	import i18n, { lang } from '@/utils/languageSwapper';
	import Dropdown from '@/components/ui/dropdown.svelte';
	import Chips from '@/components/ui/chips.svelte';
	import Toggle from '@/components/ui/toggle.svelte';
	import SettingsLayout from '@/components/layout/settingsLayout.svelte';
	import SettingsCard from '@/components/ui/settings/settingsCard.svelte';
</script>

<SettingsLayout title="Общие">
	<SettingsCard src="public://images/language.svg" title={$i18n.t('lang')}>
		<Dropdown>
			<Chips radio isCheck={$lang == 'ru'} on:check={() => ($lang = 'ru')} text="Русский" />
			<Chips radio isCheck={$lang == 'en'} on:check={() => ($lang = 'en')} text="English" />
		</Dropdown>
	</SettingsCard>

	<SettingsCard src="public://images/startup.svg" title={$i18n.t('add-to-startup')}>
		{#await window.startup.isEnabled}
			<Toggle />
		{:then value}
			<Toggle
				isCheck={value}
				on:check={window.startup.enable}
				on:uncheck={window.startup.disable}
			/>
		{/await}
	</SettingsCard>
</SettingsLayout>
