<script>
	import Chips from '../lib/components/chips.svelte';
	import Dropdown from '../lib/components/dropdown.svelte';
	import SettingsBody from '../lib/components/settingsBody.svelte';
	import Toggle from '../lib/components/toggle.svelte';
	import i18n from '../lib/i18n';
	import { lang } from '../lib/utils/langSwap';

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

	lang.subscribe((value) => {
		console.log(value);
	});
</script>

<main>
	<h1>{$i18n.t('settings')}</h1>
	<SettingsBody src="../public/images/language.svg" title={$i18n.t('lang')}>
		<Dropdown>
			<Chips radio isCheck={$lang == 'ru'} on:check={() => ($lang = 'ru')} text="Русский" />
			<Chips radio isCheck={$lang == 'en'} on:check={() => ($lang = 'en')} text="English" />
		</Dropdown>
	</SettingsBody>

	<SettingsBody src="../public/images/startup.svg" title="Автозагрузка">
		<Toggle />
	</SettingsBody>

	<h2>О приложении</h2>
	<SettingsBody
		src="../public/images/ProgOpener.svg"
		title="ProgOpener"
		body="Версия {window.api.version} | x64 | ALPHA"
	/>

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
