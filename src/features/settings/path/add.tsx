import { Button } from "@mantine/core";

import { settingsModel } from "@/entities/settings";

export const Add = () => {
	const addPath = settingsModel.useSettingsPathsStore().addPath;

	return <Button onClick={addPath} w="100%">Добавить</Button>;
};
