import { Button } from "@mantine/core";

import { settingsModel } from "@/entities/settings";
import { useActionCreators } from "@/shared/lib/store";

export const Add = () => {
	const actions = useActionCreators(settingsModel.actions.path);
	const addHandler = () => actions.addThunk();

	return <Button onClick={addHandler} w="100%">Добавить</Button>;
};
