import { invoke } from "@tauri-apps/api";
import { listen } from "@tauri-apps/api/event";
import { useEffect, useState } from "react";


export const useWindowToggle = (): [boolean, () => void] => {
	const [visible, setVisible] = useState(true);

	useEffect(() => {
		if (!window.__TAURI_IPC__) setVisible(true);

		const unlisten = listen("search_toggled", ({ payload }) => {
			setVisible(payload as boolean);
		});

		return () => {
			unlisten.then((f) => f());
		};
	}, []);

	const toggleWindow = () => invoke("toggle_search");

	return [visible, toggleWindow];
};