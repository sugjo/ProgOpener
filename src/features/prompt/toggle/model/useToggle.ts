import { listen } from "@tauri-apps/api/event";
import { getCurrent } from "@tauri-apps/api/window";
import { useLayoutEffect, useState } from "react";

import { setToggle } from "./setToggle";

export const useToggle = () => {
	const [visible, setVisible] = useState(true);

	useLayoutEffect(() => {
		if (!window.__TAURI_IPC__) return setVisible(true);

		const toggleUnlisten = listen<boolean>("prompt_toggled", ({ payload }) => {
			setVisible(payload);
		});

		const updateUnlisten = listen("settings_update", () => {
			window.location.reload();
		});

		const blurUnlisten = getCurrent().onFocusChanged(({ payload }) => {
			if (payload === false) {
				setToggle(payload);
				setVisible(false);
			}
		});

		return () => {
			toggleUnlisten.then((f: () => void) => f());
			blurUnlisten.then((f: () => void) => f());
			updateUnlisten.then((f: () => void) => f());
		};
	}, []);

	return [ visible ];
};
