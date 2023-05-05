import { invoke } from "@tauri-apps/api";
import { listen } from "@tauri-apps/api/event";
import { useLayoutEffect, useState } from "react";


export const usePromptToggle = (): [boolean, () => void] => {
	const [visible, setVisible] = useState(true);

	useLayoutEffect(() => {
		if (!window.__TAURI_IPC__) setVisible(true);

		const unlisten = listen<boolean>("search_toggled", ({ payload }) => {
			setVisible(payload);
		});

		return () => {
			unlisten.then((f: () => void) => f());
		};
	}, []);

	const toggleWindow = () => invoke("toggle_search");

	return [visible, toggleWindow];
};
