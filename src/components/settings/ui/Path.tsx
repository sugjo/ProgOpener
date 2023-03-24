import React from "react";

import { usePaths } from "@/shared/hooks/usePaths";

import { useSettingsPaths } from "../hooks/useSettingsPaths";

const Path = () => {
	const {paths} = usePaths();
	const {addPathHandler, changePathHandler, removePathHandler, togglePathHandler} = useSettingsPaths();

	const pathsList = paths.pathsIds.map((id) => {
		const status = paths.pathsMap[id].status;

		return (
			<li key={id}>
				<button disabled={status === "error"} onClick={togglePathHandler(id)}>
					{status === "on" && "✅"}
					{status === "off" && "☑️"}
					{status === "error" && "⚠️"}
				</button>
				{paths.pathsMap[id].path}
				<button onClick={removePathHandler(id)}>delete</button>
				<button onClick={changePathHandler(id)}>change</button>
			</li>
		);
	});

	return (
		<>
			<button onClick={addPathHandler}>Add path</button>
			<ul>{pathsList}</ul>
		</>
	);
};

export default Path;