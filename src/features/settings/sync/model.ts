import { useLayoutEffect } from "react";

import { settingsModel } from "@/entities/settings";
import { tauriStore } from "@/shared/lib/store";

export const useSync = (sync: boolean) => {
	const settingsInit = settingsModel.useStore().settingsInit;

	useLayoutEffect(() => {
		settingsInit();

		const unlistenPathsSync = tauriStore.onChange(() => {
			sync && settingsInit();
		});

		return () => {
			unlistenPathsSync.then((f: () => void) => f());
		};
	}, [sync, settingsInit]);
};
