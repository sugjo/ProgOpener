<script>
	import SettingsLayout from '@/components/layout/settingsLayout.svelte';
	import SettingsCard from '@/components/ui/settings/settingsCard.svelte';
	import { i18n } from '@/utils/languageSwapper';
</script>

<SettingsLayout title={$i18n.t('info.title')}>
	<SettingsCard
		icon="icon"
		title={$i18n.t('info.program-name')}
		body="{$i18n.t('info.program-version')}: {window.api.version}"
	/>
</SettingsLayout>
