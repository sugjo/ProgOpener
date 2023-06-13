import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import { tauriStore } from "@/shared/lib/store";

import { createPathSlice, Paths, PathsSlice } from "./pathSlice";


type SettingsActions = {
	settingsInit: () => void;
	settingsSave: () => void;
};

type SettingsStore = PathsSlice & SettingsActions

type Settings = {
	pathsStore: Paths;
};

export const useStore = create<SettingsStore>()(
	immer((...args) => ({
		...createPathSlice(...args),

		settingsInit: async () => {
			const [, get] = args;

			const settings = await tauriStore.get<Settings>("settings");
			if (!settings) return;

			get()._loadPaths(settings.pathsStore);
		},

		settingsSave: () => {
			const [, get] = args;
			get()._savePaths();
		},
	}))
);
