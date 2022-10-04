<script>
	import SettingsBody from '../settingsBody.svelte';
	import i18n from '../../../utils/languageSwapper';
	import Layout from '../layout.svelte';
</script>

<Layout title={$i18n.t('about')}>
	<SettingsBody
		src="../public/images/ProgOpener.svg"
		title="ProgOpener"
		body="{$i18n.t('version')}: {window.api.version}"
	/>
</Layout>
