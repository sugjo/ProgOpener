import { open } from "@tauri-apps/api/dialog";

import { usePaths } from "@/shared/hooks/usePaths";

export const useSettingsPaths = () => {
	const {paths, addPath, removePath, changePath} = usePaths();

	const addPathHandler = async () => {
		const path = await open({
			directory: true,
			multiple: false
		});

		if (path) {
			addPath(path as string);
		}
	};

	const changePathHandler = (id: string) => async () => {
		const path = await open({
			directory: true,
			multiple: false,
			defaultPath: paths.pathsMap[id].path
		}) as string;

		if (path) {
			changePath(id, {path});
		}
	};

	const togglePathHandler = (id: string) => () => {
		if (paths.pathsMap[id].status === "error") return;
		if (paths.pathsMap[id].status === "on") changePath(id, {status: "off"});
		if (paths.pathsMap[id].status === "off") changePath(id, {status: "on"});
	};

	const removePathHandler = (id: string) => () => {
		removePath(id);
	};

	return {addPathHandler, changePathHandler, togglePathHandler, removePathHandler};
};