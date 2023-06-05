import { emit } from "@tauri-apps/api/event";
import { useLayoutEffect } from "react";

import { startAppListening } from "@/shared/lib/listener-middleware";

export const useSync = () => {
	useLayoutEffect(() => {
		const unlisten = startAppListening({
			predicate: (action, currentState, previousState) => {
				const isChangedState = currentState !== previousState;

				if (!String(action.type).includes("settings")) return false;
				if (isChangedState) return true;

				return false;
			},
			effect: () => emit("settings_update")
		});

		return () => unlisten();
	}, []);
};
