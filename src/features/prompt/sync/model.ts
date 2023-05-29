import { listen } from "@tauri-apps/api/event";
import { useLayoutEffect } from "react";

export const useSync = () => {
	useLayoutEffect(() => {
		if (!window.__TAURI_IPC__) return;

		const updateUnlisten = listen("settings_update", () => {
			window.location.reload();
		});

		return () => {
			updateUnlisten.then((f: () => void) => f());
		};
	}, []);
};
