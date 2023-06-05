import { Button } from "@mantine/core";

import { settingsModel } from "@/entities/settings";
import { useActionCreators, useTypedSelector } from "@/shared/lib/store";

export const PathsTab = () => {
	const {	pathsIds, pathsMap } = useTypedSelector((store) => store.settings.path);
	const actions = useActionCreators(settingsModel.actions.path);

	const changeHandler = (id: string) => () => actions.updateThunk(id);
	const deleteHandler = (id: string) => () => actions.delete(id);
	const addHandler = () => actions.addThunk();
	const toggleHandler = (id: string) => () => actions.toggle(id);

	const pathsList = pathsIds.map((id) => {
		const status = pathsMap[id].status;
		const isActive = pathsMap[id].status === "on";

		return (
			<li key={id}>
				<button disabled={status === "error"} onClick={toggleHandler(id)}>
					{isActive? "✅" : "☑️"}
				</button>
				{pathsMap[id].path}
				<button onClick={deleteHandler(id)}>delete</button>
				<button onClick={changeHandler(id)}>change</button>
			</li>
		);
	});

	return (
		<>
			<Button onClick={addHandler} w="100%">Добавить</Button>

			<ul>{pathsList}</ul>
		</>
	);
};
