<script>
	import SettingsLayout from '@/components/layout/settingsLayout.svelte';
	import SettingsCard from '@/components/ui/settings/settingsCard.svelte';
	import i18n from '@/utils/languageSwapper';
</script>

<SettingsLayout title={$i18n.t('about')}>
	<SettingsCard
		icon="ProgOpener"
		title="ProgOpener"
		body="{$i18n.t('version')}: {window.api.version}"
	/>
</SettingsLayout>
