import { open } from "@tauri-apps/api/dialog";

import { ImmerStateCreator, tauriStore } from "@/shared/lib/store";

type Path = {
	path: string;
	isActive: boolean;
};

export type Paths = {
	pathsMap: Record<string, Path>;
	pathsIds: string[];
}

type PathsStore = {
	paths: Paths
}

type PathsActions = {
	addPath: () => void;
	updatePath: (id: string) => void;
	removePath: (id: string) => void;
	togglePath: (id: string, value: boolean) => void;
	_loadPaths: (newState: Paths) => void;
	_savePaths: () => void;
}

export type PathsSlice = PathsStore & PathsActions;

export const createPathSlice: ImmerStateCreator<PathsSlice> = (set, get) => ({
	paths: {
		pathsMap: {},
		pathsIds: [],
	},

	_loadPaths: async (newState) => {
		if (!newState) return;

		set(({ paths }) => {
			paths.pathsMap = newState.pathsMap;
			paths.pathsIds = newState.pathsIds;
		});
	},

	_savePaths: () => {
		tauriStore.set("settings", { pathsStore:{ ...get().paths } });
		tauriStore.save();
	},

	addPath: async () => {
		const path = await open({
			directory: true,
			multiple: false
		}) as string | null;

		if (!path) return;

		const id = crypto.randomUUID();

		set(({ paths }) => {
			paths.pathsIds.push(id);
			paths.pathsMap[id] = { path, isActive: true };
		});

	},

	updatePath: async (id) => {
		const path = await open({
			directory: true,
			multiple: false,
			defaultPath: get().paths.pathsMap[id].path
		}) as string | null;

		if (!path) return;

		set(({ paths }) => {
			paths.pathsMap[id].path = path;
		});
	},

	removePath: (id) => {
		set(({ paths }) => {
			delete paths.pathsMap[id];
			paths.pathsIds = paths.pathsIds.filter((pathId) => pathId !== id);
		});
	},

	togglePath: (id, value) => {
		set(({ paths }) => {
			if (value) {
				paths.pathsMap[id].isActive = value;
			} else {
				paths.pathsMap[id].isActive = !paths.pathsMap[id].isActive;
			}
		});
	}
});
