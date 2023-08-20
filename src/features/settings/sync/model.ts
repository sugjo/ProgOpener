import { useLayoutEffect } from "react";

import { settingsModel } from "@/entities/settings";
import { tauriStore } from "@/shared/lib/store";

export const useSync = (sync: boolean) => {

	const pathInit = settingsModel.useSettingsPathsStore().initPath;

	useLayoutEffect(() => {

		const unlistenPathsSync = tauriStore.onChange(() => sync && pathInit());

		pathInit();

		return () => {
			unlistenPathsSync.then((f: () => void) => f());
		};
	}, [sync, pathInit]);
};
