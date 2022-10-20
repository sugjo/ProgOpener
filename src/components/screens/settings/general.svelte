<script>
	import { lang, i18n } from '@/utils/languageSwapper';
	import Dropdown from '@/components/ui/dropdown.svelte';
	import Chips from '@/components/ui/chips.svelte';
	import Toggle from '@/components/ui/toggle.svelte';
	import SettingsLayout from '@/components/layout/settingsLayout.svelte';
	import SettingsCard from '@/components/ui/settings/settingsCard.svelte';
</script>

<SettingsLayout title={$i18n.t("general.title")}>
	<SettingsCard icon="language" title={$i18n.t('general.language')}>
		<Dropdown>
			<Chips radio isCheck={$lang == 'ru'} on:check={() => ($lang = 'ru')} text="Русский" />
			<Chips radio isCheck={$lang == 'en'} on:check={() => ($lang = 'en')} text="English" />
		</Dropdown>
	</SettingsCard>

	<SettingsCard icon="startup" title={$i18n.t('general.add-to-startup')}>
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
