<script>
	const getSettingsHandler = async () => {
		console.log(await window.api.getSettings());
	};

	const setSettingsHandler = async () => {
		window.api.setSettings({ paths: ['D:\\Links'] });
	};

	const removeSettingsHandler = async () => {
		window.api.removeSettings();
	};

	const clearSettingsHandler = async () => {
		window.api.clearSettings();
	};
</script>

<main>
	<button on:click={getSettingsHandler}>Получить настройки</button>
	<button on:click={setSettingsHandler}>Сохранить настройки</button>
	<button on:click={removeSettingsHandler}>Удалить настройку</button>
	<button on:click={clearSettingsHandler}>Сброс настроек</button>
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		gap: 10px;
		width: 100%;
		height: 100%;
	}
</style>
