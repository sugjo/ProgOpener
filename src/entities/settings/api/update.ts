import { open } from "@tauri-apps/api/dialog";

import { createTypedAsyncThunk } from "@/shared/lib/store";

import { actions } from "../model";

export const update = createTypedAsyncThunk<void, string>(
	"settings/path/updateThunk",
	async (id, { getState, dispatch }) => {
		const { pathsMap } = getState().settings.path;
		const path = await open({
			directory: true,
			multiple: false,
			defaultPath: pathsMap[id].path
		}) as string;

		if (!path) return;

		dispatch(actions.path.update({id, newPath: { path }}));
	}
);
