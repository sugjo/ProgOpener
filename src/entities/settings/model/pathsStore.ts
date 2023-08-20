import { open } from "@tauri-apps/api/dialog";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import { tauriStore } from "@/shared/lib/store";

type Path = {
	path: string;
	isActive: boolean;
};

type Actions = {
	savePath: () => void;
	initPath: () => void;

	addPath: () => void;
	updatePath: (id: string) => void;
	removePath: (id: string) => void;
	togglePath: (id: string, value: boolean) => void;
}

type Store = {
	pathsMap: Record<string, Path>;
	pathsIds: string[];
}

export type Paths = Actions & Store

export const usePathsStore = create(
	immer<Paths>((set, get) => ({
		pathsMap: {},
		pathsIds: [],

		initPath: async () => {
			const newPaths = await tauriStore.get<Store>("settings-paths");

			if (!newPaths) return;

			set((state) => {
				state.pathsIds = newPaths.pathsIds;
				state.pathsMap = newPaths.pathsMap;
			});
		},

		savePath: () => {
			tauriStore.set("settings-paths", {
				pathsMap: get().pathsMap,
				pathsIds: get().pathsIds
			});
			tauriStore.save();
		},

		addPath: async () => {
			const path = await open({
				directory: true,
				multiple: false
			}) as string | null;

			if (!path) return;

			const id = crypto.randomUUID();

			set((state) => {
				state.pathsIds.push(id);
				state.pathsMap[id] = { path, isActive: true };
			});

		},

		updatePath: async (id) => {
			const path = await open({
				directory: true,
				multiple: false,
				defaultPath: get().pathsMap[id].path
			}) as string | null;

			if (!path) return;

			set((state) => {
				state.pathsMap[id].path = path;
			});
		},

		removePath: (id) => {
			set((state) => {
				delete state.pathsMap[id];
				state.pathsIds = state.pathsIds.filter((pathId) => pathId !== id);
			});
		},

		togglePath: (id, value) => {
			set((state) => {
				if (value) {
					state.pathsMap[id].isActive = value;
				} else {
					state.pathsMap[id].isActive = !state.pathsMap[id].isActive;
				}
			});
		}
	}))
);
